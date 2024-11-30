"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { postArticles } from "@/api/swagger/Article";
import { ArticlesProps } from "@/api/swagger/Wikid.types";
import styles from "@/styles/addboard/ArticleAdd.module.scss";
import { ImageInsertModal } from "@/components/common/WikidImage";
import Link from "next/link";

const ArticleForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}.`;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (title && content && imageUrl) {
      try {
        const articleData: ArticlesProps = {
          title,
          content,
          image: imageUrl,
        };
        await postArticles(0, articleData);
        alert("게시글이 등록되었습니다.");
      } catch (error) {
        console.error("게시글 등록 실패", error);
      }
    }
  };

  const isFormValid = title && content && imageUrl;

  const handleImageDelete = () => {
    setImageUrl(null);
    setIsModalOpen(true); // 이미지 삭제 후 모달을 다시 여는 부분
  };

  return (
    <div className={styles.articleForm}>
      <div className={styles.formGroup}>
        <div className={styles.topContain}>
          <h6 className={styles.titleName}>게시물 등록하기</h6>
          <div className={styles.buttonContain}>
            <Link href="/boards">
              <button
                className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ""}`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                등록하기
              </button>
            </Link>
            <Link href="/boards">
              <button className={styles.submitButton}>뒤로가기</button>
            </Link>
          </div>
        </div>
        <span className={styles.date}>{getCurrentDate()}</span>
        <input
          className={styles.titleForm}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={content}
          className={styles.contentForm}
          onChange={handleContentChange}
          placeholder="본문을 입력해주세요"
        />

        {imageUrl && (
          <div className={styles.imagePreview}>
            <h6>등록된 이미지</h6>
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                width={302}
                height={268}
                alt="Uploaded Image"
              />
              {/* X 버튼 추가 */}
              <button
                className={styles.deleteImageButton}
                onClick={handleImageDelete}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.submitButton}
        >
          이미지 선택
        </button>
      </div>

      {isModalOpen && (
        <ImageInsertModal
          onClose={(url: string) => {
            setImageUrl(url);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ArticleForm;
