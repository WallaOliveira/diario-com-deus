'use client';

import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle size={20} />,
    error: <FiXCircle size={20} />,
    info: <FiInfo size={20} />,
    warning: <FiAlertCircle size={20} />,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slideUp max-w-md`}
    >
      {icons[type]}
      <p className="flex-1 font-medium">{message}</p>
      <button 
        onClick={onClose} 
        className="hover:bg-white/20 p-1 rounded transition-colors"
        aria-label="Fechar notificação"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}

