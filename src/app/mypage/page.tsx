"use client"

import style from "@/styles/mypage/style.module.scss";
import { useForm } from "react-hook-form";
import { patchUsersMePassword } from '@/api/swagger/User';
import { PasswordProps } from '@/api/swagger/Wikid.types';

export default function MyPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm<PasswordProps>({ mode: "onBlur"});

  const onValid = async (data: PasswordProps) => {
    const reqData = {
      passwordConfirmation: data.passwordConfirmation,
      password: data.password,
      currentPassword: data.currentPassword,
    };

    try {
      const resData = await patchUsersMePassword(reqData);
      console.log(JSON.stringify(resData));
    } catch (e) {
      console.log(e);
      alert('변경실패');
    } 
  }

  return (
    <div className={style.containerMypage}>
      <div className={style.containerHeader}>계정 설정</div>
      <form className={style.containerForm} onSubmit={handleSubmit(onValid)}>
        <label className={style.containerLabel}>
          비밀번호 변경<br />
          <input className={style.containerInput} {...register("currentPassword", {required: "기존 비밀번호를 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})} id="currentPassword" name="currentPassword" type="password" placeholder="기존 비밀번호" />
          <input className={style.containerInput} {...register("password", {required: "8자 이상 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})} id="password" name="password" type="password" placeholder="새 비밀번호" />
            { errors.password && <small className={style.tagAlert} role="alert">{errors.password.message}</small> }
          <input className={style.containerInput} {...register("passwordConfirmation", {required: "8자 이상 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})} id="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="새 비밀번호 확인" />
        </label>
        <input className={style.btn} type="submit" value="변경하기" />
      </form>
      <br /><hr className={style.styleHr} /><br />
      <form className={style.containerForm}>
        <label className={style.containerLabel}>
          위키 생성하기<br />
          <input className={style.containerInput} name="wikiQues" type="text" placeholder="질문을 입력해 주세요" />
          <input className={style.containerInput} name="wikiAns" type="text" placeholder="답을 입력해 주세요" />
        </label>
        <input className={style.btn} type="button" value="생성하기" />
      </form>
    </div>
  );
}
