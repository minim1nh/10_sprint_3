"use client"

import style from "@/styles/mypage/style.module.scss";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUsersMe, patchUsersMePassword } from '@/api/swagger/User';
import { PasswordProps, ProfilesProps } from '@/api/swagger/Wikid.types';
import { postProfiles } from "@/api/swagger/Profile";

type passFormInput = PasswordProps;
type wikiFormInput = ProfilesProps;

export default function MyPage() {
  const [isWikiExist, setIsWikiExist] = useState(false);
  const router = useRouter();

  const passwordForm = useForm<passFormInput>({ mode: "onBlur"});
  const wikiForm = useForm<wikiFormInput>({ mode: "onBlur"});

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (isWikiExist) {
        try {
          const resData = await getUsersMe(); // 비동기 호출
          if (resData?.profile?.code) {
            router.push(`/wiki?code=${resData.profile.code}`);
          } else {
            console.error("Profile code not found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchAndRedirect();
  }, [isWikiExist, router]);

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
      alert('변경에 실패하였습니다.');
    } 
  }

  const checkWikiExist = async (data: ProfilesProps) => {
    try {
      const resData = await getUsersMe();
      if(resData !== null) {
        if(resData.profile != null) {
          alert('이미 위키 페이지가 존재합니다!');
          setIsWikiExist(true);
        }
        else {
          const reqProf = {
            securityQuestion: data.securityQuestion,
            securityAnswer: data.securityAnswer,
          }
          const resProf = await postProfiles(reqProf);
          console.log(JSON.stringify(resProf));
        }
      }
    }
    catch(e) {
      console.log(e);
      console.log('위키 페이지 생성에 실패했습니다.');
    }
  }

  return (
    <div className={style.containerMypage}>
      <div className={style.containerHeader}>계정 설정</div>
      <form className={style.containerForm} onSubmit={passwordForm.handleSubmit(onValid)}>
        <label className={style.containerLabel}>
          비밀번호 변경<br />
          <input className={`${style.containerInput} ${passwordForm.formState.errors.currentPassword ? style.errorInput : ""}`}
           {...passwordForm.register("currentPassword", {required: "기존 비밀번호를 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})} id="currentPassword" name="currentPassword" type="password" placeholder="기존 비밀번호" />
            { passwordForm.formState.errors.currentPassword && <small className={style.tagAlert} role="alert">{passwordForm.formState.errors.currentPassword.message}</small> }
            
          <input className={`${style.containerInput} ${passwordForm.formState.errors.password ? style.errorInput : ""}`}
             {...passwordForm.register("password", {required: "8자 이상 입력해 주세요.", 
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },})} id="password" name="password" type="password" placeholder="새 비밀번호" />
            { passwordForm.formState.errors.password && <small className={style.tagAlert} role="alert">{passwordForm.formState.errors.password.message}</small> }
          
          <input className={`${style.containerInput} ${passwordForm.formState.errors.passwordConfirmation ? style.errorInput : ""}`} 
          {...passwordForm.register("passwordConfirmation", {required: "비밀번호가 일치하지 않습니다.", 
            validate: {
              check: (val) => {
                if(passwordForm.getValues("password") !== val)
                  return "비밀번호가 일치하지 않습니다.";
              }
            },})} id="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="새 비밀번호 확인" />
            { passwordForm.formState.errors.passwordConfirmation && <small className={style.tagAlert} role="alert">{passwordForm.formState.errors.passwordConfirmation.message}</small> }
        </label>
        <input className={style.btn} type="submit" value="변경하기" />
      </form>

      <br /><hr className={style.styleHr} /><br />

      <form className={style.containerForm} onSubmit={wikiForm.handleSubmit(checkWikiExist)}>
        <label className={style.containerLabel}>
          위키 생성하기<br />
          <input className={`${style.containerInput} ${wikiForm.formState.errors.securityQuestion ? style.errorInput : ""}`}
          {...wikiForm.register("securityQuestion", {required: "질문을 입력해 주세요.", })}
           id="securityQuestion" name="securityQuestion" type="text" placeholder="질문을 입력해 주세요" />
          { wikiForm.formState.errors.securityQuestion && <small className={style.tagAlert} role="alert">{wikiForm.formState.errors.securityQuestion.message}</small> }
          <input className={`${style.containerInput} ${wikiForm.formState.errors.securityAnswer ? style.errorInput : ""}`}
          {...wikiForm.register("securityAnswer", {required: "답을 입력해 주세요.", })}
           id="securityAnswer" name="securityAnswer" type="text" placeholder="답을 입력해 주세요" />
          { wikiForm.formState.errors.securityAnswer && <small className={style.tagAlert} role="alert">{wikiForm.formState.errors.securityAnswer.message}</small> }
        </label>
        <input className={style.btn} type="submit" value="생성하기" />
      </form>
    </div>
  );
}
