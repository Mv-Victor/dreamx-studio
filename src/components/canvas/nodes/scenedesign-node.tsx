'use client';

import { NodeProps } from '@xyflow/react';
import { Image } from 'lucide-react';
import { BaseWorkflowNode } from './base-workflow-node';
import { BaseWorkflowNodeData } from '@/types/canvas';

interface SceneDesignNodeProps extends NodeProps {
  data: BaseWorkflowNodeData;
}

export function SceneDesignNode({ data, selected }: SceneDesignNodeProps) {
  return <BaseWorkflowNode data={data} selected={!!selected} icon={Image} iconColor="text-pink-400" />;
}
