"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function Page() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthed(Boolean(session?.data?.user?.id));
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const requireLogin = () => router.push(`/login?next=${encodeURIComponent("/ai-resume-builder")}`);

  const handleImport = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthed) return requireLogin();

    try {
      setLoading(true);
      if (file) {
        const isText = file.type === "text/plain";
        const text = isText ? await file.text() : `Uploaded file: ${file.name}`;
        const titleGuess = file.name?.replace(/\.[^.]+$/, "") || "Imported Resume";
        const { data } = await axios.post("/api/ai/upload-resume", {
          resumeText: text,
          title: titleGuess,
        });
        if (data?.resumeId) router.push(`/builder/${data.resumeId}`);
        return;
      }

      if (resumeText.trim()) {
        const { data } = await axios.post("/api/ai/upload-resume", {
          resumeText: resumeText.trim(),
          title: "Imported Resume",
        });
        if (data?.resumeId) router.push(`/builder/${data.resumeId}`);
        return;
      }

      setError("Please paste resume text or upload a file.");
    } catch (e) {
      setError("Failed to import resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Header banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_-10%,rgba(79,70,229,0.18),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center">AI Resume Builder</h1>
          <p className="mt-3 text-gray-600 text-center max-w-2xl mx-auto">
            Import your resume or paste text; our AI will extract structured data so you can start editing instantly.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 pb-14">
        {error && (
          <div className="mb-4 px-3 py-2 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>
        )}

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Left: input card */}
          <form onSubmit={handleImport} className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm grid gap-4">
            <div>
              <label className="text-sm font-medium text-gray-800">Paste Resume Text</label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={10}
                placeholder="Paste your resume text here..."
                className="mt-2 w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!isAuthed}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">Or Upload a File (.txt, .pdf, .docx)</label>
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                disabled={!isAuthed}
              />
              {file && (
                <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-md bg-indigo-600 text-white cursor-pointer disabled:opacity-50"
              >
                {loading ? "Importing..." : "Import & Build"}
              </button>
              <Link href="/builder" className="px-6 py-3 rounded-md border border-gray-200 text-gray-800 cursor-pointer hover:bg-gray-50">Back to Builder</Link>
            </div>

            {!checking && !isAuthed && (
              <div className="mt-1 text-sm text-gray-600">
                You must be signed in to use AI Import. <button type="button" onClick={requireLogin} className="text-indigo-600 underline">Sign in</button>
              </div>
            )}
          </form>

          {/* Right: preview/benefits card */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50 ring-1 ring-indigo-100 w-fit px-2 py-1 rounded-full">
              <span className="size-1.5 rounded-full bg-indigo-500" /> Fast & ATS‑friendly
            </div>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">What you get</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>Structured fields: summary, experience, education, projects, skills</li>
              <li>Clean templates with color accents</li>
              <li>Print to PDF or share a public link</li>
            </ul>
            <div className="mt-5 rounded-lg overflow-hidden border border-gray-200">
              <img src="/HeroImage.png" alt="preview" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
