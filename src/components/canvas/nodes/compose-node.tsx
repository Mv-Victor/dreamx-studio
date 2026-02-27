'use client';

import { NodeProps } from '@xyflow/react';
import { Wand2 } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface ComposeNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function ComposeNode({ data, selected }: ComposeNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={Wand2} iconColor="text-cyan-400" />;
}
