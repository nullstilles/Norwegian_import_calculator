import { useState, useMemo } from 'react'

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(amount)
}

const TollCalculator = () => {
    const [price, setPrice] = useState('')
    const [shipping, setShipping] = useState('')
    const [category, setCategory] = useState('electronics')
    const [voec, setVoec] = useState(false)

    const calculations = useMemo(() => {
        const p = parseFloat(price) || 0
        const s = parseFloat(shipping) || 0
        const baseValue = p + s

        let tollRate = 0
        if (category === 'clothing') tollRate = 0.107

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

        return { baseValue, toll, mva, fee, total }
    }, [price, shipping, category, voec])

    const copyResult = () => {
        const text = `Item + Shipping: ${formatCurrency(calculations.baseValue)}\nVAT & Customs: ${formatCurrency(calculations.mva + calculations.toll)}\nPosten Fee: ${formatCurrency(calculations.fee)}\nTotal: ${formatCurrency(calculations.total)}`
        navigator.clipboard.writeText(text)
        alert('Result copied to clipboard!')
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="bg-nordic-card rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-norwegian-blue to-blue-900 p-8 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-norwegian-red via-white to-norwegian-blue"></div>
                    <h1 className="text-3xl font-bold text-white tracking-wide mb-2">Import Kalkulator</h1>
                    <p className="text-blue-200 text-sm font-medium">Calculate Toll, MVA & Fees for Norway</p>
                </div>

                <div className="p-8 space-y-6">
                    {/* Inputs */}
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-bold mb-2 text-slate-300 group-focus-within:text-nordic-accent transition-colors">Item Price (NOK)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full px-4 py-3 pl-4 pr-12 rounded-xl border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-nordic-accent focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3.5 text-slate-500 font-medium">kr</span>
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold mb-2 text-slate-300 group-focus-within:text-nordic-accent transition-colors">Shipping Cost (NOK)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={shipping}
                                    onChange={(e) => setShipping(e.target.value)}
                                    className="w-full px-4 py-3 pl-4 pr-12 rounded-xl border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-nordic-accent focus:border-transparent outline-none transition-all placeholder-slate-500"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-3.5 text-slate-500 font-medium">kr</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-slate-300">Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-nordic-accent focus:border-transparent outline-none appearance-none transition-all cursor-pointer hover:border-slate-600"
                                >
                                    <option value="electronics">Electronics (0% Toll)</option>
                                    <option value="clothing">Clothing/Textiles (10.7% Toll)</option>
                                    <option value="other">Other (0% Toll)</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-200">VOEC Registered Store?</span>
                                <span className="text-xs text-slate-400 font-medium mt-0.5">e.g. Zalando, eBay, Amazon</span>
                            </div>
                            <button
                                onClick={() => setVoec(!voec)}
                                className={`w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer shadow-inner ${voec ? 'bg-green-600' : 'bg-slate-600'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${voec ? 'translate-x-6' : 'translate-x-0'}`}>
                                    {voec && <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                </div>
                            </button>
                        </div>

                        {category === 'clothing' && (
                            <div className="flex gap-3 p-4 bg-blue-900/20 text-blue-200 text-sm rounded-xl border border-blue-800/50 shadow-sm animate-fade-in">
                                <span className="text-xl">👕</span>
                                <p className="font-medium">Clothing includes a <span className="font-bold">10.7% customs duty</span> on the item price.</p>
                            </div>
                        )}
                        {!voec && (
                            <div className="flex gap-3 p-4 bg-red-900/20 text-red-200 text-sm rounded-xl border border-red-800/50 shadow-sm animate-fade-in">
                                <span className="text-xl">📦</span>
                                <p className="font-medium">Non-VOEC stores incur a carrier fee of <span className="font-bold">{calculations.baseValue < 3000 ? '149' : '299'} NOK</span>.</p>
                            </div>
                        )}
                    </div>

                    <hr className="border-slate-700 my-2" />

                    {/* Results */}
                    <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                        <div className="flex justify-between text-sm text-slate-400 items-center">
                            <span className="font-medium">Item + Shipping</span>
                            <span className="font-bold text-white font-mono tracking-tight">{formatCurrency(calculations.baseValue)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-400 items-center">
                            <span className="font-medium">VAT (25%) + Customs</span>
                            <span className="font-bold text-white font-mono tracking-tight">{formatCurrency(calculations.mva + calculations.toll)}</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                            <span className={`font-medium ${!voec ? "text-red-400" : "text-slate-400"}`}>Posten Fee</span>
                            <span className={`font-bold font-mono tracking-tight ${!voec ? "text-red-400" : "text-white"}`}>{formatCurrency(calculations.fee)}</span>
                        </div>

                        <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-700">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Real Cost</span>
                                <span className="text-3xl font-extrabold text-white tracking-tight leading-none">{formatCurrency(calculations.total)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={copyResult}
                        className="w-full bg-nordic-accent hover:bg-nordic-accentHover text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span className="group-hover:scale-110 transition-transform">📋</span>
                        <span>Copy Breakdown</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TollCalculator
