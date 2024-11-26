'use client';
const SessionStorage = {
  setItem: (key: string, value: object): void => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  getItem: (key: string): object | null => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(key);
    }
  },
  clear: (): void => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  },
};

export default SessionStorage;