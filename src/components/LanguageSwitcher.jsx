import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1 border border-slate-700">
            <button
                onClick={() => setLanguage('no')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${language === 'no'
                        ? 'bg-nordic-accent text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
            >
                NO
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${language === 'en'
                        ? 'bg-nordic-accent text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
