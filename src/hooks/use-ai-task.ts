/**
 * Hooks for AI generation tasks
 */
import { useState, useCallback, useEffect } from 'react';
import { getTaskProgress } from '@/lib/api/poloai';
import type { TaskProgress } from '@/lib/api/poloai';

interface UseAITaskOptions {
  pollInterval?: number;
}

export function useAITask<T>({ pollInterval = 1000 }: UseAITaskOptions = {}) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState<TaskProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<T | null>(null);

  const startTask = useCallback(async (taskFn: () => Promise<{ task_id: string }>) => {
    setIsLoading(true);
    setError(null);
    setProgress({ task_id: '', status: 'pending', progress: 0 });

    try {
      const response = await taskFn();
      setTaskId(response.task_id);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }, []);

  const pollProgress = useCallback(async () => {
    if (!taskId) return;

    try {
      const response = await getTaskProgress(taskId);
      setProgress(response.data);

      if (response.data.status === 'completed') {
        setResult(response.data.result as T);
        setIsLoading(false);
      } else if (response.data.status === 'failed') {
        setError(new Error(response.data.error || 'Task failed'));
        setIsLoading(false);
      }
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (!taskId || !isLoading) return;

    const interval = setInterval(pollProgress, pollInterval);
    return () => clearInterval(interval);
  }, [taskId, isLoading, pollInterval, pollProgress]);

  return {
    taskId,
    progress,
    isLoading,
    error,
    result,
    startTask,
    reset: () => {
      setTaskId(null);
      setProgress(null);
      setIsLoading(false);
      setError(null);
      setResult(null);
    },
  };
}

/**
 * Hook for SSE-based task progress
 */
export function useSSETask<T>() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [progress, setProgress] = useState<TaskProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<T | null>(null);

  const startTask = useCallback(
    async (
      taskFn: () => Promise<{ task_id: string }>,
      subscribeFn: (taskId: string, onProgress: (p: TaskProgress) => void) => () => void
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await taskFn();
        setTaskId(response.task_id);

        const unsubscribe = subscribeFn(response.task_id, (p) => {
          setProgress(p);
          if (p.status === 'completed') {
            setResult(p.result as T);
            setIsLoading(false);
            unsubscribe();
          } else if (p.status === 'failed') {
            setError(new Error(p.error || 'Task failed'));
            setIsLoading(false);
            unsubscribe();
          }
        });
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    },
    []
  );

  return {
    taskId,
    progress,
    isLoading,
    error,
    result,
    startTask,
    reset: () => {
      setTaskId(null);
      setProgress(null);
      setIsLoading(false);
      setError(null);
      setResult(null);
    },
  };
}
