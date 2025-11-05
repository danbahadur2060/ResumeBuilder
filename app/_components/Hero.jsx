"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function HeroWithNav() {
  return (
    <section className="pb-32 md:pb-44 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat text-slate-800 text-sm">
      <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-32">
        <div className="max-md:text-center">
          <h5 className="text-4xl md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
            Build Resumes That Get Hired.
          </h5>

          <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-slate-600">
            Personalized AI resumes tailored to your career goals. Optimize
            formatting, highlight strengths, and get interviews faster with
            smart, professional designs.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <Link href={"/login"}>
              <button
                className="px-8 py-3  cursor-pointer rounded-md bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all"
                type="button"
              >
                Get Started
              </button>
            </Link>

            <Link href="/demo">
              <button
                className="px-5 py-3 rounded-md cursor-pointer bg-white text-indigo-600 border border-indigo-400 flex items-center gap-2 hover:bg-indigo-600/5 active:scale-95 transition-all"
                type="button"
              >
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M6.68395 9.89231C6.62515 9.66436 6.50633 9.45634 6.33987 9.28988C6.17341 9.12341 5.96538 9.0046 5.73743 8.94579L1.69644 7.90377C1.6275 7.8842 1.56682 7.84267 1.52362 7.7855C1.48041 7.72832 1.45703 7.65861 1.45703 7.58694C1.45703 7.51527 1.48041 7.44556 1.52362 7.38839C1.56682 7.33121 1.6275 7.28969 1.69644 7.27012L5.73743 6.22743C5.9653 6.16868 6.17327 6.04997 6.33973 5.88363C6.50618 5.71729 6.62504 5.5094 6.68395 5.28157L7.72598 1.24058C7.74535 1.17137 7.78683 1.11039 7.84409 1.06695C7.90136 1.02351 7.97126 1 8.04313 1C8.11501 1 8.18491 1.02351 8.24217 1.06695C8.29943 1.11039 8.34092 1.17137 8.36029 1.24058L9.40166 5.28157C9.46046 5.50952 9.57928 5.71755 9.74574 5.88401C9.9122 6.05047 10.1202 6.16928 10.3482 6.22809L14.3892 7.26946C14.4587 7.28863 14.5199 7.33006 14.5636 7.38741C14.6073 7.44476 14.6309 7.51486 14.6309 7.58694C14.6309 7.65903 14.6073 7.72912 14.5636 7.78647C14.5199 7.84382 14.4587 7.88526 14.3892 7.90442L10.3482 8.94579C10.1202 9.0046 9.9122 9.12341 9.74574 9.28988C9.57928 9.45634 9.46046 9.66436 9.40166 9.89231L8.35963 13.9333C8.34026 14.0025 8.29878 14.0635 8.24151 14.1069C8.18425 14.1504 8.11435 14.1739 8.04247 14.1739C7.9706 14.1739 7.9007 14.1504 7.84344 14.1069C7.78617 14.0635 7.74469 14.0025 7.72532 13.9333L6.68395 9.89231Z"
                    stroke="#4F39F6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3105 1.66016V4.29487"
                    stroke="#4F39F6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.6328 2.97656H11.998"
                    stroke="#4F39F6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.76953 10.8809V12.1982"
                    stroke="#4F39F6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.42673 11.541H2.10938"
                    stroke="#4F39F6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Live Demo</span>
              </button>
            </Link>
          </div>

          <div className="flex items-center mt-9">
            <div className="flex -space-x-3.5 pr-3">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="image"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-1"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="image"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[2]"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="image"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[3]"
              />
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
                alt="image"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[4]"
              />
              <img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
                alt="image"
                className="size-10 border-2 border-white rounded-full hover:-translate-y-px transition z-[4]"
              />
            </div>

            <div>
              <div className="flex items-center gap-px">
                {/* Star icons */}
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="#FF8F20"
                  />
                </svg>
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="#FF8F20"
                  />
                </svg>
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="#FF8F20"
                  />
                </svg>
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="#FF8F20"
                  />
                </svg>
                <svg
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M5.85536 0.463527C6.00504 0.00287118 6.65674 0.00287028 6.80642 0.463526L7.82681 3.60397C7.89375 3.80998 8.08572 3.94946 8.30234 3.94946H11.6044C12.0888 3.94946 12.2901 4.56926 11.8983 4.85397L9.22687 6.79486C9.05162 6.92219 8.97829 7.14787 9.04523 7.35388L10.0656 10.4943C10.2153 10.955 9.68806 11.338 9.2962 11.0533L6.62478 9.11244C6.44954 8.98512 6.21224 8.98512 6.037 9.11244L3.36558 11.0533C2.97372 11.338 2.44648 10.955 2.59616 10.4943L3.61655 7.35388C3.68349 7.14787 3.61016 6.92219 3.43491 6.79486L0.763497 4.85397C0.37164 4.56927 0.573027 3.94946 1.05739 3.94946H4.35944C4.57606 3.94946 4.76803 3.80998 4.83497 3.60397L5.85536 0.463527Z"
                    fill="#FF8F20"
                  />
                </svg>
              </div>
              <p className="text-sm text-slate-500">Used by 1,000+ people</p>
            </div>
          </div>
        </div>

        <div className="w-full md:max-w-xs lg:max-w-lg">
          <Image
            className="w-full h-auto"
            width={500}
            height={500}
            src="/HeroImage.png"
            alt="users group"
          />
        </div>
      </div>
    </section>
  );
}
