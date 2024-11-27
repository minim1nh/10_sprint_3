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

  // 게시글 데이터 가져오기
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

  // 댓글 데이터 가져오기
  useEffect(() => {
    if (id) {
      const fetchCommentsData = async () => {
        const commentData = await getComments(parseInt(id, 10), 10, 0);
        setCommentsData(commentData);
      };

      fetchCommentsData();
    }
  }, [id]);

  // 댓글 추가 후 댓글 목록 갱신
  const handleCommentAdded = async () => {
    if (id) {
      const updatedComments = await getComments(parseInt(id, 10), 10, 0);
      setCommentsData(updatedComments); // 댓글 갱신
    }
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
