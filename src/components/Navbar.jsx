import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Calculator, FileJson, Table2, Menu, X, Zap, Car, Percent, CalendarDays, Banknote } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path ? 'text-nordic-accent bg-blue-500/10' : 'text-slate-400 hover:text-nordic-text hover:bg-slate-800';
    };

    const navItems = [
        { name: 'Hjem', path: '/', icon: <LayoutGrid size={18} /> },
        { name: 'Toll', path: '/toll', icon: <Calculator size={18} /> },
        { name: 'Strøm', path: '/strom', icon: <Zap size={18} /> },
        { name: 'Bil', path: '/bilavgift', icon: <Car size={18} /> },
        { name: 'Valuta', path: '/valuta', icon: <Banknote size={18} /> },
        { name: 'Uke', path: '/uke', icon: <CalendarDays size={18} /> },
        { name: 'Prosent', path: '/prosent', icon: <Percent size={18} /> },
    ];

    return (
        <nav className="border-b border-slate-800 bg-nordic-dark/95 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nordic-accent to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/25 transition-all">
                            N
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Nor<span className="text-nordic-accent">Tools</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive(item.path)}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 grid grid-cols-2 gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-800 ${location.pathname === item.path ? 'bg-slate-800 text-nordic-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <div className="mb-2">{item.icon}</div>
                                <span className="text-sm font-bold">{item.name}</span>
                            </Link>
                        ))}
                        <Link
                            to="/excel-ai"
                            onClick={() => setIsOpen(false)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-800 ${location.pathname === '/excel-ai' ? 'bg-slate-800 text-nordic-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <div className="mb-2"><Table2 size={18} /></div>
                            <span className="text-sm font-bold">Excel AI</span>
                        </Link>
                        <Link
                            to="/json-csv"
                            onClick={() => setIsOpen(false)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-800 ${location.pathname === '/json-csv' ? 'bg-slate-800 text-nordic-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <div className="mb-2"><FileJson size={18} /></div>
                            <span className="text-sm font-bold">JSON Dev</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
