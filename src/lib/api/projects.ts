/**
 * Projects API
 * 项目相关接口
 */

// API client available for future use
// import { api } from './client';
import type {
  ApiResponse,
  Project,
  ProjectListResponse,
  CreateProjectRequest,
  CreateProjectResponse,
} from '@/types/api';

// Mock data
const mockProjects: Project[] = [
  {
    project_id: 'p-001',
    project_type: 'multi_episodes',
    series_id: 's-001',
    series_title: '共生劫：白骨夫人的生死局',
    drama_cover: null,
    updated_at: Date.now() - 3600000,
    episode_count: 4,
    current_state: 'check_point',
  },
  {
    project_id: 'p-002',
    project_type: 'single_episode',
    series_id: 's-002',
    series_title: '众声喧哗',
    drama_cover: null,
    updated_at: Date.now() - 86400000,
    episode_count: 1,
    current_state: 'script',
  },
  {
    project_id: 'p-003',
    project_type: 'redbook_note',
    series_id: 's-003',
    series_title: '职场暴击：年终奖缩水 80%',
    drama_cover: null,
    updated_at: Date.now() - 7200000,
    episode_count: 1,
    current_state: 'compose',
  },
];

/**
 * 获取项目列表
 */
export async function getProjects(_params?: { page?: number; page_size?: number }): Promise<ApiResponse<ProjectListResponse>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, page_size } = _params || {};
  // Mock implementation
  return {
    code: 0,
    message: 'success',
    data: {
      total: mockProjects.length,
      projects: mockProjects,
    },
  };

  // Real API call:
  // return api.get<ProjectListResponse>('/project/list', _params);
}

/**
 * 获取项目详情
 */
export async function getProject(projectId: string): Promise<ApiResponse<Project>> {
  const project = mockProjects.find(p => p.project_id === projectId);
  if (!project) {
    return { code: 1004, message: 'Project not found', data: null as unknown as Project };
  }
  return { code: 0, message: 'success', data: project };

  // Real API call:
  // return api.get<Project>(`/project/${projectId}`);
}

/**
 * 创建项目
 */
export async function createProject(data: CreateProjectRequest): Promise<ApiResponse<CreateProjectResponse>> {
  const newProject: CreateProjectResponse = {
    project_id: `p-${Date.now()}`,
    series_id: `s-${Date.now()}`,
    series_title: data.idea_text.slice(0, 20) || '未命名项目',
    current_state: 'check_point',
  };
  return { code: 0, message: 'success', data: newProject };

  // Real API call:
  // return api.post<CreateProjectResponse>('/project/create', data);
}

/**
 * 恢复项目
 */
export async function resumeProject(projectId: string, seriesId: string): Promise<ApiResponse<Project>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _vars = { projectId, seriesId };
  const project = mockProjects.find(p => p.project_id === projectId);
  if (!project) {
    return { code: 1004, message: 'Project not found', data: null as unknown as Project };
  }
  return { code: 0, message: 'success', data: project };
}
