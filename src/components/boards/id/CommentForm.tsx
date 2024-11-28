"use client";

import { useState } from "react";
import { postComments } from "@/api/swagger/Comment";
import styles from "@/styles/boards/id/CommentForm.module.scss";

interface CommentFormProps {
  articleId: number;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  articleId,
  onCommentAdded,
}) => {
  const [content, setContent] = useState<string>("");

  const handleCommentSubmit = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    try {
      const response = await postComments(articleId, { content });
      if (response) {
        setContent("");
        onCommentAdded();
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.articleContain}>
      <div className={styles.commentForm}>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={styles.submitButton}
          onClick={handleCommentSubmit}
          disabled={!content.trim()}
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
