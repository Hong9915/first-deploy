import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <main className="max-w-2xl text-center space-y-8">
        {/* 프로필 이미지 */}
        <div className="flex justify-center">
          <Image
            src="/coffee.jpeg" // public 폴더에 profile.jpg 넣어두세요!
            alt="Profile photo"
            width={120}
            height={120}
            className="rounded-full border-4 border-slate-300 dark:border-slate-600 shadow-lg"
          />
        </div>

        {/* 소개글 */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          안녕하세요 👋 저는{" "}
          <span className="text-blue-600 dark:text-blue-400">홍형준</span>입니다.
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          웹 개발과 인공지능에 관심이 많은 개발자예요.  
          Next.js와 Spring Boot를 공부하면서 멋진 서비스를 만들고 있습니다. 🚀
        </p>

        {/* 링크 버튼 */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Hong9915"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition"
          >
            GitHub
          </a>
          <a
            href="mailto:hhj4498@naver.com"
            className="px-5 py-2 rounded-full border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            이메일 보내기
          </a>
        </div>
      </main>

      <footer className="mt-16 text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Hong Hyungjune. All rights reserved.
      </footer>
    </div>
  );
}