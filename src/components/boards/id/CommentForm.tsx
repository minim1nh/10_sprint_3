"use client";

import { useState } from "react";
import { postComments } from "@/api/swagger/Comment";
import styles from "@/styles/boards/id/CommentForm.module.scss";

interface CommentFormProps {
  articleId: number;
  onCommentAdded: () => void;
}

const CommentForm = ({ articleId, onCommentAdded }: CommentFormProps) => {
  const [content, setContent] = useState<string>("");

  const handleCommentSubmit = async () => {
    if (content.trim()) {
      const response = await postComments(articleId, { content });
      if (response) {
        setContent("");
        onCommentAdded();
      }
    }
  };

  return (
    <div className={styles.commentForm}>
      <textarea
        className={styles.textarea}
        placeholder="댓글을 입력하세요..."
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
  );
};

export default CommentForm;
