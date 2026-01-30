if (!import.meta.env.VITE_API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL environment variable is missing')
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL