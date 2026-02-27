/**
 * Task progress SSE streaming proxy
 * 解决浏览器 EventSource 不支持自定义 headers 的问题
 */
import { NextRequest } from 'next/server';

const POLOAI_BASE_URL = process.env.POLOAI_BASE_URL || 'https://api.poloai.com';
const POLOAI_API_KEY = process.env.POLOAI_API_KEY || '';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('taskId');

  if (!taskId) {
    return new Response('Task ID is required', { status: 400 });
  }

  // Create a TransformStream for SSE
  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();

  // Fetch from PoloAI with custom headers
  fetch(`${POLOAI_BASE_URL}/v1/tasks/${taskId}/stream`, {
    headers: {
      'Authorization': `Bearer ${POLOAI_API_KEY}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const writer = writable.getWriter();
        await writer.write(encoder.encode(`data: {"error": "${response.statusText}"}\n\n`));
        await writer.close();
        return;
      }

      // Pipe the SSE stream
      const reader = response.body?.getReader();
      if (!reader) return;

      const writer = writable.getWriter();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          await writer.write(value);
        }
      } finally {
        await writer.close();
        reader.releaseLock();
      }
    })
    .catch((error) => {
      const writer = writable.getWriter();
      writer.write(encoder.encode(`data: {"error": "${error.message}"}\n\n`));
      writer.close();
    });

  // Return SSE response
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
