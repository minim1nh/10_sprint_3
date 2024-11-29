import ArticleForm from "@/components/addboard/ArticleAdd";
import styles from "@/styles/addboard/styles.module.scss";

export default function BoardsPage() {
  return (
    <div className={styles.addBoardPage}>
      <ArticleForm />
    </div>
  );
}
