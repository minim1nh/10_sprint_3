'use client'

import React, { useEffect, useState, forwardRef } from 'react'
import { Stack, Snackbar, Button, Alert, AlertProps } from '@mui/material'
import { SignUpProps, SignInProps, SignUpData, SignInData, RefreahData } from '@/api/swagger/Wikid.types';
import { postSignUp, postSignIn, postRefreshToken } from '@/api/swagger/Auth';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />
  }
)

const AuthTest = () => {
  const [signUp, setSignUp] = useState<SignUpData | null>(null);
  const [signIn, setSignIn] = useState<SignInData | null>(null);
  const [token, setToken] = useState<RefreahData | null>(null);
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
  }, [signUp, signIn, token, open, message])

  const handleSignUp = async () => {
    const reqData = {
      //아래 내용을 수정하여 테스트 해주세요!!!
      email: 'bugbug@gmail.com',
      name: 'bugbug',
      password: 'Melon!1732',
      passwordConfirmation: 'Melon!1732',
    } as SignUpProps;
    try {
      const resData = await postSignUp(reqData);
      setSignUp(resData)
      console.log(JSON.stringify(resData));
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage(String(error));
      setOpen(true)
    }
  };

  const handleSignIn = async () => {
    const reqData = {
      //아래 내용을 수정하여 테스트 해주세요!!!
      email: 'monkey@gmail.com',
      password: 'Melon!1732',
    } as SignInProps;
    try {
      const resData = await postSignIn(reqData);
      setSignIn(resData)
      console.log(JSON.stringify(resData));
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage(String(error));
      setOpen(true)
    }
  };

  const handleRefreshToken = async () => {
    //현재 로그인 사용자의 토큰을 갱신합니다.
    try {
      const resData = await postRefreshToken()
      setToken(resData)
      console.log(JSON.stringify(resData));
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage(String(error));
      setOpen(true)
    }
  }

  return (
    <>
      <Stack p={2}>
        <Button onClick={handleSignUp}>회원가입</Button>
        {signUp ? <Div>{JSON.stringify(signUp)}</Div> :
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarAlert onClose={handleClose} severity='error'>
              {message}
            </SnackbarAlert>
          </Snackbar>
        }
        <Button onClick={handleSignIn}>로그인</Button>
        {signIn ? <Div>{JSON.stringify(signIn)}</Div> :
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarAlert onClose={handleClose} severity='error'>
              {message}
            </SnackbarAlert>
          </Snackbar>
        }        
        <Button onClick={handleRefreshToken}>토큰갱신</Button>
        {token && <Div>{JSON.stringify(token)}</Div>}
        {token ? <Div>{JSON.stringify(token)}</Div> :
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <SnackbarAlert onClose={handleClose} severity='error'>
              {message}
            </SnackbarAlert>
          </Snackbar>
        }
      </Stack>
    </>
  )
}

export default AuthTest