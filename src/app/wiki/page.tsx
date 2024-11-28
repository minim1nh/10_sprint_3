"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProfilesCode, patchProfilesCode } from "@/api/swagger/Profile";
import ProfileCard from "@/app/wiki/ProfileCard";
import styles from "@/styles/wiki/style.module.scss";
import ParticipateButton from "@/app/wiki/ParticipateButton";
import dynamic from "next/dynamic";
import Image from "next/image";

// TinyMCE 동적 로드
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
  }
);

interface Profile {
  name: string;
  content?: string;
  code: string;
}

export default function WikiPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isProfileEditable, setIsProfileEditable] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>("");

  useEffect(() => {
    if (!code) {
      setError("URL에서 프로필 코드를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      try {
        const data = await getProfilesCode(code);
        setProfile(data);
        setNewContent(data.content || "");
        setError(null);
      } catch (err) {
        console.error("프로필 데이터를 불러오는 중 오류가 발생했습니다:", err);
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
      await patchProfilesCode(code, { content: newContent });
      const updatedProfile = await getProfilesCode(code);
      setProfile(updatedProfile);
      setIsEditable(false);
      setError(null);
    } catch (err) {
      console.error("내용 저장 중 오류가 발생했습니다:", err);
      setError("내용 저장 중 오류가 발생했습니다.");
    }
  };

  const toggleProfileEdit = () => {
    setIsProfileEditable((prev) => !prev);
  };

  if (loading) return <div>Loading...</div>;
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
              <ParticipateButton onCorrectAnswer={() => setIsEditable(true)} />
            )}
          </div>
        </header>

        <div className={styles.link}>
          {/* Next.js Image 컴포넌트로 수정 */}
          <Image
            src="/images/icon/ic_link.svg"
            alt="Link Icon"
            className={styles.linkIcon}
            width={24}
            height={24}
          />
          <a href={currentUrl} target="_blank" rel="noopener noreferrer">
            {currentUrl}
          </a>
        </div>

        <div className={styles.content}>
          {!isEditable ? (
            profile.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    profile.content || "<p>아직 작성된 내용이 없습니다.</p>",
                }}
              />
            ) : (
              <p>아직 작성된 내용이 없습니다.</p>
            )
          ) : (
            <div>
              <Editor
                apiKey="elv4un103qy5smg6mvj731h6s50h30t4nphiry7beamg1u93"
                value={newContent}
                init={{
                  inline: false,
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
                }}
                onEditorChange={(content) => setNewContent(content)}
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
        {code && (
          <ProfileCard
            code={code}
            isEditable={isProfileEditable}
            onToggleEdit={toggleProfileEdit}
          />
        )}
      </div>
    </div>
  );
}
