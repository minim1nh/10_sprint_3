import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import { teamId, SignUpProps, SignInProps, SignInData, SignUpData, RefreahData } from './Wikid.types';
import { getRefreshToken } from '@/hooks/Token'

/**
 * '회원가입' 요청을 보내는 함수
 */
export const postSignUp = async (reqProps: SignUpProps): Promise<SignUpData> => {
  try {
    const res = await axios.post(`https://wikied-api.vercel.app/${teamId}/auth/signUp`, {
      email: reqProps.email,
      name: reqProps.name,
      password: reqProps.password,
      passwordConfirmation: reqProps.passwordConfirmation,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (res.status === 201) {
      const signUp = res.data as SignUpData;
      LocalStorage.setItem(`SignUp`, signUp);
      return signUp;
    } else {
      throw new Error('Failed to Auth postSignUp()');
    }
  } catch (error) {
    console.error('Error to Auth postSignUp()', error);
    throw error;
  }
};

/**
 * '로그인' 요청을 보내는 함수
 */
export const postSignIn = async (reqProps: SignInProps): Promise<SignInData> => {
  try {
    const res = await axios.post(`https://wikied-api.vercel.app/${teamId}/auth/signIn`, {
      email: reqProps.email,
      password: reqProps.password,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (res.status === 200) {
      const signIn = res.data as SignInData;
      LocalStorage.setItem(`SignIn`, signIn);
      return signIn;
    } else {
      throw new Error('Failed to Auth postSignIn()');
    }
  } catch (error) {
    console.error('Error to Auth postSignIn()', error);
    throw error;
  }
};

/**
 * '토큰갱신' 요청을 보내는 함수
 */
export const postRefreshToken = async (): Promise<RefreahData | null> => {

  const refreshToken = getRefreshToken();
  if(!refreshToken) return null;
  
  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;

  try {
    const res = await axios.post(`https://wikied-api.vercel.app/${teamId}/auth/refresh-token`, {
      refreshToken: refreshToken,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (res.status === 200) {
      const resData = res.data as RefreahData;
      signIn.accessToken = resData.accessToken;
      LocalStorage.setItem(`SignIn`, signIn);
      return resData;
    } else {
      throw new Error('Failed to Auth postRefreshToken()');
    }
  } catch (error) {
    console.error('Error to Auth postRefreshToken()', error);
    throw error;
  }
};
