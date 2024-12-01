import Link from "next/link";
import styles from "@/styles/landingpage/wikiButton.module.scss";
const WikiButton = () => {
  return (
    <Link href="/wikilist">
      <button className={styles.wikiButton}>위키 만들기</button>
    </Link>
  );
};

export default WikiButton;
