import React, { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import AuthService from 'features/auth/services';
import { error } from 'utils';
import { useLazyEffect } from 'hooks';
import { history } from 'router';
import PhoneMask from 'components/PhoneMask';
import Variant from 'components/Variant';
import { notify } from 'components/Notification';
import FormField from 'components/FormField';

enum LoginTypes {
  PASSWORD = 'PASSWORD',
  SMS = 'SMS',
}

const AuthForm = () => {
  const [phone, setPhone] = useState('');
  const [loginType, setLoginType] = useState<LoginTypes>(LoginTypes.PASSWORD);

  const LoginComponent = loginType === LoginTypes.SMS ? SMSLogin : PasswordLogin;

  return (
    <>
      <h2 className="heading" style={{ textAlign: 'center', marginBottom: 20 }}>
        Login
      </h2>
      <Variant
        selectedValue={loginType}
        onChange={v => setLoginType(v as LoginTypes)}
        variants={[
          { title: 'password', value: LoginTypes.PASSWORD },
          { title: 'sms', value: LoginTypes.SMS },
        ]}
        name="login-type"
      />
      {<LoginComponent phone={phone} setPhone={setPhone} />}
    </>
  );
};

interface ILoginComponentProps {
  phone: string;
  setPhone: (val: string) => void;
}

const PasswordLogin = ({ phone, setPhone }: ILoginComponentProps) => {
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthService.loginByPassword({ phone, password });
  };

  return (
    <form style={{ textAlign: 'center', marginTop: '30px' }} onSubmit={onSubmit}>
      <PhoneMask
        value={phone}
        onChange={setPhone}
        placeholder="Phone"
        name="phone"
      />
      <FormField
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        name="password"
        type="password"
        validations={{ min: 6 }}
        errorMessage={'min: 6'}
      />
      <Button>Submit</Button>
    </form>
  );
};

enum SMSLoginSteps {
  ENTER_NUMBER,
  ENTER_SMS_CODE,
}

const SMSLogin = ({ phone, setPhone }: ILoginComponentProps) => {
  const [smsCode, setSMSCode] = useState('');
  const [step, setStep] = useState<SMSLoginSteps>(SMSLoginSteps.ENTER_NUMBER);

  useLazyEffect(() => {
    if (smsCode.length === 4) {
      AuthService.verifySMSCode(smsCode).then(token => {
        sessionStorage.setItem('token', token);
        history.push('/');
      });
    }
  }, [smsCode]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await AuthService.loginBySMS(phone);
      setStep(SMSLoginSteps.ENTER_SMS_CODE);
    } catch (e) {
      error(e);
      notify({
        title: 'Error ocurred',
        message: 'check that phone number is valid and try again',
      });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ textAlign: 'center', marginTop: '30px' }}>
      {step === SMSLoginSteps.ENTER_NUMBER ? (
        <>
          <PhoneMask
            value={phone}
            onChange={setPhone}
            placeholder="Phone"
            name="phone"
          />
          <Button>Continue</Button>
        </>
      ) : (
        <Input
          value={smsCode}
          onChange={e => {
            if (smsCode.length < 4) {
              setSMSCode(e.target.value);
            }
          }}
        />
      )}
    </form>
  );
};

export default AuthForm;
