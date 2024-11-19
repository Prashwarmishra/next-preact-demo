import { AUTH } from '../constants/localStorage';

export const isUserLoggedIn = () => {
  const data = localStorage.getItem(AUTH);
  if (data) {
    const loginData = JSON.parse(data);
    if (loginData.userName && loginData.password) {
      return true;
    }
  }
  return false;
};