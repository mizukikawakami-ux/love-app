import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-warm-white text-gray-800 font-sans selection:bg-brand-sage/30">
            {/* Elegant Header */}
            <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-brand-sage/10 relative">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-brand-sage to-brand-gold opacity-50"></div>
                <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-lg">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-sage/10 p-1.5 rounded-full group-hover:bg-brand-sage/20 transition-colors">
                            <Heart className="text-brand-sage fill-brand-sage/20" size={20} />
                        </div>
                        <span className="font-bold text-lg tracking-wider text-gray-700 group-hover:text-brand-sage transition-colors">Couple Vibe</span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 max-w-lg relative">
                {/* Background decoration */}
                <div className="fixed top-20 left-0 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                <div className="fixed bottom-20 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -z-10" />

                {children}
            </main>

            <footer className="py-8 text-center bg-white border-t border-brand-sage/10 text-brand-text/60">
                <div className="container mx-auto px-4 space-y-4">
                    <div className="flex justify-center gap-6 text-xs tracking-widest uppercase font-bold text-brand-sage">
                        <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-brand-gold transition-colors">About</Link>
                    </div>
                    <p className="text-xs italic">© 2026 Couple Vibe - Design your love manually.</p>
                </div>
            </footer>
        </div>
    );
};
