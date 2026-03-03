const fallbackApiUrl = 'http://localhost:3000';

export const appEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? fallbackApiUrl
};
