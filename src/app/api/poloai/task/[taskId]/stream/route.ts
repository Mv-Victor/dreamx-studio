/**
 * PoloAI 任务进度 SSE 流式推送 API 代理
 * 服务器端订阅 PoloAI SSE，转发给客户端
 * 解决浏览器 EventSource 不支持自定义 headers 的问题
 */

import { NextRequest } from 'next/server';

const POLOAI_BASE_URL = process.env.POLOAI_BASE_URL || 'https://api.poloai.com';
const POLOAI_API_KEY = process.env.POLOAI_API_KEY || '';

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const { taskId } = params;

  if (!taskId) {
    return new Response('taskId is required', { status: 400 });
  }

  // 创建 SSE stream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let poloaiStream: ReadableStream<Uint8Array> | null = null;
      let buffer = '';

      try {
        // 订阅 PoloAI SSE
        const response = await fetch(`${POLOAI_BASE_URL}/v1/tasks/${taskId}/stream`, {
          headers: {
            'Authorization': `Bearer ${POLOAI_API_KEY}`,
            'Accept': 'text/event-stream',
          },
        });

        if (!response.ok || !response.body) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'error', error: 'Failed to connect to PoloAI' })}\n\n`));
          controller.close();
          return;
        }

        poloaiStream = response.body;
        const reader = poloaiStream.getReader();

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            controller.close();
            break;
          }

          // 解码 PoloAI SSE 数据
          buffer += new TextDecoder().decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              // 转发给客户端
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
              
              // 检查任务是否完成
              try {
                const parsed = JSON.parse(data);
                if (parsed.status === 'completed' || parsed.status === 'failed') {
                  controller.close();
                  return;
                }
              } catch {
                // Ignore parse errors
              }
            }
          }
        }
      } catch (error) {
        console.error('SSE proxy error:', error);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'error', error: 'SSE connection failed' })}\n\n`));
        controller.close();
      } finally {
        if (poloaiStream) {
          poloaiStream.cancel();
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
