'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function subscribeOnlineStatus(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return typeof window !== 'undefined' ? !window.navigator.onLine : false;
}

function getServerSnapshot() {
  return false;
}

export function OfflineIndicator() {
  const isOffline = useSyncExternalStore(
    subscribeOnlineStatus,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    // Register Service Worker for offline field capability
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('PLI Offline Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('PLI Service Worker registration skipped:', err);
        });
    }
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-100 no-print">
          <div className="bg-slate-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/40 backdrop-blur-md flex items-center gap-2.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div className="flex flex-col">
              <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                <i className="ri-wifi-off-line"></i> Rural Offline Mode Active
              </span>
              <span className="text-[10px] text-slate-300">
                Actuarial calculation engine running 100% locally on your device.
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
