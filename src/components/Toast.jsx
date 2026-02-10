import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to finish
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle className="text-green-500" size={20} />,
        error: <AlertCircle className="text-red-500" size={20} />,
        info: <Info className="text-blue-500" size={20} />
    };

    const styles = {
        success: 'border-green-500/20 bg-green-50/90 dark:bg-green-900/20 text-green-900 dark:text-green-100',
        error: 'border-red-500/20 bg-red-50/90 dark:bg-red-900/20 text-red-900 dark:text-red-100',
        info: 'border-blue-500/20 bg-blue-50/90 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
    };

    return (
        <div
            className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                } ${styles[type]}`}
        >
            {icons[type]}
            <p className="font-medium text-sm">{message}</p>
            <button onClick={() => setIsVisible(false)} className="opacity-50 hover:opacity-100 transition-opacity">
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
