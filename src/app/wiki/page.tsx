"use client";

import React, { useEffect, useState, useRef } from "react";
import { getProfilesCode, patchProfilesCode } from "@/api/swagger/Profile";
import ProfileCard from "@/components/wiki/ProfileCard";
import styles from "@/styles/wiki/style.module.scss";
import StartButton from "@/components/wiki/StartButton";
import ParticipateButton from "@/components/wiki/ParicipateButton";
import dynamic from "next/dynamic";
import SnackbarNotification from "@/components/wiki/SnackbarNotification";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// TinyMCE 동적 로드
const Editor = dynamic(
  () =>
    import("@tinymce/tinymce-react").then((mod) => mod.Editor) as Promise<
      React.FC<{
        apiKey: string;
        value: string;
        onEditorChange: (content: string) => void;
        init: {
          height: number;
          plugins: string;
          toolbar: string;
        };
      }>
    >,
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
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code") ?? "";

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
      } catch {
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
  }, []);

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
    if (!profile?.code || !newContent.trim()) {
      setError("수정 내용을 입력하세요.");
      return;
    }

    try {
      await patchProfilesCode(profile.code, { content: newContent });
      const updatedProfile = await getProfilesCode(profile.code);
      setProfile(updatedProfile);
      setIsEditable(false);
      setSnackbarMessage("내용 수정이 완료되었습니다.");
      setSnackbarOpen(true);
    } catch {
      setError("내용 저장 중 오류가 발생했습니다.");
    }
  };

  const handleParticipate = () => {
    setIsEditable(true);
  };

  const handleStartSuccess = () => {
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
  }/wiki?code=${profile.code}`;

  return (
    <div className={styles.container}>
      <div className={styles.profileContent}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{profile.name}</h1>
            {!isEditable && profile.content && (
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
                <StartButton onCorrectAnswer={handleStartSuccess} />
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
          code={profile.code}
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
        <Dialog
          open={showAlert}
          onClose={() => setShowAlert(false)}
          PaperProps={{
            style: {
              width: "400px",
              padding: "20px 0px",
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle
            style={{
              fontSize: "18px",
              whiteSpace: "nowrap",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            5분 이상 글을 쓰지 않아 접속이 끊어졌어요.
          </DialogTitle>
          <DialogContent style={{ textAlign: "center" }}>
            위키 참여하기를 통해 다시 위키를 수정해 주세요.
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#4CBFA4",
                color: "#fff",
                borderRadius: "10px",
              }}
              onClick={() => setShowAlert(false)}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
      />
    </div>
  );
}
