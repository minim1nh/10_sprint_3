import style from "@/styles/login/style.module.scss";

export default function Login() {
  return (
    <div className={style.containerLogin}>
      <div className={style.containerHeader}>로그인</div>
        <form className={style.containerForm}>
          <label className={style.containerLabel} htmlFor="email">
            이메일<br />
            <input className={style.containerInput} name="email" type="text" placeholder="이메일을 입력해 주세요" />
          </label><br />
          <label className={style.containerLabel} htmlFor="pwd">
            비밀번호<br />
            <input className={style.containerInput} name="pwd" type="password" placeholder="비밀번호를 입력해 주세요" />
          </label><br />
          <input className={style.btnLogin} type="button" value="로그인" />
        </form><br /><br />
        <div className={style.containerSignup}><a href="/signup">회원가입</a></div>
    </div>
  );
}
