"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getArticlesId, patchArticlesId } from "@/api/swagger/Article";
import { ArticlesProps } from "@/api/swagger/Wikid.types";
import styles from "@/styles/boards/id/FixCard.module.scss";
import { ImageInsertModal } from "@/components/common/WikidImage";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openImageModal, setOpenImageModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const article = await getArticlesId(articleId);
        if (article) {
          setTitle(article.title);
          setContent(article.content);
          setImageUrl(article.image || null);
        } else {
          console.error("게시글을 찾을 수 없습니다.");
          alert("게시글을 찾을 수 없습니다.");
        }
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

  const handleCancel = () => {
    onCancel();
  };

  const handleImageRemove = () => {
    setImageUrl(null);
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

  const handleImageSelect = (newImageUrl: string) => {
    setImageUrl(newImageUrl);
    setOpenImageModal(false);
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
              maxLength={30}
            />
            <div className={styles.buttonContain}>
              <button
                className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ""}`}
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                수정하기
              </button>
              <button className={styles.submitButton} onClick={handleCancel}>
                수정취소
              </button>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageContain}>
            {imageUrl ? (
              <div className={styles.imagePreview}>
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt="Image Preview"
                />
                <button
                  onClick={handleImageRemove}
                  className={styles.removeImageButton}
                >
                  X
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpenImageModal(true)}
                className={styles.uploadButton}
              >
                이미지 등록
              </button>
            )}
          </div>
        </div>
        <div className={styles.formGroup}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.contentForm}
            placeholder="본문을 입력해주세요"
            disabled={isLoading}
            rows={10}
          />
        </div>
      </div>
      {openImageModal && <ImageInsertModal onClose={handleImageSelect} />}
    </div>
  );
};

export default FixCard;
