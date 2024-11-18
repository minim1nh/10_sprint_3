import "@/styles/globals.scss";

export const metadata = {
  title: "WIKID",
  description: "My Next.js App with Pretendard font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="font-pretendard antialiased">{children}</body>
    </html>
  );
}
