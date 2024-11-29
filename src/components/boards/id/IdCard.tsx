import ArticleImage from "../ArticleImage";
import { ArticlesDetailData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/id/IdCard.module.scss";
import LikeCount from "../LikeCount";
import DeleteArticle from "./DeleteButton";

const IdCard = ({
  id,
  title,
  content,
  image,
  writer,
  likeCount,
  updatedAt,
}: ArticlesDetailData) => {
  const handleEdit = () => {
    console.log("수정하기 버튼 클릭");
  };

  return (
    <div className={styles.articleContain}>
      <div className={styles.innerContain}>
        <div className={styles.innerInfo}>
          <div className={styles.innerInfo1}>
            <div className={styles.contentTitle}>{title}</div>
            <div className={styles.buttonContain}>
              <button className={styles.editButton} onClick={handleEdit}>
                수정하기
              </button>
              <DeleteArticle articleId={id} />
            </div>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.nameAupdate}>
              <p className={styles.name}>{writer.name}</p>
              <p className={styles.updatedAt}>{updatedAt.slice(0, 10)}</p>
            </div>
            <div className={styles.likeCount}>
              <LikeCount articleId={id} likeCount={likeCount} />
            </div>
          </div>
          <div className={styles.photoContain}>
            <div className={styles.photoContain1}>
              <ArticleImage
                src={image}
                alt={`${id} 이미지`}
                width={500}
                height={500}
              />
            </div>
          </div>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default IdCard;
