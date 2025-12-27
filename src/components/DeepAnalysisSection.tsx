import React from 'react';
import type { DeepAnalysis } from '../data/premium_content';
import { Brain, AlertOctagon, Moon, MessageCircleHeart } from 'lucide-react';

interface DeepAnalysisSectionProps {
    analysis: DeepAnalysis;
}

export const DeepAnalysisSection: React.FC<DeepAnalysisSectionProps> = ({ analysis }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-center text-brand-midnight mb-6">究極の相性分析レポート</h3>

            <div className="grid gap-6">
                {/* 1. Root Cause */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Brain size={20} />
                        </div>
                        <h4 className="font-bold text-gray-800">すれ違いの根本原因</h4>
                    </div>
                    <h5 className="text-sm font-bold text-brand-midnight mb-2">{analysis.rootCause.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                        {analysis.rootCause.content}
                    </p>
                </div>

                {/* 2. Landmine */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-red-50 rounded-lg text-red-600">
                            <AlertOctagon size={20} />
                        </div>
                        <h4 className="font-bold text-gray-800">緊急回避マニュアル</h4>
                    </div>
                    <h5 className="text-sm font-bold text-brand-midnight mb-2">{analysis.landmine.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">
                        {analysis.landmine.content}
                    </p>
                </div>

                {/* 3. Night Mismatch */}
                <div className="bg-brand-midnight/5 p-6 rounded-2xl border border-brand-midnight/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Moon size={100} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-brand-midnight text-white rounded-lg">
                                <Moon size={20} />
                            </div>
                            <h4 className="font-bold text-brand-midnight">夜のすれ違いと最適解</h4>
                        </div>
                        <h5 className="text-sm font-bold text-gray-800 mb-2">{analysis.nightMismatch.title}</h5>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">
                            {analysis.nightMismatch.content}
                        </p>
                    </div>
                </div>

                {/* 4. Magic Translator */}
                <div className="bg-gradient-to-br from-brand-sage/10 to-brand-gold/10 p-6 rounded-2xl border border-brand-sage/20 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white rounded-lg text-brand-sage shadow-sm">
                            <MessageCircleHeart size={20} />
                        </div>
                        <h4 className="font-bold text-gray-800">魔法の翻訳機</h4>
                    </div>
                    <h5 className="text-sm font-bold text-brand-midnight mb-3">{analysis.magicTranslator.title}</h5>
                    <div className="space-y-3">
                        {analysis.magicTranslator.phrases.map((phrase, index) => (
                            <div key={index} className="bg-white/80 p-3 rounded-xl text-sm text-gray-700 border border-white shadow-sm flex items-start gap-3">
                                <span className="text-brand-gold font-bold text-lg leading-none">“</span>
                                {phrase}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
