import style from "@/styles/mypage/style.module.scss";

export default function MyPage() {
  return (
    <div className={style.containerMypage}>
      <div className={style.containerHeader}>계정 설정</div>
      <form className={style.containerForm}>
        <label className={style.containerLabel}>
          비밀번호 변경<br />
          <input className={style.containerInput} name="existingPwd" type="password" placeholder="기존 비밀번호" />
          <input className={style.containerInput} name="newPwd" type="password" placeholder="새 비밀번호" />
          <input className={style.containerInput} name="newPwdCheck" type="password" placeholder="새 비밀번호 확인" />
        </label>
        <input className={style.btn} type="button" value="변경하기" />
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
