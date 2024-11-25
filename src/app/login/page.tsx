'use client'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>로그인 페이지 입니다.</h1>
      <button onClick={() => redirect('/testswagger/Auth')}>로그인 테스트</button>
    </div>
  );
}
