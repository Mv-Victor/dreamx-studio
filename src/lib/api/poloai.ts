/**
 * PoloAI API 客户端
 * 文生图/文生视频 API 封装
 */

import type { ApiResponse } from '@/types/api';

export interface PoloAIImageRequest {
  prompt: string;
  style?: string;
  size?: '1024x1024' | '512x512' | '1280x720';
  n?: number;
}

export interface PoloAIImageResponse {
  url: string;
  task_id: string;
}

export interface PoloAIVideoRequest {
  prompt: string;
  duration?: number;
  model?: 'dlim2v' | 'dlai2v' | 'seedance-1-5' | 'kling-o3';
}

export interface PoloAIVideoResponse {
  url: string;
  task_id: string;
}

export interface TaskProgress {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: string;
  error?: string;
}

const POLOAI_BASE_URL = process.env.NEXT_PUBLIC_POLOAI_BASE_URL || 'https://api.poloai.com';
const POLOAI_API_KEY = process.env.NEXT_PUBLIC_POLOAI_API_KEY || '';

/**
 * 文生图
 */
export async function generateImage(data: PoloAIImageRequest): Promise<ApiResponse<PoloAIImageResponse>> {
  // Mock mode - 返回示例数据
  if (process.env.NEXT_PUBLIC_MOCK_MODE === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      code: 0,
      message: 'success',
      data: {
        url: 'https://storage.googleapis.com/dramaland-public/visual_style_images/mock.jpg',
        task_id: `task-${Date.now()}`,
      },
    };
  }

  // Real API call
  const response = await fetch(`${POLOAI_BASE_URL}/v1/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${POLOAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: data.prompt,
      style: data.style,
      size: data.size || '1024x1024',
      n: data.n || 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`PoloAI API error: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    code: 0,
    message: 'success',
    data: {
      url: result.data[0].url,
      task_id: result.id,
    },
  };
}

/**
 * 文生视频
 */
export async function generateVideo(data: PoloAIVideoRequest): Promise<ApiResponse<PoloAIVideoResponse>> {
  // Mock mode
  if (process.env.NEXT_PUBLIC_MOCK_MODE === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return {
      code: 0,
      message: 'success',
      data: {
        url: 'https://storage.googleapis.com/dramaland-public/videos/mock.mp4',
        task_id: `task-${Date.now()}`,
      },
    };
  }

  // Real API call
  const response = await fetch(`${POLOAI_BASE_URL}/v1/videos/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${POLOAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: data.prompt,
      duration: data.duration || 5,
      model: data.model || 'dlim2v',
    }),
  });

  if (!response.ok) {
    throw new Error(`PoloAI API error: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    code: 0,
    message: 'success',
    data: {
      url: result.data[0].url,
      task_id: result.id,
    },
  };
}

/**
 * 查询任务进度
 */
export async function getTaskProgress(taskId: string): Promise<ApiResponse<TaskProgress>> {
  // Mock mode
  if (process.env.NEXT_PUBLIC_MOCK_MODE === 'true') {
    const mockProgress = Math.min(100, Math.floor(Math.random() * 20) + 80);
    return {
      code: 0,
      message: 'success',
      data: {
        task_id: taskId,
        status: mockProgress >= 100 ? 'completed' : 'processing',
        progress: mockProgress,
        result: mockProgress >= 100 ? 'https://storage.googleapis.com/dramaland-public/result.jpg' : undefined,
      },
    };
  }

  // Real API call
  const response = await fetch(`${POLOAI_BASE_URL}/v1/tasks/${taskId}`, {
    headers: {
      'Authorization': `Bearer ${POLOAI_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`PoloAI API error: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    code: 0,
    message: 'success',
    data: result,
  };
}

/**
 * SSE 订阅任务进度
 */
export function subscribeTaskProgress(
  taskId: string,
  onProgress: (progress: TaskProgress) => void,
  onComplete: () => void,
  onError: (error: Error) => void
): () => void {
  // Mock mode - 轮询模拟
  if (process.env.NEXT_PUBLIC_MOCK_MODE === 'true') {
    let progress = 0;
    const interval = setInterval(async () => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onComplete();
      }
      onProgress({
        task_id: taskId,
        status: progress >= 100 ? 'completed' : 'processing',
        progress,
      });
    }, 1000);

    return () => clearInterval(interval);
  }

  // Real SSE (note: EventSource doesn't support custom headers in browser)
  // For production, use a proxy or WebSocket
  const eventSource = new EventSource(`${POLOAI_BASE_URL}/v1/tasks/${taskId}/stream`);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onProgress(data);
    if (data.status === 'completed' || data.status === 'failed') {
      eventSource.close();
      if (data.status === 'completed') {
        onComplete();
      }
    }
  };

  eventSource.onerror = () => {
    eventSource.close();
    onError(new Error('SSE connection error'));
  };

  return () => eventSource.close();
}
