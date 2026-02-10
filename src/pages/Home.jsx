import { Link } from 'react-router-dom';
import {
    Calculator,
    FileJson,
    Table2,
    ArrowRight,
    Zap,
    Car,
    Percent,
    CalendarDays,
    Banknote,
    Wrench
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const ToolCard = ({ title, description, icon, to, color, goToText }) => (
    <Link
        to={to}
        className="group relative bg-white dark:bg-nordic-card border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:border-nordic-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 flex flex-col h-full"
    >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>

        <h3 className="text-xl font-bold text-nordic-lightText dark:text-white mb-2 group-hover:text-nordic-accent transition-colors">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

        <div className="flex items-center text-nordic-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
            {goToText} <ArrowRight size={16} className="ml-1" />
        </div>
    </Link>
);

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-nordic-lightText to-slate-400 dark:from-white dark:to-slate-400 tracking-tight transition-colors">
                    {t('home.title')}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
                    {t('home.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <ToolCard
                    title={t('home.features.toll.title')}
                    description={t('home.features.toll.desc')}
                    icon={<Calculator size={28} />}
                    to="/toll"
                    color="from-red-600 to-red-800"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.strom.title')}
                    description={t('home.features.strom.desc')}
                    icon={<Zap size={28} />}
                    to="/strom"
                    color="from-yellow-400 to-yellow-600"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.bil.title')}
                    description={t('home.features.bil.desc')}
                    icon={<Car size={28} />}
                    to="/bilavgift"
                    color="from-blue-600 to-blue-800"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.valuta.title')}
                    description={t('home.features.valuta.desc')}
                    icon={<Banknote size={28} />}
                    to="/valuta"
                    color="from-emerald-500 to-emerald-700"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.prosent.title')}
                    description={t('home.features.prosent.desc')}
                    icon={<Percent size={28} />}
                    to="/prosent"
                    color="from-pink-500 to-pink-700"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.uke.title')}
                    description={t('home.features.uke.desc')}
                    icon={<CalendarDays size={28} />}
                    to="/uke"
                    color="from-orange-500 to-orange-700"
                    goToText={t('home.common.goTo')}
                />

                {/* Dev Tools */}
                <ToolCard
                    title={t('home.features.json.title')}
                    description={t('home.features.json.desc')}
                    icon={<FileJson size={28} />}
                    to="/json-csv"
                    color="from-indigo-600 to-indigo-800"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.excel.title')}
                    description={t('home.features.excel.desc')}
                    icon={<Table2 size={28} />}
                    to="/excel-ai"
                    color="from-cyan-600 to-cyan-800"
                    goToText={t('home.common.goTo')}
                />
                <ToolCard
                    title={t('home.features.coming.title')}
                    description={t('home.features.coming.desc')}
                    icon={<Wrench size={28} />}
                    to="/"
                    color="from-slate-600 to-slate-800"
                    goToText={t('home.common.goTo')}
                />
            </div>
        </div>
    );
};

export default Home;
