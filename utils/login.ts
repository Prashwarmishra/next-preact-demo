import { isClient } from '.';
import { AUTH } from '../constants/localStorage';

export const isUserLoggedIn = () => {
  const data = localStorage.getItem(AUTH);
  if (data) {
    const loginData = JSON.parse(data);
    if (loginData.username && loginData.password) {
      return true;
    }
  }
  return false;
};

export const getUsername = () => {
  if (isClient) {
    const data = localStorage.getItem(AUTH);
    if (data) {
      const loginData = JSON.parse(data);
      if (loginData.username) {
        return loginData.username;
      }
    }
  }

  return '';
};
