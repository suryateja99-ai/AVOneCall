import React from 'react';
import { X, Bell, CheckCheck, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
  onSelectNotification
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-slate-900">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 max-h-80 overflow-y-auto space-y-2.5">
          {notifications.map((item) => {
            const isEmergency = item.type === 'emergency';
            return (
              <div
                key={item.id}
                onClick={() => onSelectNotification && onSelectNotification(item)}
                className={`p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                  item.unread
                    ? isEmergency
                      ? 'bg-red-50 border-red-200'
                      : 'bg-rose-50/60 border-rose-100'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isEmergency
                        ? 'bg-red-600 text-white'
                        : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    {isEmergency ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : item.type === 'business' ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : (
                      <Info className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 tabular-nums">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {notifications.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              No notifications at the moment.
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-3 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
