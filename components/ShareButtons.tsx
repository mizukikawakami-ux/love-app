'use client';

import React, { useEffect, useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

export const ShareButtons: React.FC<{ shareText: string; path: string }> = ({ shareText, path }) => {
    const [copied, setCopied] = useState(false);
    // 初期値は path（サーバー/クライアント一致）→ マウント後に絶対URLへ更新（hydration不一致を回避）
    const [url, setUrl] = useState(path);

    useEffect(() => {
        setUrl(`${window.location.origin}${path}`);
    }, [path]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* noop */
        }
    };

    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;

    return (
        <div className="text-center space-y-4">
            <p className="text-xs text-gray-400">診断結果をシェアしてパートナーに伝えよう</p>
            <div className="flex gap-3 justify-center">
                <button
                    onClick={handleCopy}
                    className="bg-white rounded-full w-12 h-12 p-0 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-brand-sage hover:border-brand-sage transition-colors"
                    aria-label="リンクをコピー"
                >
                    {copied ? <Check size={18} className="text-brand-sage" /> : <Copy size={18} />}
                </button>
                <a
                    href={xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-full w-12 h-12 p-0 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-brand-sage hover:border-brand-sage transition-colors"
                    aria-label="Xでシェア"
                >
                    <Share2 size={18} />
                </a>
            </div>
        </div>
    );
};
