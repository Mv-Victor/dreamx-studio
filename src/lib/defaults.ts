/**
 * DreamX Studio 默认值常量
 * 用于各组件的默认数据初始化
 */

import type {
  CheckPointData,
  StoryBibleData,
  CharacterPackData,
  PlanningCenterData,
  ScriptData,
  SceneDesignData,
  SegmentDesignData,
  ComposeData,
} from '@/types/canvas';

/**
 * CheckPoint 节点默认数据
 */
export const DEFAULT_CHECKPOINT_DATA: CheckPointData = {
  label: '创意构思',
  status: 'generating',
  language: 'zh-CN',
  rating: 'PG',
  camera_frame_ratio: '9:16',
  episode_count: 1,
  episode_duration: 60,
  visual_style_id: 1,
  idea_text: '',
};

/**
 * StoryBible 节点默认数据
 */
export const DEFAULT_STORY_BIBLE_DATA: StoryBibleData = {
  label: '故事圣经',
  status: 'generating',
};

/**
 * CharacterPack 节点默认数据
 */
export const DEFAULT_CHARACTER_PACK_DATA: CharacterPackData = {
  label: '角色集',
  status: 'generating',
};

/**
 * PlanningCenter 节点默认数据
 */
export const DEFAULT_PLANNING_CENTER_DATA: PlanningCenterData = {
  label: '规划中心',
  status: 'generating',
};

/**
 * Script 节点默认数据
 */
export const DEFAULT_SCRIPT_DATA: ScriptData = {
  label: '剧本',
  status: 'generating',
};

/**
 * SceneDesign 节点默认数据
 */
export const DEFAULT_SCENE_DESIGN_DATA: SceneDesignData = {
  label: '场景设计',
  status: 'generating',
};

/**
 * SegmentDesign 节点默认数据
 */
export const DEFAULT_SEGMENT_DESIGN_DATA: SegmentDesignData = {
  label: '分镜设计',
  status: 'generating',
};

/**
 * Compose 节点默认数据
 */
export const DEFAULT_COMPOSE_DATA: ComposeData = {
  label: '合成',
  status: 'pending',
};

/**
 * 视口保存防抖时间（毫秒）
 */
export const VIEWPORT_SAVE_DEBOUNCE_MS = 500;

/**
 * React Flow 最小缩放
 */
export const MIN_ZOOM = 0.3;

/**
 * React Flow 最大缩放
 */
export const MAX_ZOOM = 2;

/**
 * React Flow 初始 padding
 */
export const FIT_VIEW_PADDING = 0.3;
