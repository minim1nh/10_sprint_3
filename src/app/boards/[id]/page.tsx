"use client";

import { useEffect, useState } from "react";
import { getArticlesId } from "@/components/boards/Article";
import { getComments } from "@/api/swagger/Comment";
import {
  ArticlesDetailData,
  CommentsListData,
} from "@/api/swagger/Wikid.types";
import IdCard from "@/components/boards/id/IdCard";
import CoCard from "@/components/boards/id/CoCard";
import BoardButton from "@/components/boards/id/BoardButton";
import CommentForm from "@/components/boards/id/CommentForm";
import styles from "@/styles/boards/ArticleId.module.scss";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<ArticlesDetailData | null>(null);
  const [commentsData, setCommentsData] = useState<CommentsListData | null>(
    null
  );

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

  const handleCommentAdded = () => {
    fetchCommentsData();
  };

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div className={styles.articleContainer}>
        <IdCard {...article} />
        <BoardButton />
        <CommentForm
          articleId={parseInt(id, 10)}
          onCommentAdded={handleCommentAdded}
        />
        {commentsData ? (
          <CoCard {...commentsData} />
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
