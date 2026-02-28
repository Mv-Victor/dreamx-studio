/**
 * Application constants
 */

/**
 * Generation task type labels for UI display
 * Centralized for i18n support
 */
export const TASK_TYPE_LABELS = Object.freeze({
  image: '生成图片',
  video: '生成视频',
  characters: '生成角色集',
  script: '生成剧本',
} as const);

/**
 * Node status labels
 */
export const NODE_STATUS_LABELS = Object.freeze({
  completed: '已完成',
  generating: '生成中',
  pending: '待解锁',
  locked: '已锁定',
} as const);

/**
 * Default configuration
 */
export const DEFAULTS = {
  EPISODE_COUNT: 1,
  EPISODE_DURATION: 60, // seconds
  CANVAS_ZOOM: { min: 0.3, max: 2, initial: 1 },
} as const;
