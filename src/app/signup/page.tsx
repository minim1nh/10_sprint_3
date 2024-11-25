import style from "@/styles/signup/style.module.scss";

export default function Signup() {
  return (
    <div className={style.containerSignup}>
      <div className={style.containerHeader}>회원가입</div>
        <form className={style.containerForm}>
          <label className={style.containerLabel} htmlFor="name">
            이름<br />
            <input className={style.containerInput} name="name" type="text" placeholder="이름을 입력해 주세요" />
          </label><br />
          <label className={style.containerLabel} htmlFor="email">
            이메일<br />
            <input className={style.containerInput} name="email" type="text" placeholder="이메일을 입력해 주세요" />
          </label><br />
          <label className={style.containerLabel} htmlFor="pwd">
            비밀번호<br />
            <input className={style.containerInput} name="pwd" type="password" placeholder="비밀번호를 입력해 주세요" />
          </label><br />
          <label className={style.containerLabel} htmlFor="pwdcheck">
            비밀번호 확인<br />
            <input className={style.containerInput} name="pwdcheck" type="password" placeholder="비밀번호를 입력해 주세요" />
          </label><br />
          <input className={style.btnSignup} type="button" value="가입하기" />
        </form><br /><br />
        <div className={style.containerLogin}>이미 회원이신가요?&nbsp;&nbsp;<a href="/login">로그인하기</a></div>
    </div>
  );
}
