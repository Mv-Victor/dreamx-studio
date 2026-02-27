'use client';

import { NodeProps } from '@xyflow/react';
import { BookOpen } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface StoryBibleNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function StoryBibleNode({ data, selected }: StoryBibleNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={BookOpen} iconColor="text-orange-400" />;
}
