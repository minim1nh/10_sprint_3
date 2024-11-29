"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/boards/best/LikeCount.module.scss";
import {
  postArticlesIdLike,
  deleteArticlesIdLike,
  getArticlesId,
} from "@/api/swagger/Article";

interface LikeCountProps {
  articleId: number;
  likeCount: number;
  className?: string;
}

const LikeCount = ({
  articleId,
  likeCount: initialLikeCount,
}: LikeCountProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLikeStatus = async () => {
    try {
      const response = await getArticlesId(articleId);
      if (response && response.isLiked !== undefined) {
        setLiked(response.isLiked);
      }
    } catch (error) {
      console.error("Error fetching like status:", error);
    }
  };

  useEffect(() => {
    setLikeCount(initialLikeCount);
    fetchLikeStatus();
  }, [initialLikeCount]);

  const handleLikeClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      let resData;
      if (liked) {
        resData = await deleteArticlesIdLike(articleId);
        setLiked(false);
      } else {
        resData = await postArticlesIdLike(articleId);
        setLiked(true);
      }

      if (resData && resData.likeCount !== undefined) {
        setLikeCount(resData.likeCount);
      } else {
        console.error("Invalid response data:", resData);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.likeContain}>
      <button
        className={`${styles.likeIcon} ${liked ? styles.liked : ""}`}
        onClick={handleLikeClick}
        disabled={isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          className={styles.likeButton}
          fill={liked ? "red" : "gray"}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className={styles.likeNumber}>
          {likeCount > 10000 ? "9999+" : likeCount}
        </span>
      </button>
    </div>
  );
};

export default LikeCount;
