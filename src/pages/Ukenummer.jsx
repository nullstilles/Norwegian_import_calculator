import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

const Ukenummer = () => {
    const { t } = useLanguage();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [week, setWeek] = useState(0);

    useEffect(() => {
        if (date) {
            setWeek(getWeekNumber(new Date(date)));
        }
    }, [date]);

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <SEO title={t('ukeCalc.title')} description={t('ukeCalc.subtitle')} path="/uke" />
            <div className="bg-white dark:bg-nordic-card rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden text-center">
                <div className="bg-slate-900 dark:bg-slate-800 p-8">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl text-white mb-4">
                        <CalendarDays size={24} className="mr-2" />
                        <span className="font-bold">{t('ukeCalc.title')}</span>
                    </div>
                    <h1 className="text-xl text-slate-300 dark:text-slate-400 font-medium">{t('ukeCalc.subtitle')}</h1>
                    <div className="py-8">
                        <span className="text-9xl font-black text-white tracking-tighter leading-none block">{week}</span>
                    </div>
                </div>

                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700">
                    <label className="block text-lg font-bold text-slate-900 dark:text-white mb-3">{t('ukeCalc.dateLabel')}</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full text-xl p-4 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-slate-900 dark:focus:border-slate-400 focus:ring-0 outline-none text-slate-900 dark:text-white font-medium shadow-sm transition-colors"
                    />
                </div>
            </div>
        </div>
    );
};

export default Ukenummer;
