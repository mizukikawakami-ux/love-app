import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex flex-col items-center gap-12 text-center animate-fade-in pb-10">

                {/* Hero Section */}
                <section className="mt-12 space-y-6 relative">
                    <div className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-xl shadow-brand-sage/10 border border-brand-sage/20 ring-4 ring-brand-warm-white">
                        <Heart className="text-brand-sage fill-brand-sage/20" size={40} />
                    </div>

                    <div className="space-y-4">
                        <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase">Premium Relationship Care</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            <span className="block text-2xl md:text-3xl font-medium text-gray-400 mb-2">二人の愛の言語、</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sage to-brand-gold">
                                "すれ違い"
                            </span>
                            <span className="text-gray-800">
                                を<br />官能的な絆へ。
                            </span>
                        </h1>
                    </div>

                    <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed">
                        16タイプ診断×心理学で解き明かす、<br />
                        あなたとパートナーの本当の「取扱説明書」。
                    </p>
                </section>

                {/* CTA Section */}
                <section className="w-full max-w-xs space-y-4">
                    <Button
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/question')}
                        className="shadow-2xl shadow-brand-sage/40 text-lg font-bold py-8 bg-brand-sage hover:bg-brand-sage/90 border-none transition-all hover:scale-[1.02]"
                    >
                        今すぐ診断を始める <ArrowRight className="ml-2" />
                    </Button>
                    <p className="text-xs text-brand-sage/60 font-medium">所要時間：約3分 / 完全無料</p>
                </section>

                {/* Features */}
                <section className="grid grid-cols-1 gap-6 w-full mt-8">
                    <FeatureCard
                        icon={<Sparkles className="text-brand-gold" />}
                        title="16動物タイプ診断"
                        description="深層心理に基づくあなたの本質を、16種類の動物キャラクターで表現。"
                    />
                    <FeatureCard
                        icon={<Heart className="text-brand-sage" />}
                        title="夜の処方箋"
                        description="誰にも言えない悩みや、より深い関係を築くための具体的なアドバイス。"
                    />
                    <FeatureCard
                        icon={<MessageCircle className="text-gray-400" />}
                        title="愛の言語攻略法"
                        description="パートナーに響く言葉、行動、触れ合い方をピンポイントで分析。"
                    />
                </section>
            </div>
        </Layout>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <Card className="flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur-md border border-brand-sage/10 hover:border-brand-sage/30 transition-colors shadow-sm hover:shadow-md">
        <div className="p-3 bg-brand-warm-white rounded-full mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed indent-0">{description}</p>
    </Card>
);

export default Home;
