import { useState, useMemo, useEffect } from 'react';
import { Zap, RefreshCcw } from 'lucide-react';
import { fetchElectricityPrice } from '../utils/api';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 2 }).format(amount);
};

const Stromstotte = () => {
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

        // Add 25% MVA to the support (Government pays support including VAT?) 
        // Yes, Strømstøtte is deducted on invoice which includes VAT. 
        // Rule: 90% of price over 73 (now 77?) ex mva.
        // The deduction on invoice is calculating: (AvgPrice - Metric) * 0.9 * 1.25.

        const supportPerKwhIncMva = supportPerKwh * 1.25;
        const totalSupport = (supportPerKwhIncMva / 100) * u;

        return {
            supportPerKwh: supportPerKwhIncMva,
            totalSupport
        };
    }, [price, usage]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-yellow-400 p-4 rounded-full shadow-lg shadow-yellow-400/20">
                            <Zap size={32} className="text-slate-900" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Strømstøtte Kalkulator 2026</h1>
                    <p className="text-slate-300 text-lg">Regn ut hva du får tilbake på strømregningen</p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xl font-bold text-slate-900 flex justify-between items-end">
                                <span>Gjennomsnittspris (øre/kWh)</span>
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
                                    className={`w-full text-2xl font-bold p-6 pr-16 bg-slate-50 border-2 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all placeholder-slate-400 text-slate-900 ${autoFetched ? 'border-green-400 ring-2 ring-green-400/20' : 'border-slate-200'}`}
                                    placeholder="0"
                                />
                                <span className="absolute right-6 top-7 text-xl font-bold text-slate-400">øre</span>
                            </div>
                            {autoFetched && (
                                <p className="text-sm text-green-600 font-medium flex items-center gap-1 animate-fade-in-up">
                                    <Zap size={14} fill="currentColor" />
                                    Hentet automatisk for Oslo (NO1) akkurat nå.
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xl font-bold text-slate-900">
                                Månedsforbruk (kWh)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={usage}
                                    onChange={(e) => setUsage(e.target.value)}
                                    className="w-full text-2xl font-bold p-6 pr-16 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all placeholder-slate-400 text-slate-900"
                                    placeholder="0"
                                />
                                <span className="absolute right-6 top-7 text-xl font-bold text-slate-400">kWh</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 space-y-4 text-center">
                        <div className="space-y-1">
                            <p className="text-lg font-medium text-slate-600">Din støtte per kWh (inkl. mva)</p>
                            <p className="text-3xl font-bold text-blue-700">{calculations.supportPerKwh.toFixed(2)} øre</p>
                        </div>
                        <div className="w-full h-px bg-blue-200/50"></div>
                        <div className="space-y-1">
                            <p className="text-xl font-bold text-slate-900">Du får totalt i støtte</p>
                            <p className="text-5xl font-extrabold text-blue-700 tracking-tight">{formatCurrency(calculations.totalSupport)}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-600 text-base leading-relaxed">
                        <strong className="block text-slate-900 mb-1">Hvordan regnes det ut?</strong>
                        Staten dekker 90% av prisen over 77 øre (ekskl. mva). Beløpet utbetales på nettleiefakturaen din.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stromstotte;
