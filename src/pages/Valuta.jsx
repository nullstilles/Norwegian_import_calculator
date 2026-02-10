import { useState, useEffect } from 'react';
import { ArrowDown, Banknote, WifiOff } from 'lucide-react';
import { fetchRates } from '../utils/api';

const Valuta = () => {
    const [amount, setAmount] = useState('1');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('NOK');
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState('api'); // api, cache, fallback

    useEffect(() => {
        const loadRates = async () => {
            setLoading(true);
            const data = await fetchRates('NOK'); // Fetch all against NOK base for simplicity (Frankfurter free is Euro base usually but allows from)
            // Wait, Frankfurter free endpoint is ?from=X.
            // If we want to convert ANY to ANY using frankfurter without many requests:
            // Strategy: Fetch ?from=NOK once. Then we have NOK -> USD, NOK -> EUR etc.
            // To convert USD -> EUR: (NOK -> EUR) / (NOK -> USD) ? No, that's (1/EUR_in_NOK) * ... 
            // Better: Fetch rates based on "from" currency when it changes.

            // Let's stick to the implementation plan: "fetchRates(base)".
            // BUT, if we cache "rates_NOK", and user switches to "USD", we define a new cache key in fetching function logic.

            // Correct approach for this component:
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
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center text-white relative">
                    <div className="flex justify-center mb-4">
                        <div className="bg-emerald-500 p-3 rounded-full">
                            <Banknote size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">Valuta Kalkulator</h1>

                    {source === 'fallback' && (
                        <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 rounded-full px-3 py-1 flex items-center gap-1 text-xs font-bold text-red-200">
                            <WifiOff size={12} /> Offline
                        </div>
                    )}
                </div>

                <div className="p-8 space-y-4">
                    {/* From Section */}
                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 focus-within:border-emerald-500 transition-colors">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500">Beløp</label>
                            <select
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
                            >
                                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-full text-4xl font-black bg-transparent outline-none text-slate-900 placeholder-slate-300"
                            placeholder="0"
                        />
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-6 z-10 relative">
                        <button
                            onClick={swap}
                            disabled={loading}
                            className="bg-slate-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50"
                        >
                            <ArrowDown size={24} />
                        </button>
                    </div>

                    {/* To Section */}
                    <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 pt-8">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500">Konvertert til</label>
                            <select
                                value={to}
                                onChange={e => setTo(e.target.value)}
                                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
                            >
                                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="w-full text-4xl font-black text-emerald-600 truncate">
                            {loading ? <span className="text-slate-300 animate-pulse text-2xl">Laster kurser...</span> : result}
                        </div>
                    </div>

                    {!loading && rates[to] && (
                        <p className="text-center text-sm text-slate-400 font-medium pt-4">
                            1 {from} = {rates[to]} {to}
                            {source === 'fallback' && <span className="block text-red-400 text-xs mt-1">Estimert kurs (Ingen nettverk)</span>}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Valuta;
