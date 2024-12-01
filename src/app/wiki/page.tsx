"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProfilesCode, patchProfilesCode } from "@/api/swagger/Profile";
import ProfileCard from "@/components/wiki/ProfileCard";
import styles from "@/styles/wiki/style.module.scss";
import ParticipateButton from "@/components/wiki/ParicipateButton";
import dynamic from "next/dynamic";
import SnackbarNotification from "@/components/wiki/SnackbarNotification";

// TinyMCE 동적 로드
const Editor = dynamic(
  () =>
    import("@tinymce/tinymce-react").then((mod) => mod.Editor) as Promise<
      React.ComponentType<any>
    >,
  { ssr: false }
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
      } catch {
        setError("프로필 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [code]);

  const handleSave = async () => {
    if (!code || !newContent.trim()) {
      setError("수정 내용을 입력하세요.");
      return;
    }

    try {
      await patchProfilesCode(code, {
        content: newContent,
        securityAnswer: "",
        securityQuestion: "",
        nationality: "",
        family: "",
      });

      const updatedProfile = await getProfilesCode(code);
      setProfile(updatedProfile);
      setIsEditable(false);
      setSnackbarMessage("내용 수정이 완료되었습니다.");
      setSnackbarOpen(true);
    } catch {
      setError("내용 저장 중 오류가 발생했습니다.");
    }
  };

  const handleEditorChange = (content: string) => {
    setNewContent(content);
  };

  if (loading) return null;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>프로필 데이터가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{profile.name}</h1>
        {!isEditable && (
          <ParticipateButton onCorrectAnswer={() => setIsEditable(true)} />
        )}
      </header>

      <div className={styles.content}>
        {!isEditable ? (
          <div dangerouslySetInnerHTML={{ __html: profile.content || "" }} />
        ) : (
          <Editor
            apiKey="your-api-key"
            value={newContent}
            init={{
              height: 500,
              plugins: "advlist autolink link lists ",
              toolbar: "undo redo | bold italic | link",
            }}
            onEditorChange={handleEditorChange}
          />
        )}
      </div>

      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
}
