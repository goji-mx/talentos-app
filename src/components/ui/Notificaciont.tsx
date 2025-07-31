import React, { useEffect, useState } from 'react';
import { X, CircleCheckBig, CircleAlert, CircleX, Info } from 'lucide-react';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

const typeConfig = {
    success: {
        icon: <CircleCheckBig size={20} />,
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        iconColor: 'text-emerald-600',
        textColor: 'text-emerald-800',
        accent: 'bg-emerald-500'
    },
    error: {
        icon: <CircleX size={20} />,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        textColor: 'text-red-800',
        accent: 'bg-red-500'
    },
    warning: {
        icon: <CircleAlert size={20} />,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        iconColor: 'text-amber-600',
        textColor: 'text-amber-800',
        accent: 'bg-amber-500'
    },
    info: {
        icon: <Info size={20} />,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        textColor: 'text-blue-800',
        accent: 'bg-blue-500'
    },
};

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
    const [closing, setClosing] = useState(false);
    const config = typeConfig[type];

    const handleClose = () => {
        setClosing(true);
    };

    useEffect(() => {
        if (closing) {
            const timer = setTimeout(() => {
                onClose();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [closing, onClose]);

    // Auto-dismiss after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`
                relative flex items-start gap-3 p-4 rounded-xl shadow-lg border
                ${config.bgColor} ${config.borderColor}
                w-full max-w-md backdrop-blur-sm
                transform transition-all duration-300 ease-out
                ${closing 
                    ? 'translate-x-full opacity-0 scale-95' 
                    : 'translate-x-0 opacity-100 scale-100 animate-pulse-subtle'
                }
                hover:shadow-xl hover:scale-[1.02]
            `}
        >
            {/* Accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${config.accent}`} />
            
            {/* Icon */}
            <div className={`shrink-0 mt-0.5 ${config.iconColor}`}>
                {config.icon}
            </div>
            
            {/* Message */}
            <div className={`flex-1  mt-1 text-sm font-medium leading-relaxed ${config.textColor}`}>
                {message}
            </div>
            
            {/* Close button */}
            <button 
                onClick={handleClose}
                className={`
                    shrink-0 p-1 rounded-full transition-all duration-200
                    ${config.iconColor} hover:bg-white hover:bg-opacity-50
                    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current
                    active:scale-95
                `}
                aria-label="Close notification"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Notification;