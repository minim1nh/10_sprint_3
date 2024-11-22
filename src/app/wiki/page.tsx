"use client";

import React from "react";
import ProfileCard from "./ProfileCard";

export default function WikiPage() {
  const profile = {
    name: "이지동",
    info: null,
  };

  return (
    <div
      style={{
        padding: "2rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
        }}
      >
        <ProfileCard />
      </div>

      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>위키 페이지</h1>
      </header>

      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
        }}
      >
        <p style={{ fontSize: "1.5rem", margin: "0", color: "#444" }}>
          아직 작성된 내용이 없네요.
        </p>
        <p style={{ fontSize: "1.5rem", margin: "1rem 0 2rem", color: "#444" }}>
          위키에 참여해 보세요!
        </p>
        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1rem",
            color: "#fff",
            backgroundColor: "#007BFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => alert("시작하기 버튼이 클릭되었습니다!")}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
