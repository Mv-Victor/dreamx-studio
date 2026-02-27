export type ProjectType =
  | 'single_episode'
  | 'multi_episodes'
  | 'script_based'
  | 'music_mv'
  | 'redbook_note';

export type NodeState =
  | 'check_point'
  | 'story_bible'
  | 'character_pack'
  | 'planning_center'
  | 'script'
  | 'scene_design'
  | 'segment_design'
  | 'compose'
  | 'music_check_point'
  | 'music_pack'
  | 'treatment_music'
  | 'visual_setting';

export interface Project {
  project_id: string;
  project_type: ProjectType;
  series_id: string;
  series_title: string;
  drama_cover: string | null;
  updated_at: number;
  episode_count: number;
}

export interface CheckPoint {
  language: string;
  rating: string;
  visual_style_id: number;
  mode: string;
  idea_text: string;
  episode_count: number;
  episode_duration: number;
  camera_frame_ratio: '9:16' | '16:9' | '1:1';
}

export interface Character {
  id: string;
  name: string;
  occupation: string;
  level: 'major' | 'supporting' | 'minor' | 'extra';
  gender: string;
  age: string;
  height: string;
  brief_bio: string;
  appearance: string;
  image_url: string | null;
  voice_id: string | null;
}

export interface Episode {
  episode_id: string;
  title: string;
  summary: string;
  scenes: Scene[];
}

export interface Scene {
  scene_number: number;
  header: string;
  description: string;
  dialogue: string[];
  vo_narration: string;
}

export interface VisualStyle {
  id: number;
  title: string;
  type: string;
  description: string;
  img_url: string;
}

export interface Voice {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  age: string[];
  language: string;
  gender: string;
}

export interface CanvasNode {
  id: string;
  type: string;
  state: NodeState;
  data: Record<string, unknown>;
}

export interface SeriesState {
  series_id: string;
  state: NodeState;
  data: Record<string, unknown>;
}
