import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { type AnimalType } from '../data/data';
import { Lock, Star, ShoppingBag } from 'lucide-react';

const Advice: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userType, setUserType] = useState<AnimalType | null>(null);
    const [partnerType, setPartnerType] = useState<AnimalType | null>(null);

    useEffect(() => {
        const state = location.state as { userType: AnimalType, partnerType: AnimalType } | undefined;
        if (!state?.userType || !state?.partnerType) {
            navigate('/');
            return;
        }
        setUserType(state.userType);
        setPartnerType(state.partnerType);
    }, [location.state, navigate]);

    if (!userType || !partnerType) return null;

    // Mock score
    const compatibilityScore = 85;

    return (
        <Layout>
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                    <h2 className="text-lg font-medium text-gray-600">二人の相性スコア</h2>
                    <div className="text-6xl font-black text-brand-orange drop-shadow-sm">
                        {compatibilityScore}<span className="text-3xl">%</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        {userType.name} × {partnerType.name}
                    </p>
                </div>

                <section>
                    <Card className="border-l-4 border-l-brand-orange">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Star className="text-brand-orange fill-brand-orange" size={20} />
                            基本アドバイス
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            愛の言語が異なる二人ですが、お互いの違いを理解することで、より深い絆を築くことができます。
                            {userType.name}のあなたは「言葉」や「スキンシップ」を大切にする一方、
                            パートナーは別の形で愛情を示しているかもしれません。
                            毎日の挨拶に一言プラスするだけで、関係劇的に改善するでしょう。
                            まずは相手の「愛の言語」を意識して行動してみましょう。
                        </p>
                    </Card>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-3 px-1">
                        <ShoppingBag className="text-brand-pink" size={20} />
                        <h3 className="font-bold text-gray-800">おすすめアイテム</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="#" className="block group">
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                <img src="https://placehold.co/300x300/png?text=Game" alt="Board Game" className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                                <div className="p-3">
                                    <p className="text-xs font-bold text-gray-800 line-clamp-2">会話が弾むカップル専用ボードゲーム</p>
                                </div>
                            </div>
                        </a>
                        <a href="#" className="block group">
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                <img src="https://placehold.co/300x300/png?text=Pair" alt="Mug" className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                                <div className="p-3">
                                    <p className="text-xs font-bold text-gray-800 line-clamp-2">お揃いで使えるマグカップセット</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>

                <section className="pt-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />
                        <Card className="blur-[2px] opacity-70">
                            <h3 className="font-bold mb-2">夜の営み（ナイトプラン）</h3>
                            <p className="text-sm">パートナーをその気にさせる魔法の言葉とは...</p>
                        </Card>

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 bg-brand-pink rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce-slow">
                                <Lock className="text-white" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">もっと深く知りたい？</h3>
                            <p className="text-sm text-gray-600 mb-6 max-w-xs">
                                夜の生活の具体的なアドバイスや、<br />喧嘩の仲直り方法を見るにはプレミアムへ
                            </p>
                            <Button
                                size="lg"
                                fullWidth
                                onClick={() => navigate('/premium', { state: { userType, partnerType } })}
                                className="bg-brand-pink hover:bg-pink-400 text-brand-text font-bold shadow-xl shadow-brand-pink/30"
                            >
                                詳細を見る (Premium)
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Advice;
