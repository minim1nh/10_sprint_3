import ArticleImage from "../ArticleImage";
import { ArticlesDetailData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/id/IdCard.module.scss";
import LikeCount from "../LikeCount";

const IdCard = ({
  id,
  title,
  content,
  image,
  writer,
  likeCount,
  updatedAt,
}: ArticlesDetailData) => {
  const formattedDate = updatedAt ? updatedAt.slice(0, 10) : "날짜 없음";

  return (
    <div className={styles.articleContain}>
      <div className={styles.innerContain}>
        <div className={styles.innerInfo}>
          <div className={styles.contentTitle}>{title}</div>
          <div className={styles.userInfo}>
            <div className={styles.nameAupdate}>
              <p className={styles.name}>{writer.name}</p>
              <p className={styles.updatedAt}>{formattedDate}</p>
            </div>
            <LikeCount likeCount={likeCount} />
          </div>
          <div className={styles.photoContain}>
            <ArticleImage src={image} alt={`${id} 이미지`} />
          </div>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
