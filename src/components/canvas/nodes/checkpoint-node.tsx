'use client';

import { NodeProps } from '@xyflow/react';
import { Flag } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface CheckPointNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function CheckPointNode({ data, selected }: CheckPointNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={Flag} iconColor="text-red-400" />;
}
