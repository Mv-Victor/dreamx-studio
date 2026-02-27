/**
 * PoloAI API 代理
 * 避免 API Key 暴露到客户端
 */
import { NextRequest, NextResponse } from 'next/server';

const POLOAI_BASE_URL = process.env.POLOAI_BASE_URL || 'https://api.poloai.com';
const POLOAI_API_KEY = process.env.POLOAI_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const { endpoint, ...data } = await request.json();

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${POLOAI_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${POLOAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `PoloAI API error: ${error}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('PoloAI proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${POLOAI_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${POLOAI_API_KEY}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: `PoloAI API error: ${error}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('PoloAI proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
