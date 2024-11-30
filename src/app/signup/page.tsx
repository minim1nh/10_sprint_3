"use client"

import style from "@/styles/signup/style.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { postSignUp } from '@/api/swagger/Auth';
import { SignUpData, SignUpProps } from '@/api/swagger/Wikid.types';

export default function Signup() {
  const { register, handleSubmit, formState: { errors }, } = useForm<SignUpProps>({ mode: "onBlur"});
  const [isSuccess, setIsSuccess] = useState(false);


  const onValid = async (data: SignUpProps) => {
    const reqData = {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation
    };


    try {
      const resData = await postSignUp(reqData);
      console.log(JSON.stringify(resData));
      setIsSuccess(true);
    } catch (e) {
      console.log(e);
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    } 
  }

  return (
    <div className={style.containerSignup}>
      <div className={style.containerHeader}>회원가입</div>
        <form className={style.containerForm} onSubmit={handleSubmit(onValid)}>
          <label className={style.containerLabel} htmlFor="name">
            이름<br />
            <input className={style.containerInput}
              {...register("name", { required: "필수 항목입니다.", 
              maxLength: {
                value: 10,
                message: "10자 이하로 작성해 주세요.",
              },})} 
              id="name" name="name" type="text" placeholder="이름을 입력해 주세요" />
            { errors.name && <small className={style.tagAlert} role="alert">{errors.name.message}</small> }
          </label><br />
          <label className={style.containerLabel} htmlFor="email">
            이메일<br />
            <input className={style.containerInput}
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
            <input className={style.containerInput}
              {...register("password", {required: "8자 이상 입력해 주세요.", 
              minLength: {
                value: 8,
                message: "8자 이상 입력해 주세요.",
              },})}
              id="password" name="password" type="password" placeholder="비밀번호를 입력해 주세요" />
            { errors.password && <small className={style.tagAlert} role="alert">{errors.password.message}</small> }
          </label><br />
          <label className={style.containerLabel} htmlFor="passwordConfirmation">
            비밀번호 확인<br />
            <input className={style.containerInput}
            {...register("email", { required: "이메일 형식으로 작성해 주세요.", 
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,4}$/i,
                message: "이메일 형식으로 작성해 주세요.",
              },})}
              id="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="비밀번호를 입력해 주세요" />
            { errors.passwordConfirmation && <small className={style.tagAlert} role="alert">{errors.passwordConfirmation.message}</small> }
            </label><br />
          <input className={style.btnSignup} type="button" value="가입하기" />
        </form><br /><br />
        <div className={style.containerLogin}>이미 회원이신가요?&nbsp;&nbsp;<a href="/login">로그인하기</a></div>
    </div>
  );
}
