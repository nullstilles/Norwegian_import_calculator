import { useState, useMemo } from 'react';
import { Percent } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Prosent = () => {
    const { t } = useLanguage();
    const [mode, setMode] = useState(0); // 0, 1, 2
    const [valA, setValA] = useState('');
    const [valB, setValB] = useState('');

    const result = useMemo(() => {
        const a = parseFloat(valA);
        const b = parseFloat(valB);
        if (isNaN(a) || isNaN(b)) return null;

        if (mode === 0) {
            // What is X% of Y? (Y * (X/100))
            return b * (a / 100);
        }
        if (mode === 1) {
            // X is how many % of Y? ((X/Y) * 100)
            if (b === 0) return 0;
            return (a / b) * 100;
        }
        if (mode === 2) {
            // Growth from A to B
            if (a === 0) return 0;
            return ((b - a) / a) * 100;
        }
        return 0;
    }, [mode, valA, valB]);

    const tabs = [
        t('prosentCalc.tabs.0'),
        t('prosentCalc.tabs.1'),
        t('prosentCalc.tabs.2')
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO title={t('prosentCalc.title')} path="/prosent" />
            <div className="bg-white dark:bg-nordic-card rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden min-h-[600px] flex flex-col">
                <div className="bg-slate-900 dark:bg-slate-800 p-8 text-center pb-12">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white/10 p-3 rounded-xl">
                            <Percent size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{t('prosentCalc.title')}</h1>
                </div>

                <div className="px-6 -mt-8 flex justify-center w-full">
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex w-full max-w-lg">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => { setMode(i); setValA(''); setValB(''); }}
                                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === i ? 'bg-slate-900 dark:bg-nordic-accent text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center space-y-8">
                    {mode === 0 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-white">
                                <span>{t('prosentCalc.mode0.label1')}</span>
                                <input
                                    type="number"
                                    value={valA}
                                    onChange={e => setValA(e.target.value)}
                                    className="w-24 p-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-center focus:border-blue-600 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="0"
                                    autoFocus
                                />
                                <span>%</span>
                            </div>
                            <div className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-white">
                                <span>{t('prosentCalc.mode0.label2')}</span>
                                <input
                                    type="number"
                                    value={valB}
                                    onChange={e => setValB(e.target.value)}
                                    className="flex-1 p-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-600 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="0"
                                />
                                <span>?</span>
                            </div>
                        </div>
                    )}

                    {mode === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-white">
                                <input
                                    type="number"
                                    value={valA}
                                    onChange={e => setValA(e.target.value)}
                                    className="w-32 p-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-center focus:border-blue-600 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="0"
                                    autoFocus
                                />
                                <span>{t('prosentCalc.mode1.label1')}</span>
                            </div>
                            <div className="flex items-center gap-4 text-2xl font-bold text-slate-800 dark:text-white">
                                <span>{t('prosentCalc.mode1.label2')}</span>
                                <input
                                    type="number"
                                    value={valB}
                                    onChange={e => setValB(e.target.value)}
                                    className="flex-1 p-3 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-600 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="0"
                                />
                                <span>?</span>
                            </div>
                        </div>
                    )}

                    {mode === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-2">
                                <label className="text-lg font-bold text-slate-500 dark:text-slate-400">{t('prosentCalc.mode2.label1')}</label>
                                <input
                                    type="number"
                                    value={valA}
                                    onChange={e => setValA(e.target.value)}
                                    className="w-full text-2xl font-bold p-4 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-600 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="0"
                                    autoFocus
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-lg font-bold text-slate-500 dark:text-slate-400">{t('prosentCalc.mode2.label2')}</label>
                                <input
                                    type="number"
                                    value={valB}
                                    onChange={e => setValB(e.target.value)}
                                    className="w-full text-2xl font-bold p-4 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-600 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    )}

                    {result !== null && !isNaN(result) && (
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 text-center animate-fade-in-up">
                            <span className="block text-xl font-medium text-slate-400 mb-2">{t('prosentCalc.result')}</span>
                            <span className="text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">
                                {result.toLocaleString('no-NO', { maximumFractionDigits: 2 })}
                                {mode !== 0 && '%'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Prosent;
