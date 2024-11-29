"use client";
import { useState } from "react";
import { postArticles } from "@/api/swagger/Article";
import { postImagesUpload } from "@/api/swagger/Image";
import { ArticlesProps } from "@/api/swagger/Wikid.types";
import styles from "@/styles/addboard/ArticleAdd.module.scss";

const ArticleForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageConfirmed, setIsImageConfirmed] = useState<boolean>(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}.`;
  };

  const calculateCharacterCount = (text: string) => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;
    return { withSpaces, withoutSpaces };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      setIsImageConfirmed(false);
    }
  };

  const handleImageConfirm = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", image);
        const res = await postImagesUpload({ file: image });
        if (res) {
          setImageUrl(res.url);
          setIsImageConfirmed(true);
        }
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    }
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

  const isFormValid = title && content && imageUrl && isImageConfirmed;

  const { withSpaces, withoutSpaces } = calculateCharacterCount(content);

  return (
    <div className={styles.articleForm}>
      <div className={styles.formGroup}>
        <div className={styles.topContain}>
          <h6 className={styles.titleName}>게시물 등록하기</h6>

          <button
            className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ""}`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            등록하기
          </button>
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
        <p className={styles.characterCount}>
          공백 포함: 총 {withSpaces}자 | 공백제외: 총 {withoutSpaces}자
        </p>
        <input
          type="text"
          value={content}
          className={styles.contentForm}
          onChange={handleContentChange}
          placeholder="본문을 입력해주세요"
        />
      </div>

      <div className={styles.formGroup}>
        <label>이미지 업로드</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageUrl && !isImageConfirmed && (
          <div className={styles.previewContainer}>
            <img
              src={imageUrl}
              alt="미리보기"
              className={styles.previewImage}
            />
            <button
              className={styles.confirmButton}
              onClick={handleImageConfirm}
            >
              확인
            </button>
          </div>
        )}
        {imageUrl && isImageConfirmed && (
          <div className={styles.imageConfirmed}>
            <p>이미지 업로드 완료!</p>
            <img
              src={imageUrl}
              alt="업로드된 이미지"
              className={styles.confirmedImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleForm;
