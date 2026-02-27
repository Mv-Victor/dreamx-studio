'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/stores/project-store';
import { Send, Bot, User, Sparkles } from 'lucide-react';

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
    <div className="w-[360px] border-r border-white/10 flex flex-col bg-[#050505] animate-slide-left">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 bg-[#050505]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[rgba(192,3,28,0.15)] flex items-center justify-center">
            <Bot className="h-4 w-4 text-[#FF4D4D]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/90">AI 创作助手</h3>
            <p className="text-[10px] text-white/40 mt-0.5">与 AI 协作，引导创作方向</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-xl bg-[rgba(192,3,28,0.10)] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-6 w-6 text-[#FF4D4D]" />
            </div>
            <p className="text-sm text-white/60 font-medium">开始对话</p>
            <p className="text-xs text-white/30 mt-1">让 AI 帮你创作更精彩的故事</p>
          </div>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-[rgba(192,3,28,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-[#FF4D4D]" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[rgba(192,3,28,0.20)] text-white/90 border border-[rgba(192,3,28,0.30)]'
                  : 'bg-[rgba(255,255,255,0.05)] text-white/80 border border-white/5'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-[rgba(255,77,77,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="h-3.5 w-3.5 text-[#FF4D4D]" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[rgba(192,3,28,0.15)] flex items-center justify-center flex-shrink-0">
              <Bot className="h-3.5 w-3.5 text-[#FF4D4D]" />
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-white/5 rounded-xl px-3.5 py-2.5">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-white/10 bg-[#050505]/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="输入消息，与 AI 协作..."
            className="flex-1 h-10 rounded-xl border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 text-sm text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[rgba(192,3,28,0.40)] focus:ring-1 focus:ring-[rgba(192,3,28,0.20)] transition-all"
          />
          <Button 
            size="icon" 
            onClick={handleSend} 
            disabled={!input.trim() || isTyping} 
            className="h-10 w-10 rounded-xl bg-[rgba(192,3,28,0.20)] hover:bg-[rgba(192,3,28,0.25)] border border-[rgba(192,3,28,0.30)]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
