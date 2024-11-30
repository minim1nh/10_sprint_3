"use client";

import { useEffect, useState } from "react";
import { getArticlesId } from "@/api/swagger/Article";
import { getComments } from "@/api/swagger/Comment";
import {
  ArticlesDetailData,
  CommentsListData,
} from "@/api/swagger/Wikid.types";
import IdCard from "@/components/boards/id/IdCard";
import CoCard from "@/components/boards/id/CoCard";
import BoardButton from "@/components/boards/id/BoardButton";
import CommentForm from "@/components/boards/id/CommentForm";
import FixCard from "@/components/boards/id/FixCard";
import styles from "@/styles/boards/ArticleId.module.scss";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<ArticlesDetailData | null>(null);
  const [commentsData, setCommentsData] = useState<CommentsListData | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const data = await getArticlesId(parseInt(id, 10));
        if (data) {
          setArticle(data);
        }
      };

      fetchArticle();
    }
  }, [id]);

  const fetchCommentsData = async () => {
    if (!id) return;
    const commentData = await getComments(parseInt(id, 10), 10, 0);
    setCommentsData(commentData);
  };

  useEffect(() => {
    fetchCommentsData();
  }, [id]);

  const handleCommentAdded = (newComment: CommentsListData["list"][number]) => {
    setCommentsData((prevCommentsData) => {
      if (!prevCommentsData) {
        return {
          list: [newComment],
          nextCursor: 0,
        };
      }
      return {
        ...prevCommentsData,
        list: [newComment, ...prevCommentsData.list],
        nextCursor: prevCommentsData.nextCursor,
      };
    });
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  if (!article) {
    return <div></div>;
  }

  const commentsCount = commentsData?.list.length || 0;

  return (
    <>
      <div className={styles.articleContainer}>
        {isEditing ? (
          <FixCard
            articleId={parseInt(id, 10)}
            onCancel={handleEditToggle}
            onSuccess={() => {
              handleEditToggle();
            }}
          />
        ) : (
          <IdCard {...article} onEdit={handleEditToggle} />
        )}
        <BoardButton />
        <CommentForm
          articleId={parseInt(id, 10)}
          onCommentAdded={handleCommentAdded}
          count={commentsCount}
        />
        {commentsData ? <CoCard comments={commentsData.list} /> : <div></div>}
      </div>
    </>
  );
}
