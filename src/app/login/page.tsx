'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Mock login
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push('/projects');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </button>

        <Logo className="mb-8" />

        <h2 className="text-lg font-semibold mb-1">登录 / 注册</h2>
        <p className="text-sm text-muted-foreground mb-6">使用邮箱登录你的 DreamX 账号</p>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">邮箱</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">密码</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button className="w-full" onClick={handleLogin} disabled={loading || !email || !password}>
            {loading ? '登录中...' : '登录'}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          登录即表示同意 <span className="text-primary cursor-pointer">使用条款</span> 和{' '}
          <span className="text-primary cursor-pointer">隐私政策</span>
        </p>
      </div>
    </div>
  );
}
