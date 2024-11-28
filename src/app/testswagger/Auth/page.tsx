"use client";

import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import {
  SignUpProps,
  SignInProps,
  SignUpData,
  SignInData,
  RefreahData,
} from "@/api/swagger/Wikid.types";
import { postSignUp, postSignIn, postRefreshToken } from "@/api/swagger/Auth";
import { styled } from "@mui/material/styles";
import { WikidSnackbar } from "@/components/common/WikidSnackbar";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AuthTest = () => {
  const [signUp, setSignUp] = useState<SignUpData | null>(null);
  const [signIn, setSignIn] = useState<SignInData | null>(null);
  const [token, setToken] = useState<RefreahData | null>(null);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");

  useEffect(() => {}, [signUp, signIn, token, message]);

  const handleSignUp = async () => {
    const reqData = {
      //아래 내용을 수정하여 테스트 해주세요!!!
      email: "fdragons1@gmail.com",
      name: "kimjoodong",
      password: "1qa2ws3ed!!",
      passwordConfirmation: "1qa2ws3ed!!",
    } as SignUpProps;

    try {
      const resData = await postSignUp(reqData);
      setSignUp(resData);
      console.log(JSON.stringify(resData));
      setMessage("회원가입 성공");
      setSeverity("success");
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage(String(error));
      setSeverity("error");
    }
  };

  const handleSignIn = async () => {
    const reqData = {
      //아래 내용을 수정하여 테스트 해주세요!!!
      email: "keroro@email.com",
      password: "keroro1234!",
    } as SignInProps;

    try {
      const resData = await postSignIn(reqData);
      setSignIn(resData);
      console.log(JSON.stringify(resData));
      setMessage("로그인 성공");
      setSeverity("success");
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage(String(error));
      setSeverity("warning");
    }
  };

  const handleRefreshToken = async () => {
    //로컬스토리지에 저장된 refreshToken을 사용합니다.
    //현재 로그인 사용자의 accessToken토큰을 갱신합니다.
    try {
      const resData = await postRefreshToken();
      setToken(resData);
      console.log(JSON.stringify(resData));
      setMessage("토큰 갱신 성공");
      setSeverity("success");
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage(String(error));
      setSeverity("info");
    }
  };

  return (
    <>
      <Stack p={2}>
        <Button onClick={handleSignUp}>회원가입</Button>
        <Button onClick={handleSignIn}>로그인</Button>
        <Button onClick={handleRefreshToken}>토큰갱신</Button>
      </Stack>

      {signUp && <Div>회원가입정보:{JSON.stringify(signUp)}</Div>}
      {signIn && <Div>로그인정보:{JSON.stringify(signIn)}</Div>}
      {token && <Div>토큰갱신정보:{JSON.stringify(token)}</Div>}

      <WikidSnackbar severity={severity} message={message} autoHideDuration={3000} />

    </>
  );
};

export default AuthTest;
