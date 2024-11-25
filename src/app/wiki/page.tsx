"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProfilesCode } from "@/api/swagger/Profile";
import styles from "@/styles/wiki/style.module.scss";

interface Profile {
  name: string;
  content: string; // 위키 페이지의 본문 내용
}

export default function WikiPage() {
  const { profileCode } = useParams(); // URL의 동적 파라미터 가져오기
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!profileCode) return; // profileCode가 없으면 실행하지 않음

      try {
        const data = await getProfilesCode(profileCode as string); // API 호출
        setProfile({
          name: data.name,
          content: data.content,
        });
        setError(null);
      } catch (err: any) {
        console.error("Error fetching profile data:", err);
        setError("위키 데이터를 불러오는 중 오류가 발생했습니다.");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [profileCode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>위키 데이터가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{profile.name}</h1>
      </header>
      <div className={styles.content}>
        {profile.content ? (
          <div dangerouslySetInnerHTML={{ __html: profile.content }} />
        ) : (
          <p>아직 작성된 내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
