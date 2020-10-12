export const __PROD__ = process.env.NODE_ENV === 'production';
export const __DEV__ = process.env.NODE_ENV === 'development';
export const __TEST__ = process.env.NODE_ENV === 'test';

export const baseURL = process.env.REACT_APP_REQUEST_BASE_URL || '';
