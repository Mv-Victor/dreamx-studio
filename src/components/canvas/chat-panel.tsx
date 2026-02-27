'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/stores/project-store';
import { Send, Bot, User } from 'lucide-react';

export function ChatPanel() {
  const { chatMessages, addChatMessage } = useProjectStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatMessages.length]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    addChatMessage('user', text);
    setIsTyping(true);

    // Mock AI response
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1500));
    const responses = [
      '好的，我来帮你调整这个部分。你希望角色的性格更突出一些吗？',
      '这个创意很有意思！我建议在第二幕加入一个转折点，让剧情更紧凑。',
      '视觉风格已更新。你可以在右侧面板查看预览效果。',
      '剧本已生成完毕，共 4 个场景。点击「剧本撰写」节点查看详情。',
      '角色形象正在生成中，预计需要 30 秒。完成后会自动更新到角色集节点。',
      '收到！我会按照你的要求重新调整分镜的节奏感。',
    ];
    addChatMessage('assistant', responses[Math.floor(Math.random() * responses.length)]);
    setIsTyping(false);
  };

  return (
    <div className="w-[320px] border-r border-border flex flex-col bg-sidebar animate-slide-left">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-sm font-medium">AI 创作助手</h3>
        <p className="text-xs text-muted-foreground mt-0.5">与 AI 协作，引导创作方向</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {chatMessages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">开始对话，让 AI 帮你创作</p>
          </div>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="h-3.5 w-3.5 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入消息..."
            className="flex-1 h-9 rounded-md border border-input bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping} className="h-9 w-9">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
