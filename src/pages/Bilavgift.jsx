import { useState, useMemo } from 'react';
import { Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(amount);
};

const Bilavgift = () => {
    const { t } = useLanguage();
    const [age, setAge] = useState('new'); // new (2023+), mid (2015-2022), old (<=2014)
    const [weight, setWeight] = useState('low'); // low (<1200), high (>1200)

    const fee = useMemo(() => {
        if (age === 'old') return 1942;

        if (age === 'new') {
            return weight === 'high' ? 7505 : 4918;
        }

        if (age === 'mid') {
            return weight === 'high' ? 4532 : 3236;
        }

        return 0;
    }, [age, weight]);

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-nordic-card rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                <div className="bg-slate-900 dark:bg-slate-800 p-8 text-center text-white">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-900/40">
                            <Car size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{t('bilCalc.title')}</h1>
                    <p className="text-slate-300 dark:text-slate-400 text-lg">{t('bilCalc.subtitle')}</p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="space-y-2">
                        <label className="block text-xl font-bold text-slate-900 dark:text-white">{t('bilCalc.ageLabel')}</label>
                        <select
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full text-xl p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none cursor-pointer text-slate-900 dark:text-white font-medium appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                        >
                            <option value="new">{t('bilCalc.ages.new')}</option>
                            <option value="mid">{t('bilCalc.ages.mid')}</option>
                            <option value="old">{t('bilCalc.ages.old')}</option>
                        </select>
                    </div>

                    {(age !== 'old') && (
                        <div className="space-y-2 animate-fade-in">
                            <label className="block text-xl font-bold text-slate-900 dark:text-white">{t('bilCalc.weightLabel')}</label>
                            <select
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full text-xl p-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none cursor-pointer text-slate-900 dark:text-white font-medium appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                            >
                                <option value="low">{t('bilCalc.weights.low')}</option>
                                <option value="high">{t('bilCalc.weights.high')}</option>
                            </select>
                        </div>
                    )}
                    {(age === 'old') && (
                        <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl text-slate-600 dark:text-slate-300 text-lg">
                            {t('bilCalc.oldCarInfo')}
                        </div>
                    )}

                    <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 text-center text-white shadow-lg shadow-slate-900/20">
                        <p className="text-xl font-medium text-slate-300 mb-2">{t('bilCalc.payableLabel')}</p>
                        <p className="text-6xl font-extrabold tracking-tight text-white">{formatCurrency(fee)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bilavgift;
