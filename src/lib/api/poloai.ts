/**
 * PoloAI API 类型定义
 * 实际调用通过 client.ts（后端代理）
 */

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

// Re-export from client.ts for backward compatibility
export {
  generateImage,
  generateVideo,
  getTaskProgress,
  subscribeTaskProgress,
} from './client';
