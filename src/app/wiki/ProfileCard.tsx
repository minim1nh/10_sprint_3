"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/wiki/ProfileCard.module.scss";

interface Profile {
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthdate: string;
  bloodType: string;
  nationality: string;
}

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          "https://wikied-api.vercel.app/{teamId}/profiles"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        const data = await response.json();

        const formattedData: Profile = {
          image: data.image || "/default-avatar.png",
          city: data.city,
          mbti: data.mbti,
          job: data.job,
          sns: data.sns,
          birthdate: data.birthday,
          bloodType: data.bloodType,
          nationality: data.nationality,
        };
        setProfile(formattedData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={profile.image} className={styles.image} />
        <h1 className={styles.name}></h1>
      </div>
      <div className={styles.card}>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span className={styles.label}>거주 도시</span>
            <span className={styles.value}>{profile.city}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>MBTI</span>
            <span className={styles.value}>{profile.mbti}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>직업</span>
            <span className={styles.value}>{profile.job}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>SNS 계정</span>
            <span className={styles.value}>{profile.sns}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>생일</span>
            <span className={styles.value}>{profile.birthdate}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>혈액형</span>
            <span className={styles.value}>{profile.bloodType}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>국적</span>
            <span className={styles.value}>{profile.nationality}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
