import Image from "next/image";
// import WikedLogo from "../../public/images/ic_W.svg"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image src="/images/ic_W.svg" alt='Wikid Logo' width={480} height={480} priority />
        {/* <WikedLogo alt='Wikid Logo' width='480' height='480'/> */}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
