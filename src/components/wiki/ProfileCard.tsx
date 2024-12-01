"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // useRouter 사용
import styles from "@/styles/wiki/ProfileCard.module.scss";
import { patchProfilesCode } from "@/api/swagger/Profile";

interface Profile {
  image: string;
  city: string;
  mbti: string;
  job: string;
  birthday: string;
  bloodType: string;
  nationality: string;
  sns: string;
  nickname: string;
}

interface ProfileCardProps {
  code: string;
  isEditable: boolean;
  setEditable: (isEditable: boolean) => void;
  onSave: (updatedProfile: Partial<Profile>) => void;
}

export default function ProfileCard({
  code,
  isEditable,
  setEditable,
  onSave,
}: ProfileCardProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // useRouter 훅 추가

  const teamId = "10-3";

  const fields: { label: string; field: keyof Profile }[] = [
    { label: "거주 도시", field: "city" },
    { label: "MBTI", field: "mbti" },
    { label: "직업", field: "job" },
    { label: "SNS 계정", field: "sns" },
    { label: "생일", field: "birthday" },
    { label: "별명", field: "nickname" },
    { label: "혈액형", field: "bloodType" },
    { label: "국적", field: "nationality" },
  ];

  const fetchProfile = async () => {
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
        setEditedProfile(res.data);
      } else {
        throw new Error(`Failed to fetch profile data: ${res.status}`);
      }
    } catch (err: any) {
      setError("프로필 데이터를 불러오는 중 오류가 발생했습니다.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Profile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (editedProfile) {
      try {
        await patchProfilesCode(code, editedProfile);
        onSave(editedProfile);
        setEditable(false);

        // 저장 후 리다이렉트
        window.location.reload();
      } catch (error) {
        console.error("프로필 저장 중 오류 발생:", error);
        alert("프로필 저장에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (code) fetchProfile();
  }, [code]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isEditable ? (
          <input
            type="text"
            value={editedProfile?.image || ""}
            onChange={(e) => handleInputChange("image", e.target.value)}
            placeholder="이미지 URL 입력"
            className={styles.imageInput}
          />
        ) : (
          <img src={profile.image} className={styles.image} alt="Profile" />
        )}
      </div>
      <div className={styles.card}>
        {fields.map(({ label, field }) => (
          <div className={styles.infoRow} key={field}>
            <span className={styles.label}>{label}:</span>
            {isEditable ? (
              <input
                type="text"
                value={editedProfile?.[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`${label} 입력`}
                className={styles.input}
              />
            ) : (
              <span className={styles.value}>{profile[field] || "없음"}</span>
            )}
          </div>
        ))}
      </div>
      {isEditable && (
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            저장
          </button>
        </div>
      )}
    </div>
  );
}
