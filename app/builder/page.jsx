"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">Build Your Resume</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Create, edit, and download job‑ready resumes with modern templates and AI assistance.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/dashboard" className="px-6 py-3 rounded-md bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700">
              Go to Dashboard
            </Link>
            <Link href="/ai-resume-builder" className="px-6 py-3 rounded-md border border-gray-200 text-gray-800 cursor-pointer hover:bg-gray-50">
              Try AI Import
            </Link>
          </div>
        </section>

        <section className="mt-14 grid md:grid-cols-3 gap-6">
          {["Pick a template","Fill your details","Download or Share"].map((t,i)=> (
            <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{t}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {i===0 && 'Choose from Classic, Minimal, Modern, or Minimal-Image templates with color accents.'}
                {i===1 && 'Add personal info, summary, experience, education, projects, and skills with inline AI help.'}
                {i===2 && 'Print to PDF, share a public link, or keep it private — you control the visibility.'}
              </p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
