'use client';

import { memo } from 'react';
import { useProjectStore } from '@/stores/project-store';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { TASK_TYPE_LABELS } from '@/constants/ui';

export const GenerationTaskList = memo(function GenerationTaskList() {
  const { generationTasks, removeGenerationTask } = useProjectStore();

  if (generationTasks.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 space-y-2 w-80">
      {generationTasks.map((task) => (
        <div
          key={task.task_id}
          className="rounded-xl border border-[var(--drama-border)] bg-[var(--drama-bg-primary)] p-3 shadow-lg"
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              {task.status === 'processing' && (
                <Loader2 className="h-5 w-5 text-[var(--drama-red-active)] animate-spin" />
              )}
              {task.status === 'completed' && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {task.status === 'failed' && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white/80 capitalize">
                {TASK_TYPE_LABELS[task.type] ?? '生成任务'}
              </h4>
              
              {task.status === 'processing' && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                    <span>进度</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--bg-white-10)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--drama-red)] transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {task.status === 'completed' && (
                <p className="text-xs text-green-500 mt-1">生成完成</p>
              )}

              {task.status === 'failed' && (
                <p className="text-xs text-red-500 mt-1">{task.error || '生成失败'}</p>
              )}
            </div>

            {/* Close */}
            {task.status !== 'processing' && (
              <button
                onClick={() => removeGenerationTask(task.task_id)}
                className="flex-shrink-0 text-white/30 hover:text-white/60 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
