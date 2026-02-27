'use client';

import { NodeProps } from '@xyflow/react';
import { FileText } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface ScriptNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function ScriptNode({ data, selected }: ScriptNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={FileText} iconColor="text-green-400" />;
}
