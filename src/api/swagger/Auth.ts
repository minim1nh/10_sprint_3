import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import SessionStorage from '@/api/storage/SessionStorage';
import { teamId, SignUpProps, SignInProps, SignInData, SignUpData, RefreahData } from '@/api/swagger/Wikid.types';
import { getRefreshToken } from '@/hooks/Token'

/**
 * '회원가입' 요청을 보내는 함수
 */
export const postSignUp = async (reqProps: SignUpProps): Promise<SignUpData> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/auth/signUp`;
  console.log("POST - postSignUp(): ", URL);

  try {
    const res = await axios.post(
      URL,
      {
        email: reqProps.email,
        name: reqProps.name,
        password: reqProps.password,
        passwordConfirmation: reqProps.passwordConfirmation,
      },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    if (res.status === 201) {
      const signUp = res.data as SignUpData;
      LocalStorage.setItem(`postSignUp`, signUp);
      return signUp;
    } else {
      throw new Error('Failed to Auth postSignUp()');
    }
  } catch (error) {
    //console.error('Error to Auth postSignUp()', error);
    throw error;
  }
};

/**
 * '로그인' 요청을 보내는 함수
 */
export const postSignIn = async (reqProps: SignInProps): Promise<SignInData> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/auth/signIn`;
  console.log("POST - postSignIn(): ", URL);

  try {
    const res = await axios.post(
      URL,
      {
        email: reqProps.email,
        password: reqProps.password,
      },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    if (res.status === 200) {
      const signIn = res.data as SignInData;
      SessionStorage.setItem(`postSignIn`, signIn);
      axios.defaults.headers.common.Authorization = `Bearer ${signIn.accessToken}`; 
      return signIn;
    } else {
      throw new Error('Failed to Auth postSignIn()');
    }
  } catch (error) {
    //console.error('Error to Auth postSignIn()', error);
    throw error;
  }
};

/**
 * '토큰갱신' 요청을 보내는 함수
 */
export const postRefreshToken = async (): Promise<RefreahData | null> => {

  const refreshToken = getRefreshToken();
  if (!refreshToken) { console.log('None of LogIn!!!'); return null; }

  const signIn = SessionStorage.getItem(`postSignIn`) as SignInData;

  const URL = `https://wikied-api.vercel.app/${teamId}/auth/refresh-token`;
  console.log("POST - postRefreshToken(): ", URL);

  try {
    const res = await axios.post(
      URL,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );

    if (res.status === 200) {
      const resData = res.data as RefreahData;
      LocalStorage.setItem(`postRefreshToken`, resData);
      signIn.accessToken = resData.accessToken;
      SessionStorage.setItem(`postSignIn`, signIn);
      return resData;
    } else {
      throw new Error('Failed to Auth postRefreshToken()');
    }
  } catch (error) {
    //console.error('Error to Auth postRefreshToken()', error);
    throw error;
  }
};
