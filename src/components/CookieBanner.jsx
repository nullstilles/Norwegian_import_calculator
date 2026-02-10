import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleConsent = (type) => { // 'all' or 'necessary'
        localStorage.setItem('cookieConsent', type);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl animate-fade-in-up p-4 md:p-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800 rounded-xl hidden md:block">
                        <Cookie className="text-nordic-accent" size={24} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-white font-bold text-lg">Vi bruker informasjonskapsler</h3>
                        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                            Vi bruker cookies for å forbedre opplevelsen din, lagre innstillinger (som mørk modus valuta) og analysere trafikken. Du kan velge å godta alle eller kun nødvendige.
                            <Link to="/personvern" className="text-nordic-accent hover:underline ml-1">Les personvernerklæring</Link>.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => handleConsent('necessary')}
                        className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors text-sm whitespace-nowrap"
                    >
                        Kun nødvendige
                    </button>
                    <button
                        onClick={() => handleConsent('all')}
                        className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-nordic-accent hover:bg-nordic-accentHover text-white font-bold shadow-lg shadow-blue-500/20 transition-all text-sm whitespace-nowrap"
                    >
                        Godta alle
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
