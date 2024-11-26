import Image from "next/image";
import styles from "@/styles/boards/best/LikeCount.module.scss";

interface LikeCountProps {
  likeCount: number;
  className?: string;
}

const LikeCount = ({ likeCount }: LikeCountProps) => {
  return (
    <div className={styles.likeContain}>
      <div className={styles.likeIcon}>
        <Image
          src="/images/icon/ic_heart.svg"
          alt="heart"
          width={20}
          height={20}
        />
      </div>
      <span>{likeCount > 10000 ? "9999+" : likeCount}</span>
    </div>
  );
};

export default LikeCount;
