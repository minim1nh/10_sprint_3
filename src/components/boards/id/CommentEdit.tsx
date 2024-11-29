"use client";

import { useState } from "react";
import { patchCommentsId } from "@/api/swagger/Comment";
import styles from "@/styles/boards/id/CommentEdit.module.scss";

interface EditCommentsProps {
  commentId: number;
  currentContent: string;
  onEditSuccess: (updatedContent: string) => void;
  onCancel: () => void;
}

const CommentEdit: React.FC<EditCommentsProps> = ({
  commentId,
  currentContent,
  onEditSuccess,
  onCancel,
}) => {
  const [content, setContent] = useState(currentContent);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditSubmit = async () => {
    if (!content.trim()) {
      alert("수정할 내용을 입력하세요.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedComment = await patchCommentsId(commentId, { content });
      if (updatedComment) {
        onEditSuccess(updatedComment.content);
      }
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.editContainer}>
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
      />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.saveButton}
          onClick={handleEditSubmit}
          disabled={isLoading}
        >
          저장
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CommentEdit;
