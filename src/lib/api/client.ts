/**
 * API 客户端工具
 * 提供通用的 fetch 包装器和 PoloAI API 调用
 */

import type { ApiResponse } from '@/types/api';
import type { PoloAIImageRequest, PoloAIImageResponse, PoloAIVideoRequest, PoloAIVideoResponse, TaskProgress } from './poloai';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

/**
 * 通用 fetch 包装器
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} ${error}`);
  }

  return response.json();
}

/**
 * GET 请求
 */
export async function get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
  const queryString = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
  return fetchAPI<T>(`${endpoint}${queryString}`);
}

/**
 * POST 请求
 */
export async function post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export async function put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  return fetchAPI<T>(endpoint, {
    method: 'DELETE',
  });
}

/**
 * 文生图（通过后端代理）
 */
export async function generateImage(data: PoloAIImageRequest): Promise<ApiResponse<PoloAIImageResponse>> {
  // Mock mode
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

  return post<PoloAIImageResponse>('/poloai', {
    endpoint: '/v1/images/generations',
    ...data,
  });
}

/**
 * 文生视频（通过后端代理）
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

  return post<PoloAIVideoResponse>('/poloai', {
    endpoint: '/v1/videos/generations',
    ...data,
  });
}

/**
 * 查询任务进度（通过后端代理）
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

  return get<TaskProgress>('/poloai', { endpoint: `/v1/tasks/${taskId}` });
}

/**
 * SSE 订阅任务进度（通过后端代理）
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

  // Real SSE through backend proxy
  const eventSource = new EventSource(`${API_BASE}/poloai/task/${taskId}/stream?taskId=${taskId}`);

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
