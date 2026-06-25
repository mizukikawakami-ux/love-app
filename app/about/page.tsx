import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
    title: 'Couple Vibeについて',
    description: '16タイプ性格診断×心理学で、夫婦・カップルのすれ違いの原因と相性を読み解くCoupleVibeについて。',
    alternates: { canonical: '/about' },
};

export default function AboutPage() {
    return (
        <Layout>
            <div className="space-y-6 animate-fade-in pb-16">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Couple Vibeについて</h1>
                <div className="bg-white p-6 rounded-2xl border border-brand-sage/10 space-y-4 text-sm leading-relaxed text-gray-700">
                    <p>
                        Couple Vibeは、16タイプの性格診断と心理学をもとに、夫婦・カップルの「すれ違い」の原因と相性を読み解く診断サービスです。
                        相手を変えようとするのではなく、お互いの「取扱説明書」を知ることから関係を見直すことを目的にしています。
                    </p>
                    <p>
                        診断は約3分・無料。あなたのタイプを知り、パートナーのタイプと組み合わせることで、二人の関係のパターンと、関係を深めるためのヒントが見つかります。
                    </p>
                    <p className="text-xs text-gray-400">
                        ※本サイトの一部にはアフィリエイト広告を含みます。
                    </p>
                </div>
            </div>
        </Layout>
    );
}
