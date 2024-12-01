"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { postProfilesCodePing, getProfilesCode } from "@/api/swagger/Profile";
import styles from "@/styles/wiki/ParticipateButton.module.scss";

export default function StartButton({
  onCorrectAnswer,
}: {
  onCorrectAnswer: () => void;
}) {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 질문을 가져오는 함수
  const fetchSecurityQuestion = async () => {
    if (!code) {
      setErrorMessage("프로필 코드를 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await getProfilesCode(code);
      setSecurityQuestion(response!.securityQuestion || "");
    } catch {
      setErrorMessage("질문을 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchSecurityQuestion();
    }
  }, [showModal]);

  const handleParticipate = async () => {
    if (!code) {
      setErrorMessage("프로필 코드를 찾을 수 없습니다.");
      return;
    }

    try {
      await postProfilesCodePing(code, { securityAnswer });
      onCorrectAnswer();
      setShowModal(false);
      setErrorMessage("");
    } catch {
      setErrorMessage("정답이 아닙니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div>
      {/* 참여 버튼 */}
      <button className={styles.button} onClick={() => setShowModal(true)}>
        시작하기
      </button>

      {/* 모달 */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            {/* 모달 헤더 */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                다음 퀴즈를 맞추고 위키를 작성해 보세요.
              </h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            {/* 모달 본문 */}
            <div className={styles.modalBody}>
              <p className={styles.securityQuestion}>
                {securityQuestion || "질문을 불러오는 중입니다..."}
              </p>
              <input
                type="text"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="답안을 입력해 주세요."
                className={styles.inputField}
              />
              {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
              )}
            </div>

            {/* 모달 하단 버튼 */}
            <div className={styles.modalFooter}>
              <button
                className={styles.confirmButton}
                onClick={handleParticipate}
              >
                확인
              </button>
            </div>
            {/* 추가된 하단 텍스트 */}
            <div className={styles.modalBottomText}>
              <p>
                위키드는 지인들과 함께하는 즐거운 공간입니다. <br />
                지인에게 상처를 주지 않도록 작성해 주세요.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
