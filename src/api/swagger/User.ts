import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import { teamId, UserData, SignInData, PasswordProps } from './Wikid.types';

/**
 * 내 정보 조회 함수
 */
export const getUsersMe = async (): Promise<UserData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : getUsersMe() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/user/me`
  console.log('GET - URL: ', URL)

  try {
    const res = await axios.get(URL, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }
    });

    if (res.status === 200) {
      const resData = res.data as UserData;
      LocalStorage.setItem(`getUsersMe`, resData);
      return resData;
    } else {
      throw new Error('Failed to getUsersMe()');
    }
  } catch (error) {
    console.error('Error to getUsersMe():', error);
    throw error;
  }
};

/**
 * 내 비밀번호 변경하는 함수
 */
export const patchUsersMePassword = async (reqProps: PasswordProps): Promise<UserData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : patchUsersMePassword() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  try {
    const res = await axios.patch(`https://wikied-api.vercel.app/${teamId}/user/me/password`, {
      passwordConfirmation: reqProps.passwordConfirmation,
      password: reqProps.password,
      currentPassword: reqProps.currentPassword,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }
    });

    if (res.status === 200) {
      const resData = res.data as UserData;
      LocalStorage.setItem(`patchUsersMePassword`, resData);
      return resData;
    } else {
      throw new Error('Failed to patchUsersMePassword()');
    }
  } catch (error) {
    console.error('Error to patchUsersMePassword():', error);
    throw error;
  }
};
