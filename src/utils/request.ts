import { baseURL } from 'env';

export default function request(path: string, init?: RequestInit) {
  return globalThis.fetch(`${baseURL}${path}`, init).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  });
}
