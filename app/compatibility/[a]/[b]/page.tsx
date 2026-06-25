import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PremiumGate } from '@/components/PremiumGate';
import { IntimacyOffer } from '@/components/IntimacyOffer';
import { ShareButtons } from '@/components/ShareButtons';
import { NightPlanGame } from '@/components/NightPlanGame';
import { ANIMAL_TYPES } from '@/data/data';
import { calculateCompatibility } from '@/lib/logic';
import { ALL_SLUGS, slugToId } from '@/lib/slug';

export const dynamicParams = false;

export function generateStaticParams() {
    const params: { a: string; b: string }[] = [];
    for (const a of ALL_SLUGS) for (const b of ALL_SLUGS) params.push({ a, b });
    return params;
}

function getPair(a: string, b: string) {
    const ia = slugToId(a);
    const ib = slugToId(b);
    if (ia && ib) return { userType: ANIMAL_TYPES[ia], partnerType: ANIMAL_TYPES[ib] };
    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ a: string; b: string }> }): Promise<Metadata> {
    const { a, b } = await params;
    const pair = getPair(a, b);
    if (!pair) return {};
    const { userType, partnerType } = pair;
    const result = calculateCompatibility(userType, partnerType);
    const title = `${userType.name}×${partnerType.name}の相性`;
    const description = `${result.title}。${userType.name}と${partnerType.name}が惹かれ合う理由とすれ違いの種、二人の関係を深める処方箋を心理学で分析します。`;
    return {
        title,
        description,
        alternates: { canonical: `/compatibility/${a}/${b}` },
        openGraph: { title: `${title}｜Couple Vibe`, description, url: `/compatibility/${a}/${b}` },
    };
}

export default async function CompatibilityPage({ params }: { params: Promise<{ a: string; b: string }> }) {
    const { a, b } = await params;
    const pair = getPair(a, b);
    if (!pair) notFound();
    const { userType, partnerType } = pair;
    const result = calculateCompatibility(userType, partnerType);

    return (
        <Layout>
            <div className="space-y-8 animate-fade-in pb-20">
                {/* Header */}
                <div className="text-center space-y-3">
                    <span className="text-brand-sage font-bold tracking-widest text-xs uppercase">Couple Harmony</span>
                    <h1 className="text-2xl font-bold text-brand-gold">{result.title}</h1>
                    <div className="flex items-center justify-center gap-3">
                        <Link href={`/type/${a}`} className="flex flex-col items-center group">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-sage/30 group-hover:border-brand-sage transition-colors">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`/images/animals/${a}.png`} alt={userType.name} width={64} height={64} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 mt-1 group-hover:text-brand-sage">{userType.name}</span>
                        </Link>
                        <Link href={`/type/${b}`} className="flex flex-col items-center group">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-sage/30 group-hover:border-brand-sage transition-colors">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`/images/animals/${b}.png`} alt={partnerType.name} width={64} height={64} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-600 mt-1 group-hover:text-brand-sage">{partnerType.name}</span>
                        </Link>
                    </div>
                    <p className="text-xs text-gray-400">{userType.name} × {partnerType.name}</p>
                </div>

                {/* Free: Harmony */}
                <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                    <h2 className="font-bold text-green-800 text-sm mb-3 flex items-center gap-2">
                        <CheckCircle2 size={16} />Harmony Points（惹かれ合う理由）
                    </h2>
                    <ul className="space-y-2">
                        {result.harmony.map((point, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>{point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Free: Friction */}
                <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                    <h2 className="font-bold text-brand-gold text-sm mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} />Friction Points（すれ違いの種）
                    </h2>
                    <ul className="space-y-2">
                        {result.friction.length > 0 ? result.friction.map((point, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-orange-300 mt-1">•</span>{point}
                            </li>
                        )) : (
                            <li className="text-sm text-gray-600">大きなすれ違いの種は少なめ。似た者同士の安心感があるペアです。</li>
                        )}
                    </ul>
                </div>

                {/* Gated: Solution / Night / Reconcile (¥500) */}
                <div className="space-y-2">
                    <h2 className="text-center text-xl font-bold text-brand-midnight flex items-center justify-center gap-2">
                        <Lock size={18} />解決の処方箋
                    </h2>
                    <p className="text-center text-xs text-gray-500">二人のための、具体的なすれ違い解消法</p>
                </div>
                <PremiumGate>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-brand-midnight/5 p-6 rounded-2xl border border-brand-midnight/10">
                            <h3 className="font-bold text-brand-midnight text-sm mb-2">関係を変える第一歩</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{result.solution}</p>
                        </div>
                        <div className="bg-brand-midnight/5 p-6 rounded-2xl border border-brand-midnight/10">
                            <h3 className="font-bold text-brand-midnight text-sm mb-2">盛り上がる夜の過ごし方</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{result.nightStrategy}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <h3 className="font-bold text-brand-midnight text-sm mb-2">喧嘩時の仲直り</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">{result.reconcileStrategy}</p>
                        </div>
                        <div className="mt-4">
                            <NightPlanGame />
                        </div>
                    </div>
                </PremiumGate>

                {/* Lovense Offer (open, high-intent) */}
                <IntimacyOffer />

                <ShareButtons
                    shareText={`私たちは「${result.title}」（${userType.name}×${partnerType.name}）でした！あなたたちの相性は？ #CoupleVibe`}
                    path={`/compatibility/${a}/${b}`}
                />
            </div>
        </Layout>
    );
}
