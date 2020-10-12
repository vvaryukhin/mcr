import { notify } from 'components/Notification';
import { history } from 'router';
import { error, request } from 'utils';

interface ILoginByPasswordOptions {
  phone: string;
  password: string;
}

export async function loginByPassword({ phone, password }: ILoginByPasswordOptions) {
  return request('/login/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, password }),
  })
    .then(token => {
      sessionStorage.setItem('token', token);
      history.push({ pathname: '/' });
    })
    .catch(err => {
      notify({
        title: 'Authorization error',
        message: 'Invalid credentials',
      });
      error(err);
    });
}

export async function loginBySMS(phone: string) {
  return request('/login/sms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone }),
  });
}

export async function verifySMSCode(code: string) {
  return request('/login/sms/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
}

const AuthService = {
  loginByPassword,
  loginBySMS,
  verifySMSCode,
};

export default AuthService;
