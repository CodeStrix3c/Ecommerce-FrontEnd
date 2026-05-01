const DEFAULT_API_BASE_URL = 'https://g17zvf8q-5055.inc1.devtunnels.ms';
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
export const HUB_URL = `${API_BASE_URL}/hubs/phone-sync`;
