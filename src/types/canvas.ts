/**
 * Canvas type definitions
 */
import type { Node, Edge } from '@xyflow/react';

export type NodeType =
  | 'entry'
  | 'checkpoint'
  | 'storybible'
  | 'characterpack'
  | 'planningcenter'
  | 'script'
  | 'scenedesign'
  | 'segmentdesign'
  | 'compose';

export type NodeStatus = 'completed' | 'generating' | 'pending' | 'locked';

export interface BaseNodeData {
  label: string;
  description?: string;
  status: 'completed' | 'generating' | 'pending' | 'locked';
  isEntry?: boolean;
  progress?: number;
  thumbnail?: string;
  [key: string]: unknown;
}

export interface CheckPointData extends BaseNodeData {
  language: 'zh-CN' | 'en-US';
  rating: 'PG' | 'PG-13' | 'R';
  camera_frame_ratio: '9:16' | '16:9' | '1:1';
  episode_count: number;
  episode_duration: number;
  visual_style_id: number;
  idea_text?: string;
}

export interface StoryBibleData extends BaseNodeData {
  world_building?: string;
  tone?: string;
  themes?: string[];
}

export interface CharacterPackData extends BaseNodeData {
  character_count?: number;
  characters?: Array<{
    id: string;
    name: string;
    description: string;
    image_url?: string;
  }>;
}

export interface PlanningCenterData extends BaseNodeData {
  series_logline?: string;
  episode_outline?: string;
}

export interface ScriptData extends BaseNodeData {
  script_text?: string;
  scenes?: Array<{
    scene_number: number;
    location: string;
    description: string;
  }>;
}

export interface SceneDesignData extends BaseNodeData {
  scene_prompts?: string[];
  reference_images?: string[];
}

export interface SegmentDesignData extends BaseNodeData {
  segment_prompts?: string[];
  shot_list?: string[];
}

export interface ComposeData extends BaseNodeData {
  video_url?: string;
  thumbnail_url?: string;
}

export interface EntryNodeData extends BaseNodeData {
  isEntry: true;
  status: 'completed' | 'pending';
}

export type WorkflowNodeData =
  | BaseNodeData
  | CheckPointData
  | StoryBibleData
  | CharacterPackData
  | PlanningCenterData
  | ScriptData
  | SceneDesignData
  | SegmentDesignData
  | ComposeData;

// Alias for backward compatibility
export type BaseWorkflowNodeData = BaseNodeData;

export interface WorkflowNode extends Node<WorkflowNodeData> {
  type: NodeType;
}

export interface WorkflowEdge extends Edge {
  animated?: boolean;
}
