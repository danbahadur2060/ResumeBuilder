"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function Page() {
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Pricing</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">Simple pricing for job seekers. Start free, upgrade when you need more.</p>

        <section className="mt-10 grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Free</h3>
            <p className="text-3xl font-bold mt-2">$0</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• 1 resume</li>
              <li>• Basic templates</li>
              <li>• Manual editing</li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 rounded-md bg-gray-900 text-white cursor-pointer">Get started</button>
          </div>

          {/* Pro */}
          <div className="border-2 border-indigo-400 rounded-xl p-6 bg-white shadow-md">
            <div className="inline-block text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">Popular</div>
            <h3 className="text-lg font-semibold text-gray-900 mt-2">Pro</h3>
            <p className="text-3xl font-bold mt-2">$9<span className="text-base text-gray-500">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Unlimited resumes</li>
              <li>• All templates + colors</li>
              <li>• AI enhancements</li>
              <li>• Public share links</li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 rounded-md bg-indigo-600 text-white cursor-pointer">Upgrade</button>
          </div>

          {/* Teams */}
          <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
            <p className="text-3xl font-bold mt-2">$29<span className="text-base text-gray-500">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Team workspaces</li>
              <li>• Shared templates</li>
              <li>• Priority support</li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 rounded-md bg-gray-900 text-white cursor-pointer">Contact sales</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
