import { useState, useMemo, useEffect } from 'react';
import { Zap, RefreshCcw } from 'lucide-react';
import { fetchElectricityPrice } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 2 }).format(amount);
};

const Stromstotte = () => {
    const { t } = useLanguage();
    const [price, setPrice] = useState('');
    const [usage, setUsage] = useState('');
    const [loadingPrice, setLoadingPrice] = useState(false);
    const [autoFetched, setAutoFetched] = useState(false);

    // Fetch price on mount
    useEffect(() => {
        const getPrice = async () => {
            setLoadingPrice(true);
            const { price: fetchedPrice, source } = await fetchElectricityPrice();
            if (fetchedPrice !== null) {
                setPrice(fetchedPrice.toFixed(2));
                setAutoFetched(true);
            }
            setLoadingPrice(false);
        };
        getPrice();
    }, []);

    const calculations = useMemo(() => {
        const p = parseFloat(price) || 0; // øre/kWh without VAT
        const u = parseFloat(usage) || 0; // kWh

        // Threshold 77 øre/kWh (ex VAT) -> 0.77 NOK
        let supportPerKwh = 0;
        if (p > 77) {
            supportPerKwh = (p - 77) * 0.90;
        }

        const supportPerKwhIncMva = supportPerKwh * 1.25;
        const totalSupport = (supportPerKwhIncMva / 100) * u;

        return {
            supportPerKwh: supportPerKwhIncMva,
            totalSupport
        };
    }, [price, usage]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-nordic-card rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                <div className="bg-slate-900 dark:bg-slate-800 p-8 text-center text-white">
                    <div className="flex justify-center mb-4">
                        <div className="bg-yellow-400 p-4 rounded-full shadow-lg shadow-yellow-400/20">
                            <Zap size={32} className="text-slate-900" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{t('stromCalc.title')}</h1>
                    <p className="text-slate-300 dark:text-slate-400 text-lg">{t('stromCalc.subtitle')}</p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xl font-bold text-slate-900 dark:text-white flex justify-between items-end">
                                <span>{t('stromCalc.priceLabel')}</span>
                                {loadingPrice && <RefreshCcw size={16} className="animate-spin text-blue-600 mb-1" />}
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setAutoFetched(false);
                                    }}
                                    className={`w-full text-2xl font-bold p-6 pr-16 bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white ${autoFetched ? 'border-green-400 ring-2 ring-green-400/20' : 'border-slate-200 dark:border-slate-700'}`}
                                    placeholder="0"
                                />
                                <span className="absolute right-6 top-7 text-xl font-bold text-slate-400">øre</span>
                            </div>
                            {autoFetched && (
                                <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1 animate-fade-in-up">
                                    <Zap size={14} fill="currentColor" />
                                    {t('stromCalc.autoFetch')}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xl font-bold text-slate-900 dark:text-white">
                                {t('stromCalc.usageLabel')}
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={usage}
                                    onChange={(e) => setUsage(e.target.value)}
                                    className="w-full text-2xl font-bold p-6 pr-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                                    placeholder="0"
                                />
                                <span className="absolute right-6 top-7 text-xl font-bold text-slate-400">kWh</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-800/30 space-y-4 text-center">
                        <div className="space-y-1">
                            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">{t('stromCalc.supportPerKwh')}</p>
                            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">{calculations.supportPerKwh.toFixed(2)} øre</p>
                        </div>
                        <div className="w-full h-px bg-blue-200/50 dark:bg-blue-700/50"></div>
                        <div className="space-y-1">
                            <p className="text-xl font-bold text-slate-900 dark:text-white">{t('stromCalc.totalSupport')}</p>
                            <p className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">{formatCurrency(calculations.totalSupport)}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                        <strong className="block text-slate-900 dark:text-white mb-1">{t('stromCalc.explanationTitle')}</strong>
                        {t('stromCalc.explanationText')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stromstotte;
