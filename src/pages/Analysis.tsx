import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input'; // Assuming Input exists from Premium.tsx context
import { calculateScores, determineAnimalType, calculateCompatibility, type CompatibilityResult } from '../utils/logic';
import { type Dimension, type AnimalType, ANIMAL_TYPES } from '../data/data';
import { Lock, Share2, Copy, Heart, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { DeepAnalysisSection } from '../components/DeepAnalysisSection';
import { NightPlanGame } from '../components/NightPlanGame';
import { DEEP_ANALYSIS } from '../data/premium_content';

const Analysis: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userType, setUserType] = useState<AnimalType | null>(null);
    const [partnerType, setPartnerType] = useState<AnimalType | null>(null);
    const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check local storage for unlock status
        const unlocked = localStorage.getItem('premium_unlocked');
        if (unlocked === 'true') {
            setIsLocked(false);
        }

        const answers = location.state?.answers as Dimension[] | undefined;
        if (!answers || answers.length === 0) {
            // For production: Redirect if no answers, but for dev we might handle differently
            // navigate('/'); 
            // For now, if no answers, we redirect
            if (!userType) navigate('/');
        } else {
            const scores = calculateScores(answers);
            const type = determineAnimalType(scores);
            setUserType(type);
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (userType && partnerType) {
            const result = calculateCompatibility(userType, partnerType);
            setCompatibility(result);
        }
    }, [userType, partnerType]);

    const handleUnlock = () => {
        if (password === 'MidnightKey') {
            setIsLocked(false);
            localStorage.setItem('premium_unlocked', 'true');
            setError('');
        } else {
            setError('パスワードが違います');
        }
    };

    if (!userType) return null;

    // Helper to split text for Mosaic effect
    const splitText = (text: string) => {
        const sentences = text.split('。');
        const first = sentences[0] + (sentences.length > 1 ? '。' : '');
        const rest = text.replace(first, '');
        return { first, rest };
    };

    const nightContent = splitText(userType.description.night);
    const reconcileContent = splitText(userType.description.reconcile);

    return (
        <Layout>
            <div className="space-y-8 animate-fade-in pb-20">
                {/* Header Section */}
                <div className="text-center space-y-2">
                    <span className="text-brand-sage font-bold tracking-widest text-xs uppercase">Your Diagnosis</span>
                    <h1 className="text-2xl font-bold text-gray-800">あなたの本質的な性格</h1>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-sage/20 border border-white/50 relative">
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-brand-sage/10 to-transparent" />

                    <div className="p-8 relative z-10 flex flex-col items-center text-center gap-6">
                        {/* Animal Image */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-2xl scale-110 opacity-60 group-hover:scale-125 transition-transform duration-700" />
                            <img
                                src={userType.image}
                                alt={userType.name}
                                className="w-56 h-56 rounded-full object-cover border-[6px] border-white shadow-xl relative z-10"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=No+Image';
                                }}
                            />
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-sage text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                                {userType.id} TYPE
                            </div>
                        </div>

                        {/* Title & Catchcopy */}
                        <div className="space-y-3 mt-4">
                            <h3 className="text-brand-sage font-bold text-sm tracking-widest uppercase">{userType.catchCopy}</h3>
                            <h2 className="text-3xl font-bold text-gray-800">{userType.name}</h2>
                        </div>

                        {/* Daily Vibe & Obsession (Free Content) */}
                        <div className="w-full grid grid-cols-1 gap-4 mt-4">
                            <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-sage/10 text-left space-y-2">
                                <div className="flex items-center gap-2 text-brand-sage font-bold text-sm mb-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-sage" />
                                    普段の生態
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{userType.description.daily}</p>
                            </div>

                            <div className="bg-brand-warm-white p-6 rounded-2xl border border-brand-sage/10 text-left space-y-2">
                                <div className="flex items-center gap-2 text-brand-gold font-bold text-sm mb-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                                    絶対的なこだわり
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{userType.description.obsession}</p>
                            </div>
                        </div>

                        {/* Love Language Strategy (Free Content) */}
                        <div className="w-full bg-brand-sage/5 p-6 rounded-2xl border border-brand-sage/10 text-left space-y-3 mt-2">
                            <h3 className="flex items-center gap-2 text-brand-sage font-bold">
                                <span className="text-lg">❤</span>
                                愛の言語攻略法: Type {userType.loveLanguage.type}
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                {userType.loveLanguage.advice}
                            </p>
                        </div>

                    </div>

                    {/* Locked Section (Night Vibe & Reconcile) */}
                    <div className="relative" id="night-vibe-section">
                        {/* The Content */}
                        <div className={`p-8 grid grid-cols-1 gap-4 bg-brand-midnight/5 transition-all duration-700 border-t border-brand-sage/10`} id="premium-content-start">

                            {/* Night Vibe */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-left space-y-2 relative overflow-hidden">
                                <div className="flex items-center gap-2 text-brand-midnight font-bold text-sm mb-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-midnight" />
                                    夜の生態
                                </div>
                                <div className="text-gray-700 text-sm leading-relaxed relative">
                                    <span className="font-medium text-gray-800">{nightContent.first}</span>
                                    <span className={`${isLocked ? 'blur-md select-none opacity-60' : ''} transition-all duration-500`}>
                                        {nightContent.rest}
                                    </span>
                                </div>
                            </div>

                            {/* Reconcile */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-left space-y-2 relative overflow-hidden">
                                <div className="flex items-center gap-2 text-brand-midnight font-bold text-sm mb-1">
                                    <span className="w-2 h-2 rounded-full bg-brand-midnight" />
                                    喧嘩時の仲直り
                                </div>
                                <div className="text-gray-700 text-sm leading-relaxed relative">
                                    <span className="font-medium text-gray-800">{reconcileContent.first}</span>
                                    <span className={`${isLocked ? 'blur-md select-none opacity-60' : ''} transition-all duration-500`}>
                                        {reconcileContent.rest}
                                    </span>
                                </div>
                            </div>

                            {/* --- PREMIUM EXPANSION (Visible Only When Unlocked) --- */}
                            {!isLocked && (
                                <div className="mt-8 space-y-12 animate-fade-in">
                                    {/* Deep Analysis */}
                                    <DeepAnalysisSection analysis={DEEP_ANALYSIS[userType.id]} />
                                </div>
                            )}
                        </div>

                        {/* Lock Overlay */}
                        {isLocked && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[4px] p-6 text-center space-y-6 pt-20">
                                <div className="bg-white p-4 rounded-full shadow-2xl border border-brand-gold/20 animate-bounce-slow">
                                    <Lock className="text-brand-gold w-8 h-8" />
                                </div>

                                <div className="space-y-4 w-full max-w-xs bg-white/90 p-6 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm">
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-gray-800 text-lg">続きを見るには</h3>
                                        <p className="text-xs text-gray-500">
                                            パスワードを入力して<br />すべてのシークレットを解除
                                        </p>
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="パスワードを入力して詳細を確認"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={error}
                                            className="text-center tracking-widest text-[10px]"
                                        />
                                        <Button
                                            onClick={handleUnlock}
                                            fullWidth
                                            className="bg-brand-midnight text-white hover:bg-black"
                                        >
                                            解除する
                                        </Button>
                                    </div>

                                    <div className="relative py-2">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">or</span></div>
                                    </div>

                                    {/* Buy Button */}
                                    <Button
                                        onClick={() => window.open('https://note.com/couple_vibe/n/n26aff90c4765', '_blank')}
                                        className="w-full bg-gradient-to-r from-brand-gold to-yellow-600 border-none text-white shadow-brand-gold/30 hover:shadow-brand-gold/50 rounded-xl py-3 font-bold tracking-wide text-sm"
                                    >
                                        完全版レポートを購入 (¥500)
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Compatibility Section (Couple Harmony) */}
                <div className="space-y-6 pt-8 border-t border-brand-sage/10">
                    <div className="text-center space-y-2">
                        <span className="text-brand-sage font-bold tracking-widest text-xs uppercase">Couple Harmony</span>
                        <h2 className="text-2xl font-bold text-gray-800">パートナーとの相性分析</h2>
                        <p className="text-xs text-gray-500">お互いのタイプを選択して、関係を深めるヒントを見つけましょう</p>
                    </div>

                    {/* Partner Selector */}
                    {!partnerType ? (
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-brand-sage/20">
                            <h3 className="text-center font-bold text-gray-700 mb-4">パートナーのタイプを選んでください</h3>
                            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                                {Object.values(ANIMAL_TYPES).map((animal) => (
                                    <button
                                        key={animal.id}
                                        onClick={() => setPartnerType(animal)}
                                        className="flex flex-col items-center p-2 rounded-xl hover:bg-brand-sage/10 transition-colors"
                                    >
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-sage/20 mb-1">
                                            <img src={animal.image} alt={animal.name} className="w-full h-full object-cover"
                                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=' + animal.id }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-600">{animal.id}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Compatibility Result */
                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-brand-gold/20 animate-fade-in">
                            <div className="bg-brand-sage/10 p-4 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Heart className="text-brand-sage fill-brand-sage" size={20} />
                                    Diagnosis Result
                                </h3>
                                <button onClick={() => setPartnerType(null)} className="text-xs text-gray-500 underline">変更する</button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Title */}
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-brand-gold mb-1">{compatibility?.title}</h2>
                                    <p className="text-xs text-gray-400">{userType.name} × {partnerType.name}</p>
                                </div>

                                {/* Harmony Points */}
                                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                                    <h4 className="font-bold text-green-800 text-sm mb-3 flex items-center gap-2">
                                        <CheckCircle2 size={16} />
                                        Harmony Points (惹かれ合う理由)
                                    </h4>
                                    <ul className="space-y-2">
                                        {compatibility?.harmony.map((point, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                                <span className="text-green-400 mt-1">•</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Friction Points */}
                                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                                    <h4 className="font-bold text-brand-gold text-sm mb-3 flex items-center gap-2">
                                        <AlertTriangle size={16} />
                                        Friction Points (すれ違いの種)
                                    </h4>
                                    <ul className="space-y-2">
                                        {compatibility?.friction.map((point, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                                <span className="text-orange-300 mt-1">•</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Solution (Locked) */}
                                <div className={`relative mt-4 transition-all duration-500 ${isLocked ? 'min-h-[440px]' : ''}`}>
                                    <div className="bg-brand-midnight/5 p-6 rounded-xl border border-brand-midnight/10 h-full flex flex-col">
                                        <h4 className="font-bold text-brand-midnight text-sm mb-2 flex items-center gap-2">
                                            <Lock size={16} />
                                            解決の処方箋
                                        </h4>
                                        <div className="text-sm text-gray-700 leading-relaxed mb-4">
                                            <span className="font-bold text-gray-800 confirm-visible">
                                                {compatibility && splitText(compatibility.solution).first}
                                            </span>
                                            <span className={`${isLocked ? 'blur-md select-none opacity-60' : ''} transition-all duration-500`}>
                                                {compatibility && splitText(compatibility.solution).rest}
                                            </span>
                                        </div>

                                        {/* New Premium Dynamic Content */}
                                        <div className="mt-8 space-y-6">
                                            {/* Night Strategy */}
                                            <div className="bg-brand-midnight/5 p-4 rounded-xl border border-brand-midnight/10">
                                                <h5 className="font-bold text-brand-midnight text-xs mb-2 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-brand-midnight rounded-full" />
                                                    盛り上がる夜の過ごし方
                                                </h5>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <span className="font-bold text-gray-800 confirm-visible">
                                                        {compatibility && splitText(compatibility.nightStrategy).first}
                                                    </span>
                                                    <span className={`${isLocked ? 'blur-md select-none opacity-60' : ''} transition-all duration-500`}>
                                                        {compatibility && splitText(compatibility.nightStrategy).rest}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Reconcile Strategy */}
                                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                <h5 className="font-bold text-brand-midnight text-xs mb-2 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-brand-midnight rounded-full" />
                                                    喧嘩時の仲直り
                                                </h5>
                                                <div className="text-sm text-gray-700 leading-relaxed">
                                                    <span className="font-bold text-gray-800 confirm-visible">
                                                        {compatibility && splitText(compatibility.reconcileStrategy).first}
                                                    </span>
                                                    <span className={`${isLocked ? 'blur-md select-none opacity-60' : ''} transition-all duration-500`}>
                                                        {compatibility && splitText(compatibility.reconcileStrategy).rest}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Night Plan Game - Locked Area */}
                                            <div className={`${isLocked ? 'opacity-50 pointer-events-none filter blur-sm' : ''} transition-all duration-500`}>
                                                <div className="relative">
                                                    {/* Overlay for Locked State */}
                                                    {isLocked && <div className="absolute inset-0 z-10" />}
                                                    <NightPlanGame />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Premium Navigation Links (Soft Sell) */}
                                        <div className="mt-auto pt-4 border-t border-brand-midnight/10">
                                            <p className="text-xs text-gray-500 mb-2 font-bold">他にもこんなシークレットがあります</p>
                                            <div className="flex gap-2">
                                                <a href="#premium-content-start" className="text-[10px] bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:bg-brand-sage/10 hover:border-brand-sage transition-colors">
                                                    夜の生態
                                                </a>
                                                <a href="#night-strategy-section" className="text-[10px] bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:bg-brand-sage/10 hover:border-brand-sage transition-colors">
                                                    盛り上がる夜の過ごし方
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {isLocked && (
                                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[4px] p-6 text-center space-y-4 rounded-xl pt-16">
                                            <div className="bg-white p-3 rounded-full shadow-lg border border-brand-gold/20">
                                                <Lock className="text-brand-gold w-6 h-6" />
                                            </div>

                                            <div className="space-y-3 w-full max-w-xs bg-white/90 p-5 rounded-xl shadow-xl border border-white/50 backdrop-blur-sm">
                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-gray-800 text-sm">続きを見るには</h3>
                                                </div>

                                                {/* Password Input */}
                                                <div className="space-y-2">
                                                    <Input
                                                        placeholder="パスワードを入力して詳細を確認"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        error={error}
                                                        className="text-center tracking-widest text-[10px] h-9 px-1"
                                                    />
                                                    <Button
                                                        onClick={handleUnlock}
                                                        fullWidth
                                                        size="sm"
                                                        className="bg-brand-midnight text-white hover:bg-black h-9"
                                                    >
                                                        解除する
                                                    </Button>
                                                </div>

                                                <div className="relative py-1">
                                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                                                    <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-gray-400">or</span></div>
                                                </div>

                                                {/* Buy Button */}
                                                <Button
                                                    onClick={() => window.open('https://note.com/couple_vibe/n/n26aff90c4765', '_blank')}
                                                    className="w-full bg-gradient-to-r from-brand-gold to-yellow-600 border-none text-white shadow-brand-gold/30 hover:shadow-brand-gold/50 rounded-lg py-2 font-bold tracking-wide text-xs"
                                                >
                                                    完全版レポートを購入 (¥500)
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Share */}
                <div className="text-center space-y-4">
                    <p className="text-xs text-gray-400">診断結果をシェアしてパートナーに伝えよう</p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="outline" className="bg-white rounded-full w-12 h-12 p-0 flex items-center justify-center border-gray-200 text-gray-400 hover:text-brand-sage hover:border-brand-sage">
                            <Copy size={18} />
                        </Button>
                        <Button variant="outline" className="bg-white rounded-full w-12 h-12 p-0 flex items-center justify-center border-gray-200 text-gray-400 hover:text-brand-sage hover:border-brand-sage">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Analysis;
