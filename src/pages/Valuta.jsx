import { useState, useEffect } from 'react';
import { ArrowRightLeft, ArrowDown, Banknote } from 'lucide-react';

const Valuta = () => {
    const [amount, setAmount] = useState('1');
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('NOK');
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRate = async () => {
            if (from === to) {
                setRate(1);
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
                const data = await res.json();
                setRate(data.rates[to]);
            } catch (error) {
                console.error("Failed to fetch rates", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRate();
    }, [from, to]);

    const result = amount && rate ? (parseFloat(amount) * rate).toFixed(2) : '...';

    const currencies = ["NOK", "USD", "EUR", "GBP", "SEK", "DKK"];

    const swap = () => {
        setFrom(to);
        setTo(from);
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center text-white">
                    <div className="flex justify-center mb-4">
                        <div className="bg-emerald-500 p-3 rounded-full">
                            <Banknote size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold">Valuta Kalkulator</h1>
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
                            className="bg-slate-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
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
                            {loading ? <span className="text-slate-300 animate-pulse">...</span> : result}
                        </div>
                    </div>

                    {rate && (
                        <p className="text-center text-sm text-slate-400 font-medium pt-4">
                            1 {from} = {rate} {to}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Valuta;
