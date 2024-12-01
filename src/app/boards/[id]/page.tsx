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

  const fetchData = async () => {
    if (!id) return;

    const fetchArticle = getArticlesId(parseInt(id, 10));
    const fetchComments = getComments(parseInt(id, 10), 10, 0);

    const [articleData, commentsData] = await Promise.all([
      fetchArticle,
      fetchComments,
    ]);

    if (articleData) setArticle(articleData);
    if (commentsData) setCommentsData(commentsData);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleArticleUpdateSuccess = () => {
    fetchData();
    setIsEditing(false);
  };

  const handleCommentEditSuccess = () => {
    fetchData();
  };

  if (!article) {
    return <div></div>;
  }

  const commentsCount = commentsData?.list.length || 0;

  return (
    <div className={styles.articleContainer}>
      {isEditing ? (
        <FixCard
          articleId={parseInt(id, 10)}
          onCancel={handleEditToggle}
          onSuccess={handleArticleUpdateSuccess}
        />
      ) : (
        <IdCard {...article} onEdit={handleEditToggle} />
      )}
      <BoardButton />
      <CommentForm
        articleId={parseInt(id, 10)}
        onSuccess={fetchData}
        count={commentsCount}
      />
      {commentsData ? (
        <CoCard
          comments={commentsData.list}
          onCommentEditSuccess={handleCommentEditSuccess}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
