"use client"

import style from "@/styles/login/style.module.scss";
import { useForm } from "react-hook-form";

interface FormTypes {
  email: string;
  pwd: string;
}
export default function Login() {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormTypes>({ mode: "onBlur"});
  const onValid = (data: FormTypes) => console.log(data);

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
          <label className={style.containerLabel} htmlFor="pwd">
            비밀번호<br />
            <input className={`${style.containerInput} ${errors.pwd ? style.errorInput : ""}`} 
            {...register("pwd", {required: "8자 이상 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})}
            id="pwd" name="pwd" type="password" placeholder="비밀번호를 입력해 주세요" />
            { errors.pwd && <small className={style.tagAlert} role="alert">{errors.pwd.message}</small> }
          </label><br />
          <input className={style.btnLogin} type="submit" value="로그인" />
        </form><br /><br />
        <div className={style.containerSignup}><a href="/signup">회원가입</a></div>
    </div>
  );
}
