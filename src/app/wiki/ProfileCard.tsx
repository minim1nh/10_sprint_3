"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/wiki/ProfileCard.module.scss";

interface Profile {
  image: string;
  city: string;
  mbti: string;
  job: string;
  birthday: string;
  bloodType: string;
  nationality: string;
  sns: string;
}

interface ProfileCardProps {
  code: string;
}

export default function ProfileCard({ code }: ProfileCardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const teamId = "10-3";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}`;
        const res = await axios.get(URL, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200 || res.status === 201) {
          setProfile(res.data);
          setError(null);
        } else {
          throw new Error(`Failed to fetch profile data: ${res.status}`);
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError(
            "프로필 데이터를 찾을 수 없습니다. 올바른 코드를 입력하세요."
          );
        } else {
          setError("프로필 데이터를 불러오는 중 오류가 발생했습니다.");
        }
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }

    if (code) fetchProfile();
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={profile.image} className={styles.image} alt="Profile" />
      </div>
      <div className={styles.card}>
        <div className={styles.infoRow}>
          <span className={styles.label}>거주 도시:</span>
          <span className={styles.value}>{profile.city}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>MBTI:</span>
          <span className={styles.value}>{profile.mbti}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>직업:</span>
          <span className={styles.value}>{profile.job}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>SNS 계정:</span>
          <span className={styles.value}>
            <a href={profile.sns} target="_blank" rel="noopener noreferrer">
              {profile.sns}
            </a>
          </span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>생일:</span>
          <span className={styles.value}>{profile.birthday}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>혈액형:</span>
          <span className={styles.value}>{profile.bloodType}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>국적:</span>
          <span className={styles.value}>{profile.nationality}</span>
        </div>
      </div>
    </div>
  );
}
