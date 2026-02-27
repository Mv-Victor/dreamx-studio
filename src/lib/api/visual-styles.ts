/**
 * Visual Styles API
 * 视觉风格相关接口
 */

// API client available for future use
// import { api } from './client';
import type { ApiResponse, VisualStyle } from '@/types/api';
import { visualStyles as allStyles } from '@/mock/visual-styles';

/**
 * 获取视觉风格列表
 */
export async function getVisualStyles(params?: { type?: string }): Promise<ApiResponse<VisualStyle[]>> {
  let styles = allStyles;
  if (params?.type) styles = styles.filter(s => s.type === params.type);

  return {
    code: 0,
    message: 'success',
    data: styles,
  };

  // Real API call:
  // return api.get<VisualStyle[]>('/query/visual_style_list', params);
}

/**
 * 获取单个视觉风格详情
 */
export async function getVisualStyleById(id: number): Promise<ApiResponse<VisualStyle>> {
  const style = allStyles.find(s => s.id === id);
  
  if (!style) {
    return {
      code: 1004,
      message: 'Visual style not found',
      data: {} as VisualStyle,
    };
  }

  return {
    code: 0,
    message: 'success',
    data: style,
  };

  // Real API call:
  // return api.get<VisualStyle>(`/query/visual_style/${id}`);
}
