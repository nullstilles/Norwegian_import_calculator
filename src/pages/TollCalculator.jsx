import { useState, useMemo, useEffect } from 'react'
import { fetchRates } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import useLocalStorage from '../hooks/useLocalStorage';
import SEO from '../components/SEO';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(amount)
}

const TollCalculator = () => {
    const { t } = useLanguage();
    const { addToast } = useToast();
    const [price, setPrice] = useLocalStorage('toll_price', '')
    const [currency, setCurrency] = useLocalStorage('toll_currency', 'NOK') // NOK, USD, EUR, GBP
    const [rates, setRates] = useState(null)

    const [shipping, setShipping] = useLocalStorage('toll_shipping', '')
    const [category, setCategory] = useLocalStorage('toll_category', 'electronics')
    const [voec, setVoec] = useLocalStorage('toll_voec', false)

    // Fetch rates on mount
    useEffect(() => {
        const loadRates = async () => {
            const { rates: fetchedRates } = await fetchRates('NOK');
            setRates(fetchedRates);
        }
        loadRates();
    }, []);

    const calculations = useMemo(() => {
        let p = parseFloat(price) || 0
        let s = parseFloat(shipping) || 0

        // Convert to NOK if needed
        let exchangeRate = 1;
        if (currency !== 'NOK' && rates) {
            const rate = rates[currency];
            if (rate) {
                exchangeRate = rate;
                p = p / rate;
                s = s / rate; // Assuming shipping is in same currency
            }
        }

        const baseValue = p + s

        let tollRate = 0
        if (category === 'clothing') tollRate = 0.107

        // Toll applies to Price only for clothing
        const toll = category === 'clothing' ? p * tollRate : 0

        let fee = 0
        if (voec) {
            fee = 0
        } else {
            if (baseValue < 3000) fee = 149
            else fee = 299
        }

        const mva = 0.25 * (baseValue + toll)
        const total = baseValue + toll + mva + fee

        return { baseValue, toll, mva, fee, total, exchangeRate, convertedPrice: p }
    }, [price, shipping, category, voec, currency, rates])

    const copyResult = () => {
        const text = `${t('tollCalc.results.itemShipping')}: ${formatCurrency(calculations.baseValue)}\n${t('tollCalc.results.vatCustoms')}: ${formatCurrency(calculations.mva + calculations.toll)}\n${t('tollCalc.results.fee')}: ${formatCurrency(calculations.fee)}\n${t('tollCalc.results.total')}: ${formatCurrency(calculations.total)}`
        navigator.clipboard.writeText(text)
        addToast(t('tollCalc.copyAlert'), 'success');
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <SEO title={t('tollCalc.title')} description={t('tollCalc.subtitle')} path="/toll" />
            <div className="bg-white dark:bg-nordic-card rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-norwegian-blue to-blue-900 p-8 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-norwegian-red via-white to-norwegian-blue"></div>
                    <h1 className="text-3xl font-bold text-white tracking-wide mb-2">{t('tollCalc.title')}</h1>
                    <p className="text-blue-200 text-sm font-medium">{t('tollCalc.subtitle')}</p>
                </div>

                <div className="p-8 space-y-6">
                    {/* Inputs */}
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-bold mb-2 text-slate-600 dark:text-slate-300 group-focus-within:text-nordic-accent transition-colors">{t('tollCalc.priceLabel')}</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full px-4 py-3 pl-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-nordic-accent focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="w-24">
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full h-full px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-nordic-accent outline-none cursor-pointer"
                                    >
                                        <option value="NOK">NOK</option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                </div>
                            </div>
                            {currency !== 'NOK' && calculations.exchangeRate !== 1 && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-1">
                                    {t('tollCalc.approx', [formatCurrency(calculations.convertedPrice), (1 / calculations.exchangeRate).toFixed(2)])}
                                </p>
                            )}
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold mb-2 text-slate-600 dark:text-slate-300 group-focus-within:text-nordic-accent transition-colors">{t('tollCalc.shippingLabel')}</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={shipping}
                                    onChange={(e) => setShipping(e.target.value)}
                                    className="w-full px-4 py-3 pl-4 pr-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-nordic-accent focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3.5 text-slate-500 font-medium">{currency}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-slate-600 dark:text-slate-300">{t('tollCalc.categoryLabel')}</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-nordic-accent focus:border-transparent outline-none appearance-none transition-all cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                                >
                                    <option value="electronics">{t('tollCalc.categories.electronics')}</option>
                                    <option value="clothing">{t('tollCalc.categories.clothing')}</option>
                                    <option value="other">{t('tollCalc.categories.other')}</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('tollCalc.voecLabel')}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{t('tollCalc.voecSublabel')}</span>
                            </div>
                            <button
                                onClick={() => setVoec(!voec)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer shadow-inner ${voec ? 'bg-green-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${voec ? 'translate-x-6' : 'translate-x-0'}`}>
                                    {voec && <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                            </button>
                        </div>

                        {category === 'clothing' && (
                            <div className="flex gap-3 p-4 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm animate-fade-in">
                                <span className="text-xl">👕</span>
                                <p className="font-medium" dangerouslySetInnerHTML={{ __html: t('tollCalc.clothingInfo').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                            </div>
                        )}
                        {!voec && (
                            <div className="flex gap-3 p-4 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 text-sm rounded-xl border border-red-200 dark:border-red-800/50 shadow-sm animate-fade-in">
                                <span className="text-xl">📦</span>
                                <p className="font-medium" dangerouslySetInnerHTML={{ __html: t('tollCalc.postenInfo', [calculations.baseValue < 3000 ? '149' : '299']).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                            </div>
                        )}
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700 my-2" />

                    {/* Results */}
                    <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700/50">
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 items-center">
                            <span className="font-medium">{t('tollCalc.results.itemShipping')}</span>
                            <span className="font-bold text-slate-800 dark:text-white font-mono tracking-tight">{formatCurrency(calculations.baseValue)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 items-center">
                            <span className="font-medium">{t('tollCalc.results.vatCustoms')}</span>
                            <span className="font-bold text-slate-800 dark:text-white font-mono tracking-tight">{formatCurrency(calculations.mva + calculations.toll)}</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                            <span className={`font-medium ${!voec ? "text-red-500 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}>{t('tollCalc.results.fee')}</span>
                            <span className={`font-bold font-mono tracking-tight ${!voec ? "text-red-500 dark:text-red-400" : "text-slate-800 dark:text-white"}`}>{formatCurrency(calculations.fee)}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-300 dark:border-slate-700">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{t('tollCalc.results.total')}</span>
                                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">{formatCurrency(calculations.total)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={copyResult}
                        className="w-full bg-nordic-accent hover:bg-nordic-accentHover text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span className="group-hover:scale-110 transition-transform">📋</span>
                        <span>{t('tollCalc.copyButton')}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TollCalculator
