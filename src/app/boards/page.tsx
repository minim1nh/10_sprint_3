import BestBoards from "@/components/boards/BestBoard";
import AllBoards from "@/components/boards/AllBoards";
import styles from "@/styles/boards/styles.module.scss";

export default function BoardsPage() {
  return (
    <div className={styles.boardPage}>
      <BestBoards />
      <AllBoards />
    </div>
  );
}
