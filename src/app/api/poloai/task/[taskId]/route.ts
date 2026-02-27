/**
 * PoloAI 任务进度查询 API 代理
 * 服务器端调用，保护 API Key
 */

import { NextRequest, NextResponse } from 'next/server';

const POLOAI_BASE_URL = process.env.POLOAI_BASE_URL || 'https://api.poloai.com';
const POLOAI_API_KEY = process.env.POLOAI_API_KEY || '';

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;

    if (!taskId) {
      return NextResponse.json(
        { code: 400, message: 'taskId is required', data: null },
        { status: 400 }
      );
    }

    const response = await fetch(`${POLOAI_BASE_URL}/v1/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${POLOAI_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PoloAI API error:', response.status, errorText);
      return NextResponse.json(
        { code: response.status, message: `PoloAI error: ${response.statusText}`, data: null },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    return NextResponse.json({
      code: 0,
      message: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Task progress error:', error);
    return NextResponse.json(
      { code: 500, message: 'Internal server error', data: null },
      { status: 500 }
    );
  }
}
