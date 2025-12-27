import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="space-y-12 animate-fade-in pb-20">
                {/* Hero Section */}
                <section className="text-center space-y-6 pt-10">
                    <div className="inline-flex items-center justify-center p-3 bg-brand-sage/10 rounded-full text-brand-sage mb-2">
                        <Heart size={24} fill="currentColor" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                        なぜ、愛し合っているのに<br />
                        すれ違ってしまうのか？
                    </h1>
                    <p className="text-brand-sage font-bold tracking-widest text-sm text-gray-500">
                        DEVELOPER STORY
                    </p>
                </section>

                {/* Story Content */}
                <section className="max-w-xl mx-auto space-y-8 text-gray-700 leading-loose">
                    <p>
                        こんにちは、Couple Vibe開発者です。
                    </p>
                    <p>
                        このアプリを作ったきっかけは、私自身の痛い経験にあります。
                        当時付き合っていたパートナーのことを、私は心から愛していました。
                        彼女が喜ぶと思い、サプライズでプレゼントを贈ったり、
                        週末のデートプランを完璧に練ったりしていました。
                    </p>
                    <p className="font-bold text-gray-800 border-l-4 border-brand-sage pl-4">
                        しかし、彼女の顔は晴れませんでした。
                    </p>
                    <p>
                        「私の話、聞いてないよね？」<br />
                        そう言われた時の衝撃を今でも覚えています。
                        私は彼女のために「行動」し、「ギフト」を贈っていましたが、
                        彼女が求めていたのは、ただ隣に座って過ごす「時間」と、肯定的な「言葉」だったのです。
                    </p>
                    <p>
                        私たちは「愛の言語」が違っていただけでした。
                        それに気づかず、良かれと思ってやったことが、逆に相手を孤独にさせていたのです。
                    </p>
                    <p>
                        この悲劇を繰り返したくない。<br />
                        そんな思いから、心理学とMBTIの理論をベースに、
                        カップルのすれ違いを可視化し、具体的な「処方箋」を提示するこのアプリを開発しました。
                    </p>
                    <p>
                        あなたとパートナーが、互いの「取扱説明書」を手に入れ、
                        もっと深く、もっと自由に愛し合えるようになることを願っています。
                    </p>
                </section>

                {/* CTA */}
                <section className="text-center pt-8">
                    <Button
                        size="lg"
                        className="shadow-xl shadow-brand-sage/30 animate-pulse-slow"
                        onClick={() => navigate('/question')}
                    >
                        二人の診断を始める <ArrowRight size={20} className="ml-2" />
                    </Button>
                </section>
            </div>
        </Layout>
    );
};

export default About;
