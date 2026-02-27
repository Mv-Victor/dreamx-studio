import { Node } from '@xyflow/react';

/**
 * Workflow node status
 */
export type NodeStatus = 'pending' | 'active' | 'completed';

/**
 * Base workflow node data structure
 */
export interface BaseWorkflowNodeData {
  label: string;
  description: string;
  status: NodeStatus;
  locked?: boolean;
  [key: string]: unknown;
}

/**
 * Entry node data structure
 */
export interface EntryNodeData {
  label: string;
  description: string;
  isEntry?: true;
  [key: string]: unknown;
}

/**
 * Union type for all workflow node data
 */
export type WorkflowNodeData = BaseWorkflowNodeData | EntryNodeData;

/**
 * Custom node types
 */
export type WorkflowNodeType = 
  | 'entry'
  | 'storybible'
  | 'characterpack'
  | 'planningcenter'
  | 'script'
  | 'scenedesign'
  | 'segmentdesign'
  | 'compose'
  | 'checkpoint';

/**
 * Typed node for workflow
 */
export interface WorkflowNode extends Node {
  type: WorkflowNodeType;
  data: WorkflowNodeData;
}

/**
 * Edge data structure
 */
export interface WorkflowEdgeData {
  label?: string;
  [key: string]: unknown;
}
