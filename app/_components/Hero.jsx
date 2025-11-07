"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function Hero() {
  const router = useRouter();
  const handleAIImport = async () => {
    try {
      const session = await authClient.getSession();
      const isAuthed = Boolean(session?.data?.user?.id);
      if (isAuthed) router.push("/ai-resume-builder");
      else router.push(`/login?next=${encodeURIComponent("/ai-resume-builder")}`);
    } catch {
      router.push(`/login?next=${encodeURIComponent("/ai-resume-builder")}`);
    }
  };
  return (
    <section className="relative ml-16 overflow-hidden text-slate-800">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(79,70,229,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-10 md:pt-20 pb-20">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
              <span className="size-1.5 rounded-full bg-indigo-500" /> AI-powered resume platform
            </div>

            <h1 className="mt-4 text-4xl md:text-6xl/[1.1] font-semibold tracking-tight">
              Build software‑grade resumes that get hired
            </h1>

            <p className="mt-5 text-slate-600 text-base md:text-lg max-w-xl">
              Import your resume, enhance with AI, and ship a polished, ATS‑friendly profile with clean templates and color accents.
            </p>

            <div className="mt-8 flex max-sm:flex-col items-center gap-3">
              <Link href="/dashboard" className="px-6 py-3 rounded-full text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 shadow-sm ring-1 ring-indigo-300 hover:shadow transition cursor-pointer w-full sm:w-auto text-center">
                Build my resume
              </Link>
              <button onClick={handleAIImport} className="px-6 py-3 rounded-full border border-slate-200 text-slate-800 hover:bg-slate-50 transition cursor-pointer w-full sm:w-auto text-center">
                Try AI import
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i)=> (
                  <img key={i} src={`https://i.pravatar.cc/64?img=${i}`} alt="user" className="size-9 rounded-full border-2 border-white" />
                ))}
              </div>
              <div className="text-sm text-slate-600">
                Trusted by <span className="font-semibold text-slate-800">1,000+</span> job seekers
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 size-72 bg-gradient-to-tr from-fuchsia-400/30 via-indigo-300/20 to-cyan-300/20 blur-3xl rounded-full" />

            <div className="relative mx-auto max-w-md rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur shadow-lg">
              <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-400" />
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-slate-500">preview.pdf</span>
              </div>
              <div className="p-4">
                <Image src="/HeroImage.png" alt="Resume preview" width={640} height={800} className="w-full h-auto rounded-lg ring-1 ring-slate-200" />
              </div>

              <div className="px-4 pb-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { c: "#6366F1", t: "Modern" },
                    { c: "#14B8A6", t: "Minimal" },
                    { c: "#F59E0B", t: "Classic" },
                  ].map(({c,t}) => (
                    <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 bg-white">
                      <span className="size-3 rounded-full" style={{ backgroundColor: c }} />
                      <span className="text-xs text-slate-600">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
