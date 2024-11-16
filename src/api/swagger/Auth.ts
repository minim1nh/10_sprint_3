import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import { teamId, signUpRequestProps, signInRequestProps, signInUpResponseData } from './Wikid.types';

/**
 * '회원가입' 요청을 보내는 함수
 */
export const postSignUp = async (reqData: signUpRequestProps): Promise<signInUpResponseData> => {
  try {
    const response = await axios.post(`https://wikied-api.vercel.app/${teamId}/auth/signUp`, {
      email: reqData.email,
      name: reqData.name,
      password: reqData.password,
      passwordConfirmation: reqData.passwordConfirmation,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 201) {
      const signUp = response.data as signInUpResponseData;
      LocalStorage.setItem(`signUp`, signUp);
      return signUp;
    } else {
      throw new Error('Failed to axios.post: Auth signUp');
    }
  } catch (error) {
    console.error('Error axios.post: Auth signUp', error);
    throw error;
  }
};


/**
 * '로그인' 요청을 보내는 함수
 */
export const postSignIn = async (reqData: signInRequestProps): Promise<signInUpResponseData> => {
  try {
    const response = await axios.post(`https://wikied-api.vercel.app/${teamId}/auth/signIn`, {
      email: reqData.email,
      password: reqData.password,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      const signIn = response.data as signInUpResponseData;
      LocalStorage.setItem(`signIn`, signIn);
      return signIn;
    } else {
      throw new Error('Failed to axios.post: Auth signIn');
    }
  } catch (error) {
    console.error('Error axios.post: Auth signIn', error);
    throw error;
  }
};

/**
 * '토큰갱신' 요청을 보내는 함수
 */
export const postRefreshToken = async (): Promise<string | undefined> => {
  const signIn = LocalStorage.getItem(`signIn`) as signInUpResponseData;
  if (!signIn?.refreshToken) {
    console.error(`Error axios.post: Auth 'signIn.refreshToken' info does not exist in localstorage.`);
    return undefined;
  }
  try {
    const response = await axios.post(`https://wikied-api.vercel.app/${teamId}/auth/refresh-token`, {
      refreshToken: signIn.refreshToken,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      const accessToken = response.data as string;
      signIn.accessToken = accessToken;
      LocalStorage.setItem(`signIn`, signIn);
      return accessToken;
    } else {
      throw new Error('Failed to axios.post: Auth refreshToken');
    }
  } catch (error) {
    console.error('Error axios.post: Auth refreshToken', error);
    throw error;
  }
};
