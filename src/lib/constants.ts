export const WHATSAPP_NUMBER = '916302408944';
export const WHATSAPP_DISPLAY = '6302408944';
export const INSTAGRAM_URL = 'https://www.instagram.com/80isto20';

export function whatsappLink(message?: string) {
  return message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}
