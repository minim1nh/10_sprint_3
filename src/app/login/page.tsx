"use client"

import style from "@/styles/login/style.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { postSignIn } from '@/api/swagger/Auth';
import { SignInProps } from '@/api/swagger/Wikid.types';

export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm<SignInProps>({ mode: "onBlur"});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if(isSuccess)
      redirect('/');
  }, [isSuccess]);

  
  const onValid = async (data: SignInProps) => {
    const reqData = {
      email: data.email,
      password: data.password,
    };


    try {
      const resData = await postSignIn(reqData);
      console.log(JSON.stringify(resData));
      setIsSuccess(true);
    } catch (e) {
      console.log(e);
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    } 
  }

  return (
    <div className={style.containerLogin}>
      <div className={style.containerHeader}>로그인</div>
        <form className={style.containerForm} onSubmit={handleSubmit(onValid)}>
          <label className={style.containerLabel} htmlFor="email">
            이메일<br />
            <input className={`${style.containerInput} ${errors.email ? style.errorInput : ""}`} 
            {...register("email", { required: "이메일 형식으로 작성해 주세요.", 
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,4}$/i,
                message: "이메일 형식으로 작성해 주세요.",
              },})}
             id="email" name="email" type="text" placeholder="이메일을 입력해 주세요" />
             { errors.email && <small className={style.tagAlert} role="alert">{errors.email.message}</small>}
          </label><br />
          <label className={style.containerLabel} htmlFor="password">
            비밀번호<br />
            <input className={`${style.containerInput} ${errors.password ? style.errorInput : ""}`} 
            {...register("password", {required: "8자 이상 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})}
            id="password" name="password" type="password" placeholder="비밀번호를 입력해 주세요" />
            { errors.password && <small className={style.tagAlert} role="alert">{errors.password.message}</small> }
          </label><br />
          <input className={style.btnLogin} type="submit" value="로그인" />
        </form><br /><br />
        <div className={style.containerSignup}><a href="/signup">회원가입</a></div>
    </div>
  );
}
