import axios from 'axios';
import SessionStorage from '@/api/storage/SessionStorage';
import { teamId, UserData, PasswordProps } from '@/api/swagger/Wikid.types';
import { getAccessToken } from '@/hooks/Token'

/**
 * 내 정보 조회 함수
 */
export const getUsersMe = async (): Promise<UserData | null> => {

  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/user/me`
  console.log('GET - getUsersMe(): ', URL)

  try {
    const res = await axios.get(
      URL,
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );

    if (res.status === 200) {
      const resData = res.data as UserData;
      SessionStorage.setItem(`getUsersMe`, resData);
      return resData;
    } else {
      throw new Error('Failed to getUsersMe()');
    }
  } catch (error) {
    //console.error('Error to getUsersMe():', error);
    throw error;
  }
};

/**
 * 내 비밀번호 변경하는 함수
 */
export const patchUsersMePassword = async (reqProps: PasswordProps): Promise<UserData | null> => {

  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/user/me/password`
  console.log('PATCH - patchUsersMePassword(): ', URL)

  try {
    const res = await axios.patch(
      URL,
      {
        passwordConfirmation: reqProps.passwordConfirmation,
        password: reqProps.password,
        currentPassword: reqProps.currentPassword,
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    );

    if (res.status === 200) {
      const resData = res.data as UserData;
      SessionStorage.setItem(`patchUsersMePassword`, resData);
      return resData;
    } else {
      throw new Error('Failed to patchUsersMePassword()');
    }
  } catch (error) {
    //console.error('Error to patchUsersMePassword():', error);
    throw error;
  }
};
