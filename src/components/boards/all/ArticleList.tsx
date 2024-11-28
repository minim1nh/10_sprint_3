import { ArticlesData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/all/ArticleList.module.scss";

const ArticleList = ({
  title,
  writer,
  likeCount,
  updatedAt,
  rank,
}: ArticlesData & { rank: number }) => {
  return (
    <div className={styles.articleContain}>
      <div className={styles.innerInfo}>
        <div className={styles.rank}>{rank}</div>
        <div className={styles.title}>{title}</div>
        <p className={styles.name}>{writer.name}</p>
        <p className={styles.likeCount}>{likeCount}</p>
        <p className={styles.updatedAt}>{updatedAt.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default ArticleList;
