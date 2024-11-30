import Image from "next/image";
import styles from "@/styles/addboard/ImageButton.module.scss";
import { ImageInsertModal } from "@/components/common/WikidDialog";
import { useState } from "react";

const ImageButton = () => {
  const [isImageInsertModalOpen, setIsImageInsertModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleImageInsertModal = () => {
    setIsImageInsertModalOpen(true);
  };

  return (
    <>
      <button
        className={styles.iconButton}
        onClick={() => handleImageInsertModal()}
      >
        <Image
          src="/images/icon/ic_image.svg"
          alt="image"
          className={styles.searchImage}
          width={20}
          height={20}
        />
      </button>

      {imageURL && (
        <div>
          <img src={imageURL} alt="Uploaded Image" width={100} height={100} />
        </div>
      )}

      {isImageInsertModalOpen && <ImageInsertModal setImageURL={setImageURL} />}
    </>
  );
};

export default ImageButton;
