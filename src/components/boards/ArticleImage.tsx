import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/boards/best/ArticleImage.module.scss";

interface ImageProps {
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
}

const defaultImg =
  "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/path/to/default-image.jpg";

const ArticleImage = ({ src, alt, width = 300, height = 300 }: ImageProps) => {
  const [imageSrc, setImageSrc] = useState(src ?? defaultImg);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleImageError = () => {
    if (isMounted) {
      setImageSrc(defaultImg);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src={imageSrc}
        alt={alt}
        className={styles.image}
        onError={handleImageError}
        priority
        width={width}
        height={height}
      />
    </div>
  );
};

export default ArticleImage;
