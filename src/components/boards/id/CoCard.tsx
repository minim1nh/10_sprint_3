import { useState } from "react";
import { CommentsListData } from "@/api/swagger/Wikid.types";
import DeleteComments from "@/components/boards/id/CommentDel";
import Image from "next/image";
import styles from "@/styles/boards/id/CoCard.module.scss";

type CoCardProps = CommentsListData;

const CoCard = ({ list }: CoCardProps) => {
  const [comments, setComments] = useState(list);

  const handleCommentDelete = (deletedCommentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId)
    );
  };

  return (
    <div className={styles.articleContain}>
      <div className={styles.insideContain}>
        {comments.map((comment) => (
          <div key={`${comment.id}`} className={styles.innerContain}>
            <div className={styles.photoInfo}>
              <Image
                src={comment.writer.image || "/images/icon/ic_profile.svg"}
                className={styles.image}
                alt="Profile Image"
                width={50}
                height={50}
              />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.topInfo}>
                <p className={styles.name}>{comment.writer.name}</p>
                <div className={styles.iconContain}>
                  <Image
                    src="/images/icon/ic_edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                  <DeleteComments
                    commentId={comment.id}
                    onDelete={() => handleCommentDelete(comment.id)}
                  />
                </div>
              </div>
              <div className={styles.contentContain}>
                <p className={styles.content}>{comment.content}</p>
              </div>
              <p className={styles.updatedAt}>
                {comment.updatedAt.slice(0, 10)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoCard;
