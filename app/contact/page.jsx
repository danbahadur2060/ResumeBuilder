"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Thanks! We'll get back to you.");
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Contact</h1>
        <p className="mt-3 text-gray-600">Have a question or feature request? Send us a message.</p>

        {status && (
          <div className="mt-6 p-3 rounded-md bg-green-50 text-green-700 text-sm border border-green-200">{status}</div>
        )}

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-800">Name</label>
            <input type="text" required className="mt-2 w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-800">Email</label>
            <input type="email" required className="mt-2 w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-800">Message</label>
            <textarea required rows={6} className="mt-2 w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button className="mt-2 w-full md:w-auto px-6 py-3 rounded-md bg-indigo-600 text-white cursor-pointer">Send</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
