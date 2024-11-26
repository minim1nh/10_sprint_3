"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/boards/best/AddButton.module.scss";

interface AddBoardButtonProps {
  label?: string;
}

const AddButton: React.FC<AddBoardButtonProps> = ({
  label = "게시판 추가",
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/addboard");
  };

  return (
    <button onClick={handleClick} className={styles.addBoardButton}>
      {label}
    </button>
  );
};

export default AddButton;
