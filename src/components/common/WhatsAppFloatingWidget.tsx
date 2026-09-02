'use client';

import { useState } from 'react';
import { getWhatsAppLink, WHATSAPP_CONTACTS } from '@/config/whatsapp';

export default function WhatsAppFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(
    'Hello! I would like to enquire about Postal Life Insurance (PLI / RPLI) policies. Please guide me.'
  );

  const quickStarters = [
    'Hello, I want to calculate an official PLI policy quote.',
    'Hello, I need guidance regarding RPLI Gram Suraksha/Santosh.',
    'Hello, I have a query regarding PLI declared bonus rates & returns.',
    'Hello, I need help regarding policy claim settlement / loan.',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-90 font-sans">
      {/* Expanded WhatsApp Modal Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn transition-all">
          {/* Header */}
          <div className="bg-[#075E54] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-md">
                  <i className="ri-whatsapp-fill"></i>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075E54]"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  PLI Official WhatsApp Desk
                </h3>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Advisors Online • Instant Reply
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp card"
              className="text-white/80 hover:text-white text-lg p-1 cursor-pointer">
              <i className="ri-close-line"></i>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#ECE5DD]/40 space-y-4 text-xs">
            {/* Greeting speech bubble */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs border border-slate-200 text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900 mb-1">
                Namaste! 🙏 Welcome to Postal Life Insurance Support.
              </p>
              <p className="text-[11px] text-slate-600">
                Choose an authorized advisor below to start direct WhatsApp chat:
              </p>
            </div>

            {/* Quick message selector */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Quick Topics
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickStarters.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    className={`text-[11px] text-left px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      selectedMessage === msg
                        ? 'bg-[#25D366]/20 border-[#25D366] text-[#075E54] font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}>
                    {idx === 0
                      ? '📊 Policy Quote'
                      : idx === 1
                      ? '🌾 Rural RPLI'
                      : idx === 2
                      ? '💰 Bonus Rates'
                      : '📝 Claim / Loan'}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Advisor Buttons */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Select WhatsApp Number
              </span>

              {WHATSAPP_CONTACTS.map((contact) => (
                <a
                  key={contact.phone}
                  href={getWhatsAppLink(contact.phone, selectedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white hover:bg-emerald-50/80 rounded-2xl border border-slate-200 hover:border-[#25D366] flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center text-xl group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                      <i className="ri-whatsapp-line"></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">
                          {contact.formattedNumber}
                        </span>
                        {contact.isPrimary && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-extrabold uppercase">
                            Primary
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {contact.role}
                      </span>
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line text-slate-400 group-hover:text-[#25D366] text-lg transition-colors"></i>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Notice */}
          <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-center gap-1.5 text-center">
            <i className="ri-shield-check-fill text-emerald-600"></i>
            <span>Verified Official India Post Insurance Channel</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp support chat"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group">
        <i className={isOpen ? 'ri-close-line text-2xl' : 'ri-whatsapp-fill'}></i>
        {!isOpen && (
          <>
            {/* Pulsing ring */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>
            {/* Tooltip on hover */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Chat on WhatsApp (9038332076 / 8620935473)
            </span>
          </>
        )}
      </button>
    </div>
  );
}
