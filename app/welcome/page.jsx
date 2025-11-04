"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome!</h1>
        <p className="text-gray-600">Your account was created via Google. You can proceed to your dashboard.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/dashboard" className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700">Go to Dashboard</Link>
          <Link href="/" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50">Home</Link>
        </div>
      </div>
    </main>
  );
}
