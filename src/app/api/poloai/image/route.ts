/**
 * PoloAI 文生图 API 代理
 * 服务器端调用，保护 API Key
 */

import { NextRequest, NextResponse } from 'next/server';

const POLOAI_BASE_URL = process.env.POLOAI_BASE_URL || 'https://api.poloai.com';
const POLOAI_API_KEY = process.env.POLOAI_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style, size = '1024x1024', n = 1 } = body;

    if (!prompt) {
      return NextResponse.json(
        { code: 400, message: 'prompt is required', data: null },
        { status: 400 }
      );
    }

    const response = await fetch(`${POLOAI_BASE_URL}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${POLOAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        style,
        size,
        n,
      }),
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
      data: {
        url: result.data?.[0]?.url || '',
        task_id: result.id || '',
      },
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { code: 500, message: 'Internal server error', data: null },
      { status: 500 }
    );
  }
}
