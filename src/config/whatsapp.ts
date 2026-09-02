export interface WhatsAppContact {
  phone: string;
  formattedNumber: string;
  name: string;
  role: string;
  isPrimary: boolean;
}

export const WHATSAPP_CONTACTS: WhatsAppContact[] = [
  {
    phone: '9038332076',
    formattedNumber: '+91 9038332076',
    name: 'Prasenjit Dey',
    role: 'Senior Insurance Advisor & Officer',
    isPrimary: true,
  },
  {
    phone: '8620935473',
    formattedNumber: '+91 8620935473',
    name: 'PLI Support Desk',
    role: 'Policy Quotation & Claims Helpline',
    isPrimary: false,
  },
];

export function getWhatsAppLink(phone: string, message: string = ''): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const targetNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const encodedText = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${targetNumber}${encodedText}`;
}
