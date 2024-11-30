"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/boards/id/CoCard.module.scss";
import { CommentsListData } from "@/api/swagger/Wikid.types";
import DeleteComments from "@/components/boards/id/CommentDel";
import EditComments from "@/components/boards/id/CommentEdit";
import { getUsersMe } from "@/api/swagger/User";

type CoCardProps = {
  comments: CommentsListData["list"];
  onCommentEditSuccess: (
    updatedComment: CommentsListData["list"][number]
  ) => void;
};

const CoCard = ({ comments, onCommentEditSuccess }: CoCardProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [updatedComments, setUpdatedComments] = useState(comments);
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

  const handleEditSuccess = (commentId: number, updatedContent: string) => {
    const updatedComment = updatedComments.find(
      (comment) => comment.id === commentId
    );
    if (updatedComment) {
      const updatedCommentData = { ...updatedComment, content: updatedContent };
      onCommentEditSuccess(updatedCommentData);
    }
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
                  {currentUserId === comment.writer.id &&
                    editingCommentId !== comment.id && (
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
