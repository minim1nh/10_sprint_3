import LocalStorage from '@/api/storage/LocalStorage';
import { SignInData, SignUpData } from '@/api/swagger/Wikid.types';

// 회원가입 정보 얻기
export const isSignUp = () => {
  const signUp = LocalStorage.getItem(`SignUp`) as SignUpData || null
  return signUp;
};

// 로그인 정보 얻기
export const isSignIn = () => {
  const signIn = LocalStorage.getItem(`SignIn`) as SignInData | null
  return signIn;
};

// 로그인 토큰 얻기
export const getAccessToken = () => {
  return isSignIn()?.accessToken;
};

// 암호변경 토큰 얻기
export const getRefreshToken = () => {
  return isSignIn()?.refreshToken;
};
