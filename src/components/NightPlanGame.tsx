import React, { useState } from 'react';
import { NIGHT_ACTIONS, type NightAction } from '../data/premium_content';
import { Sparkles, Play, RefreshCw, Clock } from 'lucide-react';

export const NightPlanGame: React.FC = () => {
    const [gameState, setGameState] = useState<'IDLE' | 'SELECT' | 'RESULT'>('IDLE');
    const [candidates, setCandidates] = useState<NightAction[]>([]);
    const [selectedAction, setSelectedAction] = useState<NightAction | null>(null);

    const startGame = () => {
        // Shuffle and pick 2 unique actions
        const shuffled = [...NIGHT_ACTIONS].sort(() => 0.5 - Math.random());
        setCandidates(shuffled.slice(0, 2));
        setGameState('SELECT');
        setSelectedAction(null);
    };

    const handleSelect = (action: NightAction) => {
        setSelectedAction(action);
        setGameState('RESULT');
    };


    return (
        <div className="bg-brand-midnight/5 p-6 rounded-[2rem] border border-brand-midnight/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

            <div className="text-center mb-6">
                <span className="text-brand-gold font-bold tracking-[0.2em] text-[10px] uppercase flex items-center justify-center gap-2">
                    <Sparkles size={12} />
                    Night Plan Roulette
                    <Sparkles size={12} />
                </span>
                <h3 className="text-2xl font-bold text-brand-midnight mt-1">今夜のナイトプラン</h3>
                <p className="text-xs text-gray-500 mt-2">
                    AIが二人のために特別なミッションを厳選。<br />
                    直感でカードを選んで、今夜の過ごし方を運命に委ねましょう。
                </p>
            </div>

            {gameState === 'IDLE' && (
                <div className="text-center py-8">
                    <button
                        onClick={startGame}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-200 bg-brand-midnight rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-midnight overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                        <span className="relative flex items-center gap-2">
                            <Play size={16} className="fill-current" />
                            運命のアクションを引く
                        </span>
                    </button>
                    <p className="text-[10px] text-gray-400 mt-4">
                        ※Soft, Middle, Hardの全{NIGHT_ACTIONS.length}種類からランダムに選出されます
                    </p>
                </div>
            )}

            {gameState === 'SELECT' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    {candidates.map((action, idx) => (
                        <button
                            key={action.id}
                            onClick={() => handleSelect(action)}
                            className="relative aspect-[3/4] rounded-xl border-2 border-brand-gold/30 bg-white shadow-lg hover:shadow-brand-gold/20 hover:border-brand-gold hover:-translate-y-1 transition-all group overflow-hidden flex flex-col items-center justify-center p-4 text-center cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-xl font-serif text-brand-gold">?</span>
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Choice {String.fromCharCode(65 + idx)}</span>
                            <span className="text-sm font-bold text-gray-800">運命のカード</span>
                            <span className="text-[10px] text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">タップで決定</span>
                        </button>
                    ))}
                </div>
            )}

            {gameState === 'RESULT' && selectedAction && (
                <div className="animate-flip-in space-y-6">
                    <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold shadow-xl relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 bg-brand-gold text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10">
                            {selectedAction.category} MODE
                        </div>
                        {selectedAction.duration && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                <Clock size={10} />
                                {selectedAction.duration}
                            </div>
                        )}

                        <div className="pt-6 pb-4">
                            <h3 className="text-xl font-bold text-brand-midnight mb-4">{selectedAction.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed text-left bg-brand-warm-white p-4 rounded-xl">
                                {selectedAction.description}
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={startGame}
                            className="text-xs text-gray-500 hover:text-brand-midnight underline flex items-center justify-center gap-1 mx-auto"
                        >
                            <RefreshCw size={12} />
                            もう一度引く
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
