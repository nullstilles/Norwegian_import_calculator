import { useState, useMemo } from 'react';
import { Car } from 'lucide-react';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(amount);
};

const Bilavgift = () => {
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
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-900/40">
                            <Car size={32} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Omregistreringsavgift</h1>
                    <p className="text-slate-300 text-lg">Sjekk hva det koster å omregistrere bilen</p>
                </div>

                <div className="p-8 space-y-8">
                    <div className="space-y-2">
                        <label className="block text-xl font-bold text-slate-900">Bilens Årsmodell</label>
                        <select
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full text-xl p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none cursor-pointer text-slate-900 font-medium appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                        >
                            <option value="new">2023 eller nyere</option>
                            <option value="mid">2015 til 2022</option>
                            <option value="old">2014 eller eldre</option>
                        </select>
                    </div>

                    {(age !== 'old') && (
                        <div className="space-y-2 animate-fade-in">
                            <label className="block text-xl font-bold text-slate-900">Bilens Egenvekt</label>
                            <select
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full text-xl p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none cursor-pointer text-slate-900 font-medium appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                            >
                                <option value="low">Under 1200 kg</option>
                                <option value="high">Over 1200 kg</option>
                            </select>
                        </div>
                    )}
                    {(age === 'old') && (
                        <div className="p-4 bg-slate-100 rounded-xl text-slate-600 text-lg">
                            For eldre biler (2014 og eldre) er avgiften fast uavhengig av vekt.
                        </div>
                    )}

                    <div className="bg-slate-900 rounded-2xl p-8 text-center text-white shadow-lg shadow-slate-900/20">
                        <p className="text-xl font-medium text-slate-300 mb-2">Du må betale</p>
                        <p className="text-6xl font-extrabold tracking-tight text-white">{formatCurrency(fee)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bilavgift;
