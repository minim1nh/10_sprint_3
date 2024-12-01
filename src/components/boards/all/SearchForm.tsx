import { useState } from "react";
import Image from "next/image";
import { ArticlesData } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/all/SearchForm.module.scss";

interface SearchFormProps {
  articles: ArticlesData[];
  onSearchResults: (filteredArticles: ArticlesData[]) => void;
}

const SearchForm = ({ articles, onSearchResults }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === "") {
      onSearchResults(articles);
    } else {
      const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      onSearchResults(filteredArticles);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearchResults(articles);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <div className={styles.searchForm}>
      <div className={styles.searchInputWrapper}>
        <Image
          src="/images/icon/ic_search.svg"
          alt="Search Icon"
          className={styles.searchImage}
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="제목을 검색하세요"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>
      <button onClick={handleSearchSubmit} className={styles.searchButton}>
        검색
      </button>
    </div>
  );
};

export default SearchForm;
