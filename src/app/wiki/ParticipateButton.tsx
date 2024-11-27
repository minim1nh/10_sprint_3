"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { postProfilesCodePing } from "@/api/swagger/TestProfile";
import styles from "@/styles/wiki/ParticipateButton.module.scss";

export default function ParticipateButton({
  onCorrectAnswer,
}: {
  onCorrectAnswer: () => void;
}) {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [securityAnswer, setSecurityAnswer] = useState(""); // 입력한 정답
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleParticipate = async () => {
    if (!code) {
      setErrorMessage("URL에서 코드를 찾을 수 없습니다.");
      return;
    }

    console.log("Sending Code:", code);
    console.log("Sending Security Answer:", securityAnswer);

    try {
      const response = await postProfilesCodePing(code, { securityAnswer });
      console.log("정답 확인 성공:", response);

      onCorrectAnswer();
      setShowModal(false);
      setErrorMessage("");
    } catch (error: any) {
      console.error("정답 확인 실패:", error);

      // API 응답 상태 코드에 따른 에러 처리
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("오답입니다. 다시 시도해주세요.");
        } else {
          setErrorMessage(`오답입니다`);
        }
      } else {
        setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={() => setShowModal(true)}>
        위키 참여하기
      </button>
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Security Answer 입력</h2>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="정답을 입력하세요"
              className={styles.input}
            />
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleParticipate}>
                확인
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
