import { ChangeEvent, useEffect, useState } from 'react';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';
import FocusableInput from '../../ui/atoms/FocusableInput';
import FocusableButton from '../../ui/atoms/FocusableButton';
import s from './Login.module.scss';

const USERNAME_FOCUSKEY = 'usernameInput';
const PASSWORD_FOCUSKEY = 'passwordInput';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Logging in with Username: ${username} and Password: ${password}`);
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
        onChange={(e: any) => setPassword(e.target.value)}
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
