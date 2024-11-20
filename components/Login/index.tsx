import { ChangeEvent, useEffect, useState } from 'react';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';
import FocusableInput from '../../ui/atoms/FocusableInput';
import FocusableButton from '../../ui/atoms/FocusableButton';
import s from './Login.module.scss';
import useNavigation from '../../hooks/useNavigation';
import { AUTH } from '../../constants/localStorage';
import { REDIRECTION_PATH_AFTER_LOGIN } from '../../constants/sessionStorage';
import { useRouter } from 'next/router';

const USERNAME_FOCUSKEY = 'usernameInput';
const PASSWORD_FOCUSKEY = 'passwordInput';

const LoginPage = () => {
  useNavigation({});

  const router = useRouter();

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      const authData = JSON.stringify({
        username,
        password,
      });
      localStorage.setItem(AUTH, authData);

      const redirectPath = sessionStorage.getItem(REDIRECTION_PATH_AFTER_LOGIN);
      if (redirectPath) {
        sessionStorage.removeItem(REDIRECTION_PATH_AFTER_LOGIN);
        router.replace(redirectPath);
      }
    }
  };

  useEffect(() => {
    setFocus(USERNAME_FOCUSKEY);
  }, []);

  return (
    <div className={s.root}>
      <h1 className={s.title}>Login</h1>

      <FocusableInput
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        placeholder='Username'
        focusKey={USERNAME_FOCUSKEY}
      />
      <FocusableInput
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        placeholder='Password'
        focusKey={PASSWORD_FOCUSKEY}
      />
      <FocusableButton
        onClick={handleLogin}
        label='Login'
        focusKey='loginButton'
      />
    </div>
  );
};

export default LoginPage;
