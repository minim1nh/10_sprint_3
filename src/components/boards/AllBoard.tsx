"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ArticleList from "./ArticleList";
import { getArticles } from "@/api/swagger/Article";
import { ArticlesData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/AllBoard.module.scss";

const AllBoards = () => {
  const [articles, setArticles] = useState<ArticlesData[]>([]);

  const handleLoad = useCallback(async (pageSize: number) => {
    try {
      const response = await getArticles(5, pageSize, "", "");
      const list = response.list || [];
      setArticles(list);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    }
  }, []);

  useEffect(() => {
    handleLoad(100);
  }, [handleLoad]);

  return (
    <section className={styles.wrapper}>
      <p>번호</p>
      <p>제목</p>
      <p>작성자</p>
      <p>좋아요</p>
      <p>날짜</p>
      <div className={styles.container}>
        {articles.map((article: ArticlesData) => (
          <Link key={article.id} href={`/boards/${article.id}`}>
            <ArticleList {...article} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllBoards;
