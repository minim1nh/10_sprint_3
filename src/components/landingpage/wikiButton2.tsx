import Link from "next/link";
import styles from "@/styles/landingpage/wikiButton.module.scss";
const WikiButton2 = () => {
  return (
    <Link href="/wikilist">
      <button className={styles.wikiButton2}>지금 시작하기</button>
    </Link>
  );
};

export default WikiButton2;
