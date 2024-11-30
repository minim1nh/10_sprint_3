"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { getProfilesCode, patchProfilesCode } from "@/api/swagger/Profile";
import ProfileCard from "@/components/wiki/ProfileCard";
import styles from "@/styles/wiki/style.module.scss";
import ParticipateButton from "@/components/wiki/ParicipateButton";
import dynamic from "next/dynamic";
import SnackbarNotification from "@/components/wiki/SnackbarNotification";

// TinyMCE 동적 로드
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor as any),
  {
    ssr: false,
  }
);

interface Profile {
  name: string;
  content?: string;
  code: string;
  city?: string;
  mbti?: string;
  job?: string;
  sns?: string;
  birthday?: string;
  nickname?: string;
  bloodType?: string;
  nationality?: string;
}

export default function WikiPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>("");

  // 알림 상태
  const [showAlert, setShowAlert] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 스낵바 상태
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // 타이머 초기화 함수
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowAlert(true);
      setIsEditable(false);
    }, 300000);
  };

  useEffect(() => {
    if (!code) {
      setError("URL에서 프로필 코드를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const data = await getProfilesCode(code);
        if (data) {
          setProfile(data);
          setNewContent(data.content || "");
          setError(null);
        } else {
          setError("프로필 데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("프로필 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [code]);

  useEffect(() => {
    if (isEditable) {
      resetTimer();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [isEditable]);

  const handleSave = async () => {
    if (!code || !newContent.trim()) {
      setError("수정 내용을 입력하세요.");
      return;
    }

    try {
      await patchProfilesCode(code, { content: newContent } as any);
      const updatedProfile = await getProfilesCode(code);
      setProfile(updatedProfile);
      setIsEditable(false);
      setSnackbarMessage("내용 수정이 완료되었습니다.");
      setSnackbarOpen(true);
    } catch (err) {
      setError("내용 저장 중 오류가 발생했습니다.");
    }
  };

  const handleParticipate = () => {
    setIsEditable(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditorChange = (content: string) => {
    setNewContent(content);
    setShowAlert(false);
    resetTimer();
  };

  if (loading) {
    return null;
  }

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>프로필 데이터가 없습니다.</div>;

  const currentUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/wiki?code=${code}`;

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{profile.name}</h1>
            {!isEditable && (
              <ParticipateButton onCorrectAnswer={handleParticipate} />
            )}
          </div>
        </header>

        <div className={styles.link}>
          <span
            onClick={() => {
              navigator.clipboard.writeText(currentUrl);
              setSnackbarMessage("링크가 복사되었습니다.");
              setSnackbarOpen(true);
            }}
            className={styles.copyLink}
          >
            {currentUrl}
          </span>
        </div>

        <div className={styles.content}>
          {!isEditable ? (
            profile.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: profile.content,
                }}
              />
            ) : (
              <div className={styles.emptyContent}>
                <p className={styles.emptyMessage}>
                  아직 작성된 내용이 없네요. <br />
                  위키에 참여해 보세요!
                </p>
              </div>
            )
          ) : (
            <div>
              <Editor
                apiKey="elv4un103qy5smg6mvj731h6s50h30t4nphiry7beamg1u93"
                value={newContent || ""}
                init={{
                  height: 500,
                  plugins: "advlist autolink link lists ",
                  toolbar: "undo redo | bold italic | link",
                }}
                onEditorChange={handleEditorChange}
              />

              <div className={styles.actions}>
                <button className={styles.saveButton} onClick={handleSave}>
                  저장
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsEditable(false)}
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.profileCard}>
        <ProfileCard
          code={code}
          isEditable={isEditable}
          setEditable={setIsEditable}
          onSave={(updatedProfile: Partial<Profile>) => {
            setProfile((prev) => ({
              ...prev!,
              ...updatedProfile,
            }));
          }}
        />
      </div>

      {showAlert && (
        <div className={styles.alertBox}>
          <p>5분 동안 입력이 없습니다. 위키 페이지로 돌아갑니다.</p>
        </div>
      )}

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
