import Link from "next/link";
import styles from "@/styles/boards/id/BoardButton.module.scss";

const BoardButton = () => {
  return (
    <Link href="/boards" passHref>
      <button className={styles.boardButton}>목록으로</button>
    </Link>
  );
};

export default BoardButton;
