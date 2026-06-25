'use client';

import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const UNLOCK_PASSWORD = 'MidnightKey';
const NOTE_BUY_URL = 'https://note.com/couple_vibe/n/n26aff90c4765';

export const PremiumGate: React.FC<{ children: React.ReactNode; buyUrl?: string }> = ({
    children,
    buyUrl = NOTE_BUY_URL,
}) => {
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('premium_unlocked') === 'true') setIsLocked(false);
    }, []);

    const handleUnlock = () => {
        if (password === UNLOCK_PASSWORD) {
            setIsLocked(false);
            localStorage.setItem('premium_unlocked', 'true');
            setError('');
        } else {
            setError('パスワードが違います');
        }
    };

    if (!isLocked) return <>{children}</>;

    return (
        <div className="relative">
            <div className="blur-md select-none pointer-events-none opacity-60 max-h-[480px] overflow-hidden">
                {children}
            </div>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[3px] p-6 text-center">
                <div className="bg-white p-4 rounded-full shadow-2xl border border-brand-gold/20 animate-bounce-slow mb-5">
                    <Lock className="text-brand-gold w-7 h-7" />
                </div>
                <div className="space-y-4 w-full max-w-xs bg-white/95 p-6 rounded-2xl shadow-xl border border-white/50">
                    <div className="space-y-1">
                        <h3 className="font-bold text-gray-800 text-lg">続きを見るには</h3>
                        <p className="text-xs text-gray-500">パスワードを入力して<br />すべてのシークレットを解除</p>
                    </div>
                    <div className="space-y-2">
                        <Input
                            placeholder="パスワードを入力して詳細を確認"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                            className="text-center tracking-widest text-[10px]"
                        />
                        <Button onClick={handleUnlock} fullWidth className="bg-brand-midnight text-white hover:bg-black">
                            解除する
                        </Button>
                    </div>
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">or</span></div>
                    </div>
                    <a
                        href={buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-brand-gold to-yellow-600 text-white shadow-lg shadow-brand-gold/30 hover:shadow-brand-gold/50 rounded-xl py-3 font-bold tracking-wide text-sm transition-shadow"
                    >
                        完全版レポートを購入 (¥500)
                    </a>
                </div>
            </div>
        </div>
    );
};
