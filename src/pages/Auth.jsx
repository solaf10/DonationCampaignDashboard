import { Link } from 'react-router-dom';
import './Auth.css';
import AuthAnimation from '../components/AuthAnimation';
import CustomInput from '../components/locations/CustomInput';
import { useState } from 'react';
import useLogin from '../customHooks/mutations/useLogin';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { mutate, isPending } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        email,
        password,
      },
      {
        onError: (err) => {
          setError(err.message);
        },
      },
    );
  };

  return (
    <div className='auth'>
      <AuthAnimation />
      <div className='sign signin'>
        <div className='sign-title'>
          <h1>
            مرحبًا بك في لوحة التحكم الخاصة ب
            {/* <img className='logo' src='../imgs/logo.png' alt='logo' /> */}
            <span>منصة بادر</span>
          </h1>
          {/*  <p>
            يرجى إدخال البريد الإلكتروني وكلمة المرور للوصول إلى حسابك ومتابعة
            إدارة التبرعات والأنشطة بكل سهولة وأمان.
          </p> */}
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#ffebee',
              color: '#b71c1c',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              lineHeight: 1.6,
              fontFamily: 'Cairo',
              boxShadow: '0 2px 8px rgba(244, 67, 54, 0.12)',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='email'>
            <label htmlFor='email'>البريد الإلكتروني</label>
            <CustomInput
              inputType='email'
              placeholder='أدخل البريد الإلكتروني'
              styles={{
                height: 'auto',
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--main-color)', // لون اللابل عند focus
                },
              }}
              value={email}
              setValue={setEmail}
            />
          </div>

          <div className='password'>
            <label htmlFor='password'>كلمة المرور</label>
            <CustomInput
              inputType='password'
              placeholder='أدخل كلمة المرور'
              styles={{
                height: 'auto',
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'var(--main-color)', // لون اللابل عند focus
                },
              }}
              value={password}
              setValue={setPassword}
            />
          </div>
          <button type='submit' className='btn' disabled={isPending}>
            {isPending ? <span className='btn-loader'></span> : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
