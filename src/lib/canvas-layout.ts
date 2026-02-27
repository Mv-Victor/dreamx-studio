import { Node, Edge } from '@xyflow/react';
import { ProjectType } from '@/types';

const NODE_GAP_Y = 140;
const CENTER_X = 300;

interface LayoutResult {
  initialNodes: Node[];
  initialEdges: Edge[];
}

const nodeConfigs: Record<string, { label: string; description: string; status: 'completed' | 'active' | 'pending' }[]> = {
  single_episode: [
    { label: '开始', description: '一切从这里开始', status: 'completed' },
    { label: '基础信息', description: '语言、风格、比例', status: 'active' },
    { label: '角色集', description: 'AI 生成角色形象与配音', status: 'pending' },
    { label: '剧本撰写', description: 'AI 生成分场剧本', status: 'pending' },
    { label: '场景设计', description: 'AI 生成视觉参考', status: 'pending' },
    { label: '分镜设计', description: '逐镜头分镜与视频生成', status: 'pending' },
    { label: '合成导出', description: '视频合成与导出', status: 'pending' },
  ],
  multi_episodes: [
    { label: '开始', description: '一切从这里开始', status: 'completed' },
    { label: '基础信息', description: '语言、风格、集数、比例', status: 'active' },
    { label: '故事圣经', description: 'AI 生成故事设定', status: 'pending' },
    { label: '角色集', description: 'AI 生成角色形象与配音', status: 'pending' },
    { label: '规划中心', description: '封面、剧集大纲', status: 'pending' },
    { label: '剧本撰写', description: 'AI 生成分场剧本', status: 'pending' },
    { label: '场景设计', description: 'AI 生成视觉参考', status: 'pending' },
    { label: '分镜设计', description: '逐镜头分镜与视频生成', status: 'pending' },
    { label: '合成导出', description: '视频合成与导出', status: 'pending' },
  ],
  script_based: [
    { label: '开始', description: '一切从这里开始', status: 'completed' },
    { label: '基础信息', description: '语言、风格、比例', status: 'active' },
    { label: '剧本导入', description: '导入已有剧本', status: 'pending' },
    { label: '角色集', description: 'AI 生成角色形象', status: 'pending' },
    { label: '场景设计', description: 'AI 生成视觉参考', status: 'pending' },
    { label: '分镜设计', description: '逐镜头分镜与视频生成', status: 'pending' },
    { label: '合成导出', description: '视频合成与导出', status: 'pending' },
  ],
  music_mv: [
    { label: '开始', description: '一切从这里开始', status: 'completed' },
    { label: '音乐配置', description: '上传或生成音乐', status: 'active' },
    { label: '音乐分析', description: '节拍、情绪、歌词', status: 'pending' },
    { label: '视觉处理', description: '视觉风格方案', status: 'pending' },
    { label: '视觉设定', description: '风格与画面设定', status: 'pending' },
    { label: '分镜设计', description: '逐镜头分镜与视频生成', status: 'pending' },
    { label: '合成导出', description: '视频合成与导出', status: 'pending' },
  ],
  redbook_note: [
    { label: '开始', description: '一切从这里开始', status: 'completed' },
    { label: '素材上传', description: '上传图片与事件描述', status: 'active' },
    { label: '爆款文案', description: 'AI 生成小红书文案', status: 'pending' },
    { label: 'TTS 配音', description: '文案配音与情绪分析', status: 'pending' },
    { label: '自动分镜', description: '图片分配与字幕时间轴', status: 'pending' },
    { label: '合成导出', description: '视频合成与下载', status: 'pending' },
  ],
};

const singleTypes = ['entry', 'checkpoint', 'characterpack', 'script', 'scenedesign', 'segmentdesign', 'compose'];
const multiTypes = ['entry', 'checkpoint', 'storybible', 'characterpack', 'planningcenter', 'script', 'scenedesign', 'segmentdesign', 'compose'];
const scriptTypes = ['entry', 'checkpoint', 'script', 'characterpack', 'scenedesign', 'segmentdesign', 'compose'];
const musicTypes = ['entry', 'checkpoint', 'storybible', 'scenedesign', 'checkpoint', 'segmentdesign', 'compose'];
const redbookTypes = ['entry', 'checkpoint', 'storybible', 'characterpack', 'segmentdesign', 'compose'];

function getNodeTypes(projectType: ProjectType): string[] {
  switch (projectType) {
    case 'multi_episodes': return multiTypes;
    case 'script_based': return scriptTypes;
    case 'music_mv': return musicTypes;
    case 'redbook_note': return redbookTypes;
    default: return singleTypes;
  }
}

export function getCanvasLayout(projectType: ProjectType): LayoutResult {
  const configs = nodeConfigs[projectType] || nodeConfigs.single_episode;
  const types = getNodeTypes(projectType);

  // Progressive unlock: show completed + active + first pending (locked preview)
  const activeIdx = configs.findIndex((c) => c.status === 'active');
  const visibleCount = activeIdx >= 0 ? Math.min(activeIdx + 2, configs.length) : configs.length;

  const nodes: Node[] = configs.slice(0, visibleCount).map((config, i) => ({
    id: `node-${i}`,
    type: types[i] || 'checkpoint',
    position: { x: CENTER_X, y: i * NODE_GAP_Y },
    data: {
      label: config.label,
      description: config.description,
      status: config.status,
      index: i,
      locked: config.status === 'pending',
    },
  }));

  const edges: Edge[] = nodes.slice(0, -1).map((_, i) => ({
    id: `edge-${i}-${i + 1}`,
    source: `node-${i}`,
    target: `node-${i + 1}`,
    type: 'animated',
    style: {
      stroke: configs[i].status === 'completed' ? 'var(--primary)' : 'rgba(255,255,255,0.10)',
      strokeWidth: 2,
    },
  }));

  return { initialNodes: nodes, initialEdges: edges };
}
