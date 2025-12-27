import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { QUESTIONS, type Dimension } from '../data/data';

const Question: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Dimension[]>([]);
    const [isPartnerMode, setIsPartnerMode] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setIsPartnerMode(searchParams.get('mode') === 'partner');
    }, [location.search]);

    const handleAnswer = (value: Dimension) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            navigate('/analysis', { state: { answers: newAnswers, isPartnerMode } });
        }
    };

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

    const questionText = isPartnerMode
        ? `パートナーは... ${currentQuestion.text}`
        : currentQuestion.text;

    return (
        <Layout>
            <div className="max-w-md mx-auto space-y-8 animate-fade-in pb-12">
                {isPartnerMode && (
                    <div className="bg-brand-sage/20 text-brand-sage px-4 py-2 rounded-full text-center text-sm font-bold border border-brand-sage/20">
                        パートナーなりきり診断中
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                        <span>Question {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar progress={progress} className="bg-gray-200" activeClassName="bg-brand-sage" />
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-brand-sage/10 border border-white/50 min-h-[300px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-bl-full -mr-8 -mt-8" />

                    <h2 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed z-10">
                        {questionText}
                    </h2>

                    <div className="flex flex-col gap-4 w-full z-10">
                        {currentQuestion.dimension.options.map((option, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="lg"
                                fullWidth
                                onClick={() => handleAnswer(option.value)}
                                className="h-auto py-5 text-left justify-start px-6 border border-gray-200 hover:border-brand-sage hover:bg-brand-sage/5 text-gray-700 hover:text-brand-sage active:scale-[0.98] transition-all bg-white shadow-sm font-medium rounded-xl group"
                            >
                                <span className="w-6 h-6 rounded-full border border-gray-300 mr-3 flex items-center justify-center group-hover:border-brand-sage group-hover:bg-brand-sage/10 transition-colors">
                                    <span className="w-2.5 h-2.5 rounded-full bg-brand-sage opacity-0 group-hover:opacity-100 transition-opacity" />
                                </span>
                                {option.text}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => {
                            if (currentQuestionIndex > 0) {
                                setCurrentQuestionIndex(prev => prev - 1);
                                setAnswers(prev => prev.slice(0, -1));
                            } else {
                                navigate('/');
                            }
                        }}
                        className="text-gray-400 text-sm hover:text-gray-600 underline"
                    >
                        前の質問に戻る
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Question;
