import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { type AnimalType } from '../data/data';
import { Lock, Bed, Search, Heart } from 'lucide-react';

const Premium: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userType, setUserType] = useState<AnimalType | null>(null);
    const [partnerType, setPartnerType] = useState<AnimalType | null>(null);
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        const unlocked = localStorage.getItem('premium_unlocked');
        if (unlocked === 'true') {
            setIsLocked(false);
            setShowModal(false);
        }

        const state = location.state as { userType: AnimalType, partnerType: AnimalType } | undefined;
        if (state?.userType && state?.partnerType) {
            setUserType(state.userType);
            setPartnerType(state.partnerType);
        }
    }, [location.state]);

    const handleUnlock = () => {
        if (password === 'LOVE2024') {
            setIsLocked(false);
            setShowModal(false);
            localStorage.setItem('premium_unlocked', 'true');
        } else {
            setError('パスワードが違います');
        }
    };

    useEffect(() => {
        document.body.classList.add('bg-brand-midnight', 'text-brand-warm-white');
        return () => {
            document.body.classList.remove('bg-brand-midnight', 'text-brand-warm-white');
        };
    }, []);

    const LockedOverlay = () => (
        <div className="absolute inset-0 z-20 flex flex-col items-center pt-24 px-4">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-brand-midnight/90 pointer-events-none" />
            <div className="absolute top-32 left-0 w-full bottom-0 bg-brand-midnight/90 backdrop-blur-sm" />

            <div className="relative z-30 flex flex-col items-center text-center space-y-6 max-w-sm mt-8">
                <div className="bg-brand-gold/20 p-4 rounded-full animate-bounce-slow">
                    <Lock className="text-brand-gold" size={40} />
                </div>
                <div className="space-y-4">
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-xl font-bold text-sm">
                        ⚠️ 注意: <br />この先には、二人の関係を劇的に変える『具体的なナイトプラン』が書かれています。
                    </div>
                </div>
                <Button
                    size="lg"
                    onClick={() => setShowModal(true)}
                    className="bg-brand-gold hover:bg-yellow-400 text-brand-midnight font-bold w-full shadow-lg shadow-brand-gold/20"
                >
                    パスワードを入力する
                </Button>
            </div>
        </div>
    );

    const description = userType ? userType.description : null;

    return (
        <div className="min-h-screen p-4 pb-12 bg-brand-midnight text-brand-warm-white">
            <header className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/')} className="text-white/50 hover:text-white">Back</button>
                <span className="font-bold text-brand-gold">PREMIUM MEMBER</span>
            </header>

            <Modal
                isOpen={showModal && isLocked}
                onClose={() => navigate('/advice', { state: { userType, partnerType } })}
                title="Premium Unlock"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        記事購入で発行されたパスワードを入力してください。<br />
                        (Test: <strong>LOVE2024</strong>)
                    </p>
                    <Input
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        error={error}
                    />
                    <Button fullWidth onClick={handleUnlock} className="bg-brand-midnight text-white hover:bg-gray-800">
                        解除する
                    </Button>
                </div>
            </Modal>

            <div className={`space-y-8 relative overflow-hidden transition-all duration-500`}>
                <section className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-brand-gold drop-shadow-md">
                        Night Secret<br />
                        <span className="text-lg text-white font-normal opacity-80">for {userType?.name} & {partnerType?.name}</span>
                    </h1>
                </section>

                {/* Deep Psychology (Obsession) */}
                <section className="relative">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Search className="text-brand-coral" />
                        深層心理（絶対的なこだわり）
                    </h2>
                    <Card className="bg-white/10 border-white/10 text-gray-200 leading-relaxed space-y-4 backdrop-blur-md p-6">
                        {description ? (
                            <p>{description.obsession}</p>
                        ) : (
                            <p>Loading analysis...</p>
                        )}
                    </Card>
                </section>

                {/* Night Plan & Reconcile */}
                <section className={`relative ${isLocked ? "select-none" : ""}`}>

                    {/* Night */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                            <Bed className="text-brand-gold" />
                            夜の処方箋（ナイトプラン）
                        </h2>
                        <Card className="min-h-[150px] bg-white/10 border-white/5 backdrop-blur-md text-gray-100 p-6">
                            <div className={isLocked ? "blur-md opacity-50" : ""}>
                                {description ? (
                                    <p className="leading-relaxed">{description.night}</p>
                                ) : <p>Loading...</p>}
                            </div>
                        </Card>
                    </div>

                    {/* Reconcile */}
                    <div>
                        <h2 className="text-xl font-bold text-brand-sage mb-4 flex items-center gap-2">
                            <Heart className="text-brand-sage" />
                            喧嘩時の仲直り戦略
                        </h2>
                        <Card className="min-h-[150px] bg-white/10 border-white/5 backdrop-blur-md text-gray-100 p-6">
                            <div className={isLocked ? "blur-md opacity-50" : ""}>
                                {description ? (
                                    <p className="leading-relaxed">{description.reconcile}</p>
                                ) : <p>Loading...</p>}
                            </div>
                        </Card>
                    </div>

                    {isLocked && <LockedOverlay />}
                </section>
            </div>
        </div>
    );
};

export default Premium;
