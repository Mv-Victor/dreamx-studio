'use client';

import { NodeProps } from '@xyflow/react';
import { LayoutGrid } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface PlanningCenterNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function PlanningCenterNode({ data, selected }: PlanningCenterNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={LayoutGrid} iconColor="text-purple-400" />;
}
