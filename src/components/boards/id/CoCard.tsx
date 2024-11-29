"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/boards/id/CoCard.module.scss";
import { CommentsListData } from "@/api/swagger/Wikid.types";
import DeleteComments from "@/components/boards/id/CommentDel";
import EditComments from "@/components/boards/id/CommentEdit";

type CoCardProps = {
  comments: CommentsListData["list"];
};

const CoCard = ({ comments }: CoCardProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [updatedComments, setUpdatedComments] = useState(comments);

  const handleEditSuccess = (commentId: number, updatedContent: string) => {
    setUpdatedComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
    setEditingCommentId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  return (
    <div className={styles.articleContain}>
      <div className={styles.insideContain}>
        {updatedComments.map((comment) => (
          <div key={comment.id} className={styles.innerContain}>
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
                  {editingCommentId !== comment.id && (
                    <>
                      <button
                        onClick={() => setEditingCommentId(comment.id)}
                        className={styles.editButton}
                      >
                        <Image
                          src="/images/icon/ic_edit.svg"
                          alt="edit"
                          width={20}
                          height={20}
                        />
                      </button>
                      <DeleteComments
                        commentId={comment.id}
                        onDelete={() => {
                          setUpdatedComments((prev) =>
                            prev.filter((item) => item.id !== comment.id)
                          );
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className={styles.contentContain}>
                {editingCommentId === comment.id ? (
                  <EditComments
                    commentId={comment.id}
                    currentContent={comment.content}
                    onEditSuccess={(updatedContent) =>
                      handleEditSuccess(comment.id, updatedContent)
                    }
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <p className={styles.content}>{comment.content}</p>
                )}
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
