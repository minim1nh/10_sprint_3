import ArticleImage from "../ArticleImage";
import { ArticlesData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/best/ArticleCard.module.scss";
import LikeCount from "../LikeCount";

const ArticleCard = ({
  id,
  title,
  image,
  writer,
  likeCount,
  updatedAt,
}: ArticlesData) => {
  return (
    <div className={styles.articleContain}>
      <div className={styles.innerContain}>
        <div className={styles.photoContain}>
          <ArticleImage
            src={image}
            alt={`${id} 이미지`}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.innerInfo}>
          <div className={styles.contentTitle}>{title}</div>
          <div className={styles.userInfo}>
            <div className={styles.nameAupdate}>
              <p className={styles.name}>{writer.name}</p>
              <p className={styles.updatedAt}>{updatedAt.slice(0, 10)}</p>
            </div>
            <LikeCount likeCount={likeCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
