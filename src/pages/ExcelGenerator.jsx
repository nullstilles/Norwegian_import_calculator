import { useState } from 'react';
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ExcelGenerator = () => {
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateFormula = async () => {
        if (!prompt.trim()) return;

        setLoading(true);
        setResult('');

        // Mock API Delay
        setTimeout(() => {
            // Mock Response logic based on keywords
            let formula = '=SUM(A:A)'; // Default
            const p = prompt.toLowerCase();

            if (p.includes('average')) formula = '=AVERAGE(A:A)';
            if (p.includes('if')) formula = '=IF(A1>10, "Yes", "No")';
            if (p.includes('vlookup')) formula = '=VLOOKUP(A2, Sheet2!A:B, 2, FALSE)';
            if (p.includes('count')) formula = '=COUNTIF(range, criteria)';
            if (p.includes('date')) formula = '=TODAY()';

            setResult(formula);
            setLoading(false);
        }, 2000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-green-900/20 mb-4">
                    <Sparkles className="text-white w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{t('excelCalc.title')}</h1>
                <p className="text-slate-400">{t('excelCalc.subtitle')}</p>
            </div>

            <div className="bg-nordic-card dark:bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl space-y-6 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-slate-300 ml-1">{t('excelCalc.label')}</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-32 bg-slate-800/50 text-white rounded-xl border border-slate-700 p-4 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 outline-none transition-all resize-none placeholder-slate-500"
                        placeholder={t('excelCalc.placeholder')}
                    />
                </div>

                <button
                    onClick={generateFormula}
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-900/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            {t('excelCalc.loading')}
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            {t('excelCalc.button')}
                        </>
                    )}
                </button>

                {/* Result Area */}
                <div className={`transition-all duration-500 overflow-hidden ${result ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-slate-900/80 rounded-xl p-4 border border-green-500/30 flex items-center justify-between group relative">
                        <code className="text-green-400 font-mono text-lg font-medium">{result}</code>
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                        >
                            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                        </button>

                        {copied && <span className="absolute -top-8 right-2 text-xs bg-green-500 text-white px-2 py-1 rounded shadow-lg animate-fade-out-up">{t('excelCalc.copied')}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcelGenerator;
