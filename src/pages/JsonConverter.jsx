import { useState } from 'react';
import { FileJson, FileType, ArrowRightLeft, Upload, Trash2, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import SEO from '../components/SEO';

const JsonConverter = () => {
    const { t } = useLanguage();
    const { addToast } = useToast();
    const [jsonInput, setJsonInput] = useState('');
    const [csvOutput, setCsvOutput] = useState('');
    const [error, setError] = useState('');

    const handleJsonChange = (e) => {
        setJsonInput(e.target.value);
        setError('');
    };

    const prettify = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed, null, 2));
            setError('');
        } catch (e) {
            setError(t('jsonCalc.errorJson') + e.message);
        }
    };

    const minify = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed));
            setError('');
        } catch (e) {
            setError(t('jsonCalc.errorJson') + e.message);
        }
    };

    const convertToCSV = () => {
        try {
            if (!jsonInput.trim()) return;

            const jsonData = JSON.parse(jsonInput);
            const array = Array.isArray(jsonData) ? jsonData : [jsonData];

            if (array.length === 0) {
                setCsvOutput('');
                return;
            }

            const headers = Object.keys(array[0]);
            const csvRows = [
                headers.join(','),
                ...array.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
            ];

            setCsvOutput(csvRows.join('\r\n'));
            setError('');
        } catch (e) {
            setError(t('jsonCalc.errorJson') + e.message);
        }
    };

    const replacer = (key, value) => {
        return value === null ? '' : value;
    };

    const convertToJson = () => {
        // Basic CSV to JSON Implementation
        try {
            if (!csvOutput.trim()) return;

            const lines = csvOutput.split('\n');
            const headers = lines[0].split(',');

            const result = lines.slice(1).map(line => {
                const obj = {};
                const currentline = line.split(',');

                headers.forEach((header, i) => {
                    obj[header && header.trim()] = currentline[i] && currentline[i].trim();
                });
                return obj;
            }).filter(obj => Object.keys(obj).length > 0 && Object.values(obj).some(val => val));

            setJsonInput(JSON.stringify(result, null, 2));
            setError('');
        } catch (e) {
            setError(t('jsonCalc.errorCsv'));
        }
    }

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        addToast(t('jsonCalc.copy') + '!', 'success');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-8rem)] flex flex-col">
            <SEO title={t('jsonCalc.title')} path="/json-csv" />
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FileJson className="text-nordic-accent" /> {t('jsonCalc.title')}
                </h1>
                {error && <div className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg text-sm border border-red-500/20">{error}</div>}
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* JSON Input */}
                <div className="flex flex-col h-full bg-nordic-card dark:bg-slate-800 rounded-xl border border-slate-700/50 overflow-hidden">
                    <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700/50 flex justify-between items-center">
                        <span className="font-mono text-sm text-nordic-accent font-bold">{t('jsonCalc.inputLabel')}</span>
                        <div className="flex gap-2">
                            <button onClick={prettify} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1.5 rounded transition">{t('jsonCalc.prettify')}</button>
                            <button onClick={minify} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1.5 rounded transition">{t('jsonCalc.minify')}</button>
                            <button onClick={() => setJsonInput('')} className="text-slate-400 hover:text-red-400 transition"><Trash2 size={16} /></button>
                        </div>
                    </div>
                    <textarea
                        className="flex-1 w-full bg-white dark:bg-transparent p-4 font-mono text-sm text-slate-900 dark:text-slate-300 resize-none outline-none focus:bg-slate-50 dark:focus:bg-slate-800/30 transition-colors"
                        placeholder={t('jsonCalc.placeholders.json')}
                        value={jsonInput}
                        onChange={handleJsonChange}
                    />
                </div>

                {/* Controls (Mobile only, desktop center absolute) */}
                <div className="md:hidden flex justify-center gap-4 py-2">
                    <button onClick={convertToCSV} className="bg-nordic-accent p-2 rounded-full text-white shadow"><ArrowRightLeft size={20} className="rotate-90" /></button>
                </div>

                {/* CSV Output */}
                <div className="flex flex-col h-full bg-nordic-card dark:bg-slate-800 rounded-xl border border-slate-700/50 overflow-hidden relative group">
                    {/* Desktop Convert Button Overlay */}
                    <div className="absolute top-1/2 -left-6 z-10 hidden md:flex flex-col gap-2">
                        <button
                            onClick={convertToCSV}
                            className="bg-nordic-accent hover:bg-nordic-accentHover text-white p-3 rounded-full shadow-xl shadow-blue-900/20 transform hover:scale-110 transition-all"
                            title={t('jsonCalc.jsonToCsv')}
                        >
                            <ArrowRightLeft size={20} />
                        </button>
                    </div>

                    <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700/50 flex justify-between items-center">
                        <span className="font-mono text-sm text-green-400 font-bold">{t('jsonCalc.outputLabel')}</span>
                        <div className="flex gap-2">
                            <button onClick={convertToJson} className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1.5 rounded transition">{t('jsonCalc.csvToJson')}</button>
                            <button onClick={() => copyToClipboard(csvOutput)} className="text-slate-400 hover:text-green-400 transition" title={t('jsonCalc.copy')}><Copy size={16} /></button>
                        </div>
                    </div>
                    <textarea
                        className="flex-1 w-full bg-white dark:bg-transparent p-4 font-mono text-sm text-slate-900 dark:text-slate-300 resize-none outline-none focus:bg-slate-50 dark:focus:bg-slate-800/30 transition-colors"
                        placeholder={t('jsonCalc.placeholders.csv')}
                        value={csvOutput}
                        onChange={(e) => setCsvOutput(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default JsonConverter;
