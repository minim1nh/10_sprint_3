"use client"

import style from "@/styles/login/style.module.scss";
import { useForm } from "react-hook-form";

interface FormTypes {
  email: string;
  pwd: string;
}
export default function Login() {
  const { register, handleSubmit } = useForm<FormTypes>();
  const onValid = (data: FormTypes) => console.log(data);
  return (
    <div className={style.containerLogin}>
      <div className={style.containerHeader}>로그인</div>
        <form className={style.containerForm} onSubmit={handleSubmit(onValid)}>
          <label className={style.containerLabel} htmlFor="email">
            이메일<br />
            <input className={style.containerInput} {...register("email", {required: true, minLength: 8})}
             name="email" type="text" placeholder="이메일을 입력해 주세요" />
          </label><br />
          <label className={style.containerLabel} htmlFor="pwd">
            비밀번호<br />
            <input className={style.containerInput} {...register("pwd", {required: true, minLength: 8})}
            name="pwd" type="password" placeholder="비밀번호를 입력해 주세요" />
          </label><br />
          <input className={style.btnLogin} type="submit" value="로그인" />
        </form><br /><br />
        <div className={style.containerSignup}><a href="/signup">회원가입</a></div>
    </div>
  );
}
