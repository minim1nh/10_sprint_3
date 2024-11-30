import { useEffect, useState } from "react";
import { getUsersMe } from "@/api/swagger/User";
import { ArticlesDetailData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/id/IdCard.module.scss";
import LikeCount from "../LikeCount";
import DeleteArticle from "./DeleteButton";
import ArticleImage from "../ArticleImage";

const IdCard = ({
  id,
  title,
  content,
  image,
  writer,
  likeCount,
  updatedAt,
  onEdit,
}: ArticlesDetailData & { onEdit: () => void }) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = await getUsersMe();
      if (currentUser) {
        setCurrentUserId(currentUser.id);
      }
    };
    fetchUserData();
  }, []);

  const isEditable = currentUserId === writer.id;

  return (
    <div className={styles.articleContain}>
      <div className={styles.innerContain}>
        <div className={styles.innerInfo}>
          <div className={styles.innerInfo1}>
            <div className={styles.contentTitle}>{title}</div>
            <div className={styles.buttonContain}>
              {isEditable && (
                <button className={styles.editButton} onClick={onEdit}>
                  수정하기
                </button>
              )}
              {isEditable && <DeleteArticle articleId={id} />}
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
