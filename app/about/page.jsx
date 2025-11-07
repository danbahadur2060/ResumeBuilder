"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function Page() {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">About</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          We’re building an AI-powered resume platform that helps candidates present their best selves.
          Focus on your story — we take care of formatting, structure, and optimization.
        </p>
        <section className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Our Mission</h3>
            <p className="mt-2 text-sm text-gray-700">
              Democratize high-quality resume writing with tools that are fast, accessible, and effective.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">What We Offer</h3>
            <p className="mt-2 text-sm text-gray-700">
              Clean templates, AI guidance, public share links, and printing workflows — all in one place.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
