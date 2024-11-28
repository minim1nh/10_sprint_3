import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/boards/all/DropDown.module.scss";

interface DropDownProps {
  value: string;
  onChange: (value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropDown}>
      <button onClick={handleToggle} className={styles.dropDownButton}>
        {value === "recent" ? "최신순" : "좋아요순"}
        <Image
          src="/images/icon/ic_arrow.svg"
          alt="arrow"
          width={30}
          height={30}
        />
      </button>
      {isOpen && (
        <div className={styles.dropDownMenu}>
          <button
            className={`${styles.menuButton} ${
              value === "recent" ? styles.active : ""
            }`}
            onClick={() => handleSelect("recent")}
          >
            최신순
          </button>
          <button
            className={`${styles.menuButton} ${
              value === "like" ? styles.active : ""
            }`}
            onClick={() => handleSelect("like")}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
