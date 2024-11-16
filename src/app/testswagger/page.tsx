'use client'

import React, {useState} from 'react'
import { Stack, Button } from '@mui/material'
import { signUpRequestProps, signInRequestProps, signInUpResponseData } from '@/api/swagger/Wikid.types';
import { postSignUp, postSignIn, postRefreshToken } from '@/api/swagger/Auth';

const AuthTest = () => {
  const [signUp, setSignUp] = useState<signInUpResponseData | null>(null);
  const [signIn, setSignIn] = useState<signInUpResponseData | null>(null);

  const handleSignUp = async () => {
    const reqData = {
      //아래 내용을 수정하여 테스트 해주세요!!!
      email: 'spfe1012@codeit.com',
      name: '김주동',
      password: 'Melon!1732',
      passwordConfirmation: 'Melon!1732',
    } as signUpRequestProps;
    const resData = await postSignUp(reqData);
    setSignUp(resData)
    console.log(JSON.stringify(signUp));
  };
  
  const handleSignIn = async () => {
    const reqData = {
      //아래 내용을 수정하여 테스트 해주세요!!!
      email: 'test@test.com',
      password: 'test',
    } as signInRequestProps;
    const resData = await postSignIn(reqData);
    setSignIn(resData)
    console.log(JSON.stringify(signIn));
  };
  
  const handleRefreshToken = async () => {
    //현재 로그인 사용자의 토큰을 갱신합니다.
    const token = await postRefreshToken();
    console.log(token);
  }
  
  return (
    <>
    <Stack p={2}>
    <Button onClick={handleSignUp}>회원가입</Button>
    <Button onClick={handleSignIn}>로그인</Button>
    <Button onClick={handleRefreshToken}>토큰갱신</Button>
    </Stack>
    </>
  )
}

export default AuthTest