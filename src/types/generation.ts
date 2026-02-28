/**
 * Generation task types
 */
export type GenerationTaskType = 'image' | 'video' | 'characters' | 'script';
export type GenerationTaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GenerationTask {
  task_id: string;
  type: GenerationTaskType;
  status: GenerationTaskStatus;
  progress: number;
  result?: string;
  error?: string;
}
