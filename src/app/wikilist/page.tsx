"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/wililist/WikiList.module.scss";
import { getProfiles } from "@/api/swagger/Profile";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Profile {
  id: number;
  code: string;
  image: string;
  city: string;
  nationality: string;
  job: string;
  updatedAt: string;
  name: string;
}

export default function WikiListPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://dev.d1a7dyil86c78d.amplifyapp.com";

  // 검색어 상태 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchName(inputValue.trim());
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // 데이터 fetch
  useEffect(() => {
    async function fetchProfiles() {
      try {
        setLoading(true);
        const data = await getProfiles(page, pageSize, searchName);

        if (data && data.list) {
          setProfiles(
            data.list.map((profile) => ({
              id: profile.id,
              code: profile.code,
              image: profile.image,
              city: profile.city,
              nationality: profile.nationality,
              job: profile.job,
              updatedAt: profile.updatedAt,
              name: profile.name,
            }))
          );
          setTotalPages(Math.ceil(data.totalCount / pageSize));
        } else {
          setProfiles([]);
          setTotalPages(1);
        }
        setError(null);
      } catch {
        setProfiles([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [page, searchName]);

  const handleCardClick = (profileCode: string) => {
    router.push(`/wiki?code=${profileCode}`);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      {/* 검색창 */}
      <div className={styles.search}>
        <div className={styles.searchWrapper}>
          <img
            src="/images/icon/ic_search.svg"
            alt="검색"
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="이름으로 검색"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 검색 결과 텍스트 */}
      {searchName && profiles.length > 0 && (
        <p className={styles.searchResultText}>
          {searchName}님을 총 {profiles.length}명 찾았습니다.
        </p>
      )}
      {searchName && profiles.length === 0 && (
        <p className={styles.searchResultText}>
          {searchName}님을 찾을 수 없습니다.
        </p>
      )}

      {/* 검색 결과 */}
      <ul className={styles.list}>
        {profiles.map(({ id, code, image, city, job, nationality, name }) => {
          const currentUrl = `${BASE_URL}/wiki?code=${code}`;

          return (
            <li
              key={id}
              className={styles.card}
              onClick={() => handleCardClick(code)}
            >
              <div className={styles.cardContent}>
                <img
                  src={image || "/images/icon/ic_profile.svg"}
                  alt={"Profile Image"}
                  className={styles.avatar}
                />
                <div className={styles.info}>
                  <h2>{name}</h2>
                  <p>도시: {city}</p>
                  <p>직업: {job}</p>
                  <p>국적: {nationality}</p>
                </div>
                {/* 링크 추가 */}
                <div
                  className={styles.linkContainer}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(currentUrl);
                    setSnackbarMessage("링크가 복사되었습니다.");
                    setSnackbarOpen(true);
                  }}
                >
                  <span className={styles.linkText}>
                    {currentUrl.length > 30
                      ? `${currentUrl.slice(0, 30)}`
                      : currentUrl}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.pageButton}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`${styles.pageButton} ${
              pageNum === page ? styles.activePage : ""
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.pageButton}
        >
          &gt;
        </button>
      </div>

      {/* 스낵바 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
