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
    if (e.target.value.length <= 30) {
      setTitle(e.target.value);
    }
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

  const getContentLength = () => {
    const lengthWithSpaces = content.length;
    const lengthWithoutSpaces = content.replace(/\s/g, "").length;
    return { lengthWithSpaces, lengthWithoutSpaces };
  };

  const isFormValid = title && content && imageUrl;

  const handleImageDelete = () => {
    setImageUrl(null);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.articleForm}>
      <div className={styles.topContain}>
        <div className={styles.topContain1}>
          <h6 className={styles.titleName}>게시물 등록하기</h6>
          <div className={styles.littleContain}>
            <p className={styles.date}>등록일</p>
            <span className={styles.date}>{getCurrentDate()}</span>
          </div>
        </div>
        <div className={styles.buttonContain}>
          <Link href="/boards">
            <button className={styles.submitButton1}>목록으로</button>
          </Link>
          <Link href="/boards">
            <button
              className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ""}`}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              등록하기
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.titleContainer}>
        <input
          className={styles.titleForm}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요"
        />
        <span className={styles.charCount}>{title.length}/30</span>
      </div>
      <p className={styles.textCount}>
        공백 포함: {getContentLength().lengthWithSpaces}자 | 공백 제외:{" "}
        {getContentLength().lengthWithoutSpaces}자
      </p>
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
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                width={200}
                height={190}
                alt="Uploaded Image"
              />
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
        <div className={styles.lastButton}>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.submitButton}
          >
            이미지 선택
          </button>
        </div>
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
