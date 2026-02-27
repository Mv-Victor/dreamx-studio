'use client';

import { NodeProps } from '@xyflow/react';
import { Users } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface CharacterPackNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function CharacterPackNode({ data, selected }: CharacterPackNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={Users} iconColor="text-blue-400" />;
}
