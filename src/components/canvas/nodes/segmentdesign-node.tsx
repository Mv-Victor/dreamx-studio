'use client';

import { NodeProps } from '@xyflow/react';
import { Film } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface SegmentDesignNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function SegmentDesignNode({ data, selected }: SegmentDesignNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={Film} iconColor="text-yellow-400" />;
}
