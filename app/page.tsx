import Image from "next/image";

type GeneralInfo = {
  name: string;
  github: string;
  email: string;
  intro: string;
  profileImage?: string; // "/coffee.jpeg"
};

type RepoLink = {
  label: string;
  url: string;
};

type Project = {
  title: string;
  description: string;
  repos?: RepoLink[];  //
};
type Certificate = {
  name: string;
  issuedBy: string;
  year: string | number; // 2025.09 같은 값도 허용
};

async function getGeneral(): Promise<GeneralInfo> {
  const res = await fetch(
    "https://raw.githubusercontent.com/Hong9915/first-deploy/refs/heads/main/public/resume_general_info_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch general");
  return res.json();
}

async function getPortfolio(): Promise<{ projects: Project[]; certificates: Certificate[] }> {
  const res = await fetch(
    "https://raw.githubusercontent.com/Hong9915/first-deploy/refs/heads/main/public/resume_portfolio_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
}

export default async function Home() {
  const [general, portfolio] = await Promise.all([getGeneral(), getPortfolio()]);
  const { projects = [], certificates = [] } = portfolio;

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-900 dark:to-zinc-800">
      <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">
        {/* 기본 정보 */}
        <section className="text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src={general.profileImage || "/coffee.jpeg"}
              alt="Profile photo"
              width={120}
              height={120}
              className="rounded-full border-4 border-slate-300 dark:border-slate-600 shadow-lg"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            안녕하세요 👋 저는{" "}
            <span className="text-blue-600 dark:text-blue-400">{general.name}</span> 입니다.
          </h1>
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {general.intro}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={general.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition"
            >
              GitHub
            </a>
            <a
              href={`mailto:${general.email}`}
              className="px-5 py-2 rounded-full border border-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              이메일 보내기
            </a>
          </div>
        </section>

        {/* 프로젝트 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">📂 프로젝트</h2>
          <ul className="space-y-4">
            {projects.map((p, i) => (
              <li
                key={i}ㅋ
                className="rounded-lg border bg-white/70 dark:bg-zinc-800/70 p-5 shadow"
              >
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  {p.description}
                </p>

                {/* 레포 버튼 */}
                <div className="flex flex-wrap gap-3">
                  {p.repos?.map((r, idx) => (
                    <a
                      key={idx}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-4 py-2 hover:bg-zinc-700 transition"
                    >
                      📁 {r.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
            {projects.length === 0 && (
              <li className="text-slate-500">등록된 프로젝트가 없습니다.</li>
            )}
          </ul>
        </section>

        {/* 자격증 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🎓 자격증</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {certificates.map((c, i) => (
              <li key={i} className="rounded-lg border bg-white/70 dark:bg-zinc-800/70 p-4 shadow">
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {c.issuedBy} · {String(c.year)}
                </div>
              </li>
            ))}
            {certificates.length === 0 && (
              <li className="text-slate-500">등록된 자격증이 없습니다.</li>
            )}
          </ul>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} {general.name}. All rights reserved.
      </footer>
    </div>
  );
}