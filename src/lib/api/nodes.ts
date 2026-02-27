/**
 * Nodes API
 * 画布节点相关接口
 */

// API client available for future use
// import { api } from './client';
import type { ApiResponse, CanvasData, MainCanvasRequest, CanvasNode, CanvasEdge } from '@/types/api';

/**
 * 获取画布数据
 */
export async function getMainCanvas(data: MainCanvasRequest): Promise<ApiResponse<CanvasData>> {
  // Mock implementation - progressive unlock
  const nodes: CanvasNode[] = [
    { id: 'node-0', type: 'entry', label: '开始', description: '一切从这里开始', status: 'completed', locked: false },
    { id: 'node-1', type: 'checkpoint', label: '基础信息', description: '语言、风格、比例', status: 'completed', locked: false },
    { id: 'node-2', type: 'characterpack', label: '角色集', description: 'AI 生成角色形象与配音', status: 'active', locked: false },
    { id: 'node-3', type: 'script', label: '剧本撰写', description: 'AI 生成分场剧本', status: 'pending', locked: true },
    { id: 'node-4', type: 'scenedesign', label: '场景设计', description: 'AI 生成视觉参考', status: 'pending', locked: true },
    { id: 'node-5', type: 'segmentdesign', label: '分镜设计', description: '逐镜头分镜与视频生成', status: 'pending', locked: true },
    { id: 'node-6', type: 'compose', label: '合成导出', description: '视频合成与导出', status: 'pending', locked: true },
  ];

  const edges: CanvasEdge[] = nodes.slice(0, -1).map((_, i) => ({
    source: `node-${i}`,
    target: `node-${i + 1}`,
  }));

  return {
    code: 0,
    message: 'success',
    data: {
      series_id: data.series_id,
      current_state: 'character_pack',
      nodes,
      edges,
    },
  };

  // Real API call:
  // return api.post<CanvasData>('/query/main_canvas', data);
}

/**
 * 更新节点状态
 */
export async function updateNodeStatus(
  projectId: string,
  seriesId: string,
  nodeId: string,
  status: 'completed' | 'active' | 'pending'
): Promise<ApiResponse<{ current_state: string }>> {
  // Mock: just return success
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _vars = { projectId, seriesId, nodeId, status };
  return {
    code: 0,
    message: 'success',
    data: { current_state: 'character_pack' },
  };
}
