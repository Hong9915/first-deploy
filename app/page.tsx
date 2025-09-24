import Image from "next/image";

type GeneralInfo = {
  name: string;
  github: string;
  email: string;
  intro: string;
  profileImage?: string;
};

// GitHub RAW JSON 불러오기
async function getResumeInfo(): Promise<GeneralInfo> {
  const res = await fetch(
    "https://raw.githubusercontent.com/Hong9915/first-deploy/refs/heads/main/public/resume_general_info_service.json"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const info = await getResumeInfo();

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <main className="max-w-2xl text-center space-y-8">
        <div className="flex justify-center">
          <Image
            src={info.profileImage || "/coffee.jpeg"}
            alt="Profile photo"
            width={120} 
            height={120}
            className="rounded-full border-4 border-slate-300 dark:border-slate-600 shadow-lg"
            priority
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          안녕하세요 👋 저는{" "}
          <span className="text-blue-600 dark:text-blue-400">{info.name}</span>
          입니다.
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          {info.intro}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={info.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition"
          >
            GitHub
          </a>
          <a
            href={`mailto:${info.email}`}
            className="px-5 py-2 rounded-full border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            이메일 보내기
          </a>
        </div>
      </main>

      <footer className="mt-16 text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {info.name}. All rights reserved.
      </footer>
    </div>
  );
}