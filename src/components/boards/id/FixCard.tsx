"use client";
import { useState, useEffect } from "react";
import { getArticlesId, patchArticlesId } from "@/api/swagger/Article";
import { postImagesUpload } from "@/api/swagger/Image";
import { ArticlesProps } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/id/FixCard.module.scss";

interface ArticleFormProps {
  articleId: number;
  onCancel: () => void;
  onSuccess: () => void;
}

const FixCard: React.FC<ArticleFormProps> = ({
  articleId,
  onCancel,
  onSuccess,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageConfirmed, setIsImageConfirmed] = useState<boolean>(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const article = await getArticlesId(articleId);
        setTitle(article.title);
        setContent(article.content);
        setImageUrl(article.image || null);
      } catch (error) {
        console.error("게시글 로드 실패:", error);
        alert("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

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
      setIsDeleteConfirmed(false);
    }
  };

  const handleImageConfirm = async () => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", image);
        setIsDeleteConfirmed(true);
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

  const handleImageRemove = () => {
    setImage(null);
    setImageUrl(null);
    setIsImageConfirmed(false);
    setIsDeleteConfirmed(true);
  };

  const handleSubmit = async () => {
    if (title && content && imageUrl) {
      try {
        const articleData: ArticlesProps = {
          title,
          content,
          image: imageUrl,
        };
        await patchArticlesId(articleId, articleData);
        alert("게시글이 수정되었습니다.");
        onSuccess();
      } catch (error) {
        console.error("게시글 수정 실패", error);
      }
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  const isFormValid = title && content && imageUrl;

  return (
    <div className={styles.articleForm}>
      <div className={styles.innerContain}>
        <div className={styles.formGroup}>
          <div className={styles.topContain}>
            <input
              className={styles.titleForm}
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
              disabled={isLoading}
            />
            <div className={styles.buttonContain}>
              <button
                className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ""}`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                수정하기
              </button>
              <button className={styles.submitButton} onClick={onCancel}>
                수정취소
              </button>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          {!imageUrl && !isImageConfirmed && (
            <div className={styles.formGroup}>
              <div className={styles.previewContainer}>
                <div className={styles.previewImage1}>
                  {" "}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading}
                  />
                </div>
                <div className={styles.previewActions}>
                  <div className={styles.buttonContain}></div>
                </div>
              </div>
            </div>
          )}

          {imageUrl && !isImageConfirmed && isDeleteConfirmed && (
            <div className={styles.previewContainer}>
              <img
                src={imageUrl}
                alt="미리보기"
                className={styles.previewImage}
              />
              <div className={styles.previewActions}>
                <div className={styles.buttonContain}>
                  <button
                    className={styles.removeButton}
                    onClick={handleImageRemove}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}

          {imageUrl && !isImageConfirmed && !isDeleteConfirmed && (
            <div className={styles.previewContainer}>
              <img
                src={imageUrl}
                alt="미리보기"
                className={styles.previewImage}
              />
              <div className={styles.previewActions}>
                <div className={styles.buttonContain}>
                  <button
                    className={styles.confirmButton}
                    onClick={handleImageConfirm}
                  >
                    확인
                  </button>
                  <button
                    className={styles.removeButton}
                    onClick={handleImageRemove}
                  >
                    삭제
                  </button>
                </div>
              </div>
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
              <button
                className={styles.removeButton}
                onClick={handleImageRemove}
              >
                삭제
              </button>
            </div>
          )}

          <input
            type="text"
            value={content}
            className={styles.contentForm}
            onChange={handleContentChange}
            placeholder="본문을 입력해주세요"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default FixCard;
