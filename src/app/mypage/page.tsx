'use client'

import { redirect } from 'next/navigation'

export default function MyPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>내 위키 페이지 입니다.</h1>
      <button onClick={() => redirect('/testswagger/User')}>다이얼로그 테스트</button>
    </div>
  );
}
