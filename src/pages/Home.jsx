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

const ToolCard = ({ title, description, icon, to, color }) => (
    <Link
        to={to}
        className="group relative bg-nordic-card border border-slate-700/50 rounded-2xl p-6 hover:border-nordic-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10 flex flex-col h-full"
    >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-nordic-accent transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

        <div className="flex items-center text-nordic-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
            Gå til verktøy <ArrowRight size={16} className="ml-1" />
        </div>
    </Link>
);

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                    Nyttige verktøy for <span className="text-nordic-accent">hverdagen</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    En samling av smarte kalkulatorer og verktøy. Enkelt, raskt og gratis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <ToolCard
                    title="Toll Kalulator"
                    description="Sjekk toll og moms på import."
                    icon={<Calculator size={28} />}
                    to="/toll"
                    color="from-red-600 to-red-800"
                />
                <ToolCard
                    title="Strømstøtte"
                    description="Hvor mye får du i strømstøtte?"
                    icon={<Zap size={28} />}
                    to="/strom"
                    color="from-yellow-400 to-yellow-600"
                />
                <ToolCard
                    title="Bilavgift"
                    description="Beregn omregistreringsavgift."
                    icon={<Car size={28} />}
                    to="/bilavgift"
                    color="from-blue-600 to-blue-800"
                />
                <ToolCard
                    title="Valuta"
                    description="Live valutakurser (NOK, USD, EUR)."
                    icon={<Banknote size={28} />}
                    to="/valuta"
                    color="from-emerald-500 to-emerald-700"
                />
                <ToolCard
                    title="Prosent Hjelper"
                    description="Enkel utregning av prosent."
                    icon={<Percent size={28} />}
                    to="/prosent"
                    color="from-pink-500 to-pink-700"
                />
                <ToolCard
                    title="Ukenummer"
                    description="Hvilken uke er det? Sjekk datoer."
                    icon={<CalendarDays size={28} />}
                    to="/uke"
                    color="from-orange-500 to-orange-700"
                />

                {/* Dev Tools */}
                <ToolCard
                    title="JSON <-> CSV"
                    description="Konverter dataformater for utviklere."
                    icon={<FileJson size={28} />}
                    to="/json-csv"
                    color="from-indigo-600 to-indigo-800"
                />
                <ToolCard
                    title="Excel AI"
                    description="Lag Excel-formler med kunstig intelligens."
                    icon={<Table2 size={28} />}
                    to="/excel-ai"
                    color="from-cyan-600 to-cyan-800"
                />
                <ToolCard
                    title="Kommer snart..."
                    description="Vi jobber med flere verktøy."
                    icon={<Wrench size={28} />}
                    to="/"
                    color="from-slate-600 to-slate-800"
                />
            </div>
        </div>
    );
};

export default Home;
