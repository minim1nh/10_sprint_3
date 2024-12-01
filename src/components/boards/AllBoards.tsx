"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "./all/PagiNation";
import DropDown from "./all/DropDown";
import ArticleList from "./all/ArticleList";
import { getArticles } from "@/api/swagger/Article";
import { ArticlesData } from "@/api/swagger/Wikid.types";
import SearchForm from "./all/SearchForm";
import styles from "@/styles/boards/all/AllBoards.module.scss";

const PAGE_SIZE = 10;

const AllBoards = () => {
  const [articles, setArticles] = useState<ArticlesData[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticlesData[]>([]);
  const [sort, setSort] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLoad = useCallback(
    async (page: number, pageSize: number, sort: string) => {
      try {
        const response = await getArticles(page, pageSize, sort, "");

        if (!response || !response.list) {
          console.error("No articles data available.");
          setArticles([]);
          setFilteredArticles([]);
          return;
        }

        const list = response.list;

        let sortedArticles: ArticlesData[] = [];

        if (sort === "recent") {
          sortedArticles = list.sort((a, b) => {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          });
        } else if (sort === "like") {
          sortedArticles = list.sort((a, b) => b.likeCount - a.likeCount);
        }

        setArticles(sortedArticles);
        setFilteredArticles(sortedArticles);

        if (response.totalCount !== undefined) {
          const pages = Math.ceil(response.totalCount / pageSize);
          setTotalPages(pages);
        } else {
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
        setFilteredArticles([]);
      }
    },
    []
  );

  const handleSearchResults = (filteredArticles: ArticlesData[]) => {
    setFilteredArticles(filteredArticles);
  };

  useEffect(() => {
    handleLoad(currentPage, PAGE_SIZE, sort);
  }, [handleLoad, currentPage, sort]);

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const calculateRank = (index: number) => {
    return (currentPage - 1) * PAGE_SIZE + (index + 1);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.topBanner}>
        <SearchForm articles={articles} onSearchResults={handleSearchResults} />
        <DropDown value={sort} onChange={handleSortChange} />
      </div>
      <div className={styles.innerInfo}>
        <p className={styles.rank}>번호</p>
        <p className={styles.title}>제목</p>
        <p className={styles.name}>작성자</p>
        <p className={styles.likeCount}>좋아요</p>
        <p className={styles.updatedAt}>날짜</p>
      </div>
      <div className={styles.container}>
        {filteredArticles.map((article, index) => (
          <Link key={article.id} href={`/boards/${article.id}`}>
            <ArticleList {...article} rank={calculateRank(index)} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default AllBoards;
