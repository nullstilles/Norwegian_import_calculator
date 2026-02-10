import { useState, useEffect } from 'react';
import { ArrowDown, Banknote, WifiOff } from 'lucide-react';
import { fetchRates } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const Valuta = () => {
    const { t } = useLanguage();
    const [amount, setAmount] = useState('1');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('NOK');
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState('api'); // api, cache, fallback

    useEffect(() => {
        const loadRates = async () => {
            setLoading(true);
            const { rates: newRates, source: newSource } = await fetchRates(from);
            setRates(newRates);
            setSource(newSource);
            setLoading(false);
        };
        loadRates();
    }, [from]); // Reload when 'from' currency changes

    const result = amount && rates[to] ? (parseFloat(amount) * rates[to]).toFixed(2) : '...';

    const currencies = ["NOK", "USD", "EUR", "GBP", "SEK", "DKK"];

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-nordic-card rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                <div className="bg-slate-900 dark:bg-slate-800 p-8 text-center text-white relative">
                    <div className="flex justify-center mb-4">
                        <div className="bg-emerald-500 p-3 rounded-full">
                            <Banknote size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">{t('valutaCalc.title')}</h1>

                    {source === 'fallback' && (
                        <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 rounded-full px-3 py-1 flex items-center gap-1 text-xs font-bold text-red-200">
                            <WifiOff size={12} /> {t('valutaCalc.offline')}
                        </div>
                    )}
                </div>

                <div className="p-8 space-y-4">
                    {/* From Section */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 focus-within:border-emerald-500 transition-colors">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('valutaCalc.amountLabel')}</label>
                            <select
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                                className="bg-transparent font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
                            >
                                {currencies.map(c => <option key={c} value={c} className="text-slate-900">{c}</option>)}
                            </select>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-full text-4xl font-black bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600"
                            placeholder="0"
                        />
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-6 z-10 relative">
                        <button
                            onClick={swap}
                            disabled={loading}
                            className="bg-slate-900 dark:bg-slate-700 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                        >
                            <ArrowDown size={24} />
                        </button>
                    </div>

                    {/* To Section */}
                    <div className="bg-white dark:bg-nordic-card p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 pt-8">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">{t('valutaCalc.convertedLabel')}</label>
                            <select
                                value={to}
                                onChange={e => setTo(e.target.value)}
                                className="bg-transparent font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
                            >
                                {currencies.map(c => <option key={c} value={c} className="text-slate-900">{c}</option>)}
                            </select>
                        </div>
                        <div className="w-full text-4xl font-black text-emerald-600 dark:text-emerald-400 truncate">
                            {loading ? <span className="text-slate-300 dark:text-slate-600 animate-pulse text-2xl">{t('valutaCalc.loading')}</span> : result}
                        </div>
                    </div>

                    {!loading && rates[to] && (
                        <p className="text-center text-sm text-slate-400 font-medium pt-4">
                            {t('valutaCalc.rateInfo', [from, rates[to], to])}
                            {source === 'fallback' && <span className="block text-red-400 text-xs mt-1">{t('valutaCalc.offlineInfo')}</span>}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Valuta;
