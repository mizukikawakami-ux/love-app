import React from 'react';
import { Moon, ArrowRight } from 'lucide-react';

/**
 * 「夜の処方箋」の文脈に置く、Lovenseアフィリエイトの訴求ブロック。
 * 段階分離：クリーンなタイプ紹介の下、高intentな位置にオープン配置（¥500ペイウォールの外）。
 * 規約：割引コードは記載しない／公式が最新／非公式明記。
 */
const LINKS = {
    bundle: 'https://www.lovense.com/r/ymfyrj',
    lush4: 'https://www.lovense.com/r/rog37a',
    ferri: 'https://www.lovense.com/r/xxfd51',
    lp: 'https://futari-no-ondo.vercel.app',
};

export const IntimacyOffer: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-brand-midnight/[0.04] to-brand-gold/[0.04] p-6 rounded-2xl border border-brand-midnight/10">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-brand-midnight text-white rounded-lg">
                    <Moon size={18} />
                </div>
                <h4 className="font-bold text-brand-midnight">夜の処方箋：止まった空気を動かす"きっかけ"</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                「したい」と言葉にするより、道具を"間接的なきっかけ"にするほうが、誘うのが苦手な人ほど一歩を踏み出しやすくなります。
                二人で始めやすい、ハードルの低いものを集めました。
            </p>

            <div className="grid grid-cols-1 gap-2">
                <a href={LINKS.bundle} target="_blank" rel="nofollow noopener sponsored"
                   className="flex items-center justify-between bg-white border border-brand-gold/30 rounded-xl px-4 py-3 hover:border-brand-gold transition-colors">
                    <span className="text-sm font-bold text-gray-800">🔥 二人で始めるセット（Lush 4＋Ferri）</span>
                    <ArrowRight size={16} className="text-brand-gold" />
                </a>
                <div className="grid grid-cols-2 gap-2">
                    <a href={LINKS.lush4} target="_blank" rel="nofollow noopener sponsored"
                       className="text-center bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:border-brand-sage transition-colors">
                        Lush 4
                    </a>
                    <a href={LINKS.ferri} target="_blank" rel="nofollow noopener sponsored"
                       className="text-center bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:border-brand-sage transition-colors">
                        Ferri
                    </a>
                </div>
                <a href={LINKS.lp} target="_blank" rel="noopener"
                   className="text-center text-xs text-brand-sage underline mt-1">
                    選び方を詳しく見る（ふたりの温度）
                </a>
            </div>

            <p className="text-[10px] text-gray-400 leading-relaxed mt-4">
                ※本セクションはアフィリエイト広告を含みます。当サイトはLovense（HYTTO PTE. LTD.）の公式・関連サイトではありません。価格・在庫は公式サイトの表示が最新です。
            </p>
        </div>
    );
};
