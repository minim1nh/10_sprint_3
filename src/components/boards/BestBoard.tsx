"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import { getArticles } from "@/api/swagger/Article";
import { ArticlesData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/BestBoard.module.scss";

const BestBoards = () => {
  const [articles, setArticles] = useState<ArticlesData[]>([]);

  const handleLoad = useCallback(async (pageSize: number) => {
    try {
      const response = await getArticles(1, pageSize, "like", "");
      const list = response.list || [];
      setArticles(list);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    }
  }, []);

  useEffect(() => {
    handleLoad(4);
  }, [handleLoad]);

  return (
    <section className={styles.wrapper}>
      <h2>베스트 게시글</h2>
      <div className={styles.container}>
        {articles.map((article: ArticlesData) => (
          <Link key={article.id} href={`/boards/${article.id}`}>
            <ArticleCard {...article} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestBoards;
