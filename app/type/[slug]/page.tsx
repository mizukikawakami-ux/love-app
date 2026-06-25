import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/Layout';
import { PremiumGate } from '@/components/PremiumGate';
import { IntimacyOffer } from '@/components/IntimacyOffer';
import { ShareButtons } from '@/components/ShareButtons';
import { DeepAnalysisSection } from '@/components/DeepAnalysisSection';
import { NightPlanGame } from '@/components/NightPlanGame';
import { ANIMAL_TYPES } from '@/data/data';
import { DEEP_ANALYSIS } from '@/data/premium_content';
import { ALL_SLUGS, slugToId, idToSlug } from '@/lib/slug';

export const dynamicParams = false;

export function generateStaticParams() {
    return ALL_SLUGS.map((slug) => ({ slug }));
}

function getType(slug: string) {
    const id = slugToId(slug);
    return id ? ANIMAL_TYPES[id] : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const type = getType(slug);
    if (!type) return {};
    const title = `${type.name}タイプの性格・相性・愛の言語`;
    const description = `${type.catchCopy}。${type.description.daily} 16タイプ診断で、あなたとパートナーの相性とすれ違いの原因がわかります。`;
    return {
        title,
        description,
        alternates: { canonical: `/type/${slug}` },
        openGraph: { title: `${title}｜Couple Vibe`, description, url: `/type/${slug}` },
    };
}

export default async function TypePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const type = getType(slug);
    if (!type) notFound();

    return (
        <Layout>
            <div className="space-y-8 animate-fade-in pb-20">
                {/* Header */}
                <div className="text-center space-y-2">
                    <span className="text-brand-sage font-bold tracking-widest text-xs uppercase">Your Type</span>
                    <h1 className="text-2xl font-bold text-gray-800">あなたは「{type.name}」タイプ</h1>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-sage/20 border border-white/50 relative">
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-brand-sage/10 to-transparent" />
                    <div className="p-8 relative z-10 flex flex-col items-center text-center gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-2xl scale-110 opacity-60" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`/images/animals/${slug}.png`}
                                alt={type.name}
                                width={224}
                                height={224}
                                className="w-56 h-56 rounded-full object-cover border-[6px] border-white shadow-xl relative z-10"
                            />
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-sage text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                                {type.name}
                            </div>
                        </div>
                        <div className="space-y-3 mt-4">
                            <h2 className="text-brand-sage font-bold text-sm tracking-widest uppercase">{type.catchCopy}</h2>
                            <p className="text-3xl font-bold text-gray-800">{type.name}</p>
                        </div>

                        {/* Free Content */}
                        <div className="w-full grid grid-cols-1 gap-4 mt-2">
                            <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-sage/10 text-left space-y-2">
                                <div className="flex items-center gap-2 text-brand-sage font-bold text-sm mb-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-sage" />普段の生態
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{type.description.daily}</p>
                            </div>
                            <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-sage/10 text-left space-y-2">
                                <div className="flex items-center gap-2 text-brand-gold font-bold text-sm mb-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold" />絶対的なこだわり
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{type.description.obsession}</p>
                            </div>
                        </div>
                        <div className="w-full bg-brand-sage/5 p-6 rounded-2xl border border-brand-sage/10 text-left space-y-3 mt-2">
                            <h3 className="flex items-center gap-2 text-brand-sage font-bold">
                                <span className="text-lg">❤</span>愛の言語攻略法
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">{type.loveLanguage.advice}</p>
                        </div>
                    </div>
                </div>

                {/* Gated: Night & Deep Analysis (¥500) */}
                <div className="space-y-2">
                    <h2 className="text-center text-xl font-bold text-brand-midnight">夜の生態と深層分析</h2>
                    <p className="text-center text-xs text-gray-500">この先は、誰にも言えない本音の部分です</p>
                </div>
                <PremiumGate>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-left space-y-2">
                            <div className="flex items-center gap-2 text-brand-midnight font-bold text-sm mb-1">
                                <span className="w-2 h-2 rounded-full bg-brand-midnight" />夜の生態
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{type.description.night}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-left space-y-2">
                            <div className="flex items-center gap-2 text-brand-midnight font-bold text-sm mb-1">
                                <span className="w-2 h-2 rounded-full bg-brand-midnight" />喧嘩時の仲直り
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{type.description.reconcile}</p>
                        </div>
                        <div className="mt-6">
                            <DeepAnalysisSection analysis={DEEP_ANALYSIS[type.id]} />
                        </div>
                        <div className="mt-6">
                            <NightPlanGame />
                        </div>
                    </div>
                </PremiumGate>

                {/* Lovense Offer (open, high-intent) */}
                <IntimacyOffer />

                {/* Partner Compatibility Selector → SSG compatibility pages */}
                <div className="space-y-6 pt-8 border-t border-brand-sage/10">
                    <div className="text-center space-y-2">
                        <span className="text-brand-sage font-bold tracking-widest text-xs uppercase">Couple Harmony</span>
                        <h2 className="text-2xl font-bold text-gray-800">パートナーとの相性を見る</h2>
                        <p className="text-xs text-gray-500">パートナーのタイプを選んで、二人の相性と処方箋を確認しましょう</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-brand-sage/20">
                        <div className="grid grid-cols-4 gap-2 sm:gap-4">
                            {Object.values(ANIMAL_TYPES).map((animal) => (
                                <Link
                                    key={idToSlug(animal.id)}
                                    href={`/compatibility/${slug}/${idToSlug(animal.id)}`}
                                    className="flex flex-col items-center p-2 rounded-xl hover:bg-brand-sage/10 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-sage/20 mb-1">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`/images/animals/${idToSlug(animal.id)}.png`} alt={animal.name} width={48} height={48} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600">{animal.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <ShareButtons
                    shareText={`私は「${type.name}」タイプでした！あなたとパートナーの相性は？ #CoupleVibe`}
                    path={`/type/${slug}`}
                />
            </div>
        </Layout>
    );
}
