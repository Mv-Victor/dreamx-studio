import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Project, ProjectType, CheckPoint, Character, VisualStyle, Voice, Episode } from '@/types';
import type { GenerationTask } from '@/types/generation';
import type { ChatMessage } from '@/types/chat';
import { mockProjects } from '@/mock/data';
import { visualStyles } from '@/mock/visual-styles';
import { voices } from '@/mock/voices';

interface ProjectStore {
  // Data
  projects: Project[];
  currentProject: Project | null;
  checkPoint: CheckPoint | null;
  characters: Character[];
  episodes: Episode[];
  visualStyles: VisualStyle[];
  voices: Voice[];
  chatMessages: ChatMessage[];
  generationTasks: GenerationTask[];
  selectedNodeId: string | null;

  // Actions
  loadProjects: () => void;
  createProject: (type: ProjectType, ideaText: string) => Project;
  selectProject: (projectId: string) => void;
  loadVisualStyles: () => void;
  loadVoices: () => void;
  updateCheckPoint: (patch: Partial<CheckPoint>) => void;
  addChatMessage: (role: ChatMessage['role'], content: string) => void;
  addGenerationTask: (task: GenerationTask) => void;
  updateGenerationTask: (taskId: string, patch: Partial<GenerationTask>) => void;
  removeGenerationTask: (taskId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
}

export const useProjectStore = create<ProjectStore>()(
  immer((set, get) => ({
    projects: [],
    currentProject: null,
    checkPoint: null,
    characters: [],
    episodes: [],
    visualStyles: [],
    voices: [],
    chatMessages: [],
    generationTasks: [],
    selectedNodeId: null,

    loadProjects: () => {
      set((state) => {
        state.projects = mockProjects;
      });
    },

    createProject: (type, ideaText) => {
      const newProject: Project = {
        project_id: `p-${Date.now()}`,
        project_type: type,
        series_id: `s-${Date.now()}`,
        series_title: ideaText.slice(0, 20) || '未命名项目',
        drama_cover: null,
        updated_at: Date.now(),
        episode_count: type === 'multi_episodes' ? 4 : 1,
      };
      set((state) => {
        state.projects.unshift(newProject);
        state.currentProject = newProject;
        state.checkPoint = {
          language: 'zh-CN',
          rating: 'PG',
          visual_style_id: 1,
          mode: 'standard',
          idea_text: ideaText,
          episode_count: newProject.episode_count,
          episode_duration: 60,
          camera_frame_ratio: '9:16',
        };
      });
      return newProject;
    },

    selectProject: (projectId) => {
      const project = get().projects.find((p) => p.project_id === projectId);
      if (project) {
        set((state) => {
          state.currentProject = project;
          state.characters = [];
          state.episodes = [];
          state.checkPoint = {
            language: 'zh-CN',
            rating: 'PG',
            visual_style_id: 1,
            mode: 'standard',
            idea_text: project.series_title,
            episode_count: project.episode_count || 1,
            episode_duration: 60,
            camera_frame_ratio: '9:16',
          };
          state.chatMessages = [];
        });
      }
    },

    loadVisualStyles: () => {
      set((state) => {
        state.visualStyles = visualStyles;
      });
    },

    loadVoices: () => {
      set((state) => {
        state.voices = voices;
      });
    },

    updateCheckPoint: (patch) => {
      set((state) => {
        if (state.checkPoint) {
          Object.assign(state.checkPoint, patch);
        }
      });
    },

    addChatMessage: (role, content) => {
      set((state) => {
        state.chatMessages.push({ role, content });
      });
    },

    addGenerationTask: (task) => {
      set((state) => {
        state.generationTasks.push(task);
      });
    },

    updateGenerationTask: (taskId, patch) => {
      set((state) => {
        const task = state.generationTasks.find((t) => t.task_id === taskId);
        if (task) {
          Object.assign(task, patch);
        }
      });
    },

    removeGenerationTask: (taskId) => {
      set((state) => {
        state.generationTasks = state.generationTasks.filter((t) => t.task_id !== taskId);
      });
    },

    setSelectedNodeId: (nodeId) => {
      set((state) => {
        state.selectedNodeId = nodeId;
      });
    },
  }))
);
