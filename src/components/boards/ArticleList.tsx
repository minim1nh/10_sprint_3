import { ArticlesData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/ArticleList.module.scss";

const ArticleList = ({
  id,
  title,
  writer,
  likeCount,
  updatedAt,
}: ArticlesData) => {
  return (
    <div className={styles.articleContain}>
      <div className={styles.innerInfo}>
        <div className={styles.id}>{id}</div>
        <div className={styles.contentTitle}>{title}</div>
        <div className={styles.nameAupdate}>
          <p className={styles.name}>{writer.name}</p>
          <p className={styles.likeCount}>{likeCount}</p>
          <p className={styles.updatedAt}>{updatedAt.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
