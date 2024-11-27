"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/wililist/WikiList.module.scss";
import { getProfiles } from "@/api/swagger/Profile";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

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
            data.list.map((profile: any) => ({
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
      } catch (err: any) {
        setError(err.message || "데이터를 가져오는 중 오류가 발생했습니다.");
        setProfiles([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchProfiles();
  }, [page, searchName]);

  // 특정 위키 페이지로 이동
  const handleCardClick = (profileCode: string) => {
    router.push(`/wiki?code=${profileCode}`);
  };

  if (loading) return <div>Loading...</div>;
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

      {/* 검색 결과 */}
      <ul className={styles.list}>
        {profiles.map((profile) => (
          <li
            key={profile.id}
            className={styles.card}
            onClick={() => handleCardClick(profile.code)}
          >
            <div className={styles.cardContent}>
              <img
                src={profile.image}
                alt={`${profile.name}의 아바타`}
                className={styles.avatar}
              />
              <div className={styles.info}>
                <h2>{profile.name}</h2>
                <p>도시: {profile.city}</p>
                <p>직업: {profile.job}</p>
                <p>국적: {profile.nationality}</p>
              </div>
            </div>
          </li>
        ))}
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
    </div>
  );
}
