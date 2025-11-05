"use client";

import { authClient } from "../../lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Client-side validation
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);
    setErrors({ name: "", email: "", password: "" });

    try {
      // If your authClient supports callbacks you can pass them instead.
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error?.message || "Signup failed. Please try again.",
        });
        return;
      }

      if (data) {
        setMessage({
          type: "success",
          text: "Account created successfully! Check your email for verification.",
        });

        // clear form
        setName("");
        setEmail("");
        setPassword("");

        // redirect to login after a short delay
        setTimeout(() => router.push("/login"), 1800);
      } else {
        // unexpected response
        setMessage({
          type: "error",
          text: "Unexpected response from server. Please try again.",
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage({
        type: "error",
        text: "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/welcome",
        disableRedirect: true,
      });

      if (error) {
        setMessage({ type: "error", text: error?.message || "Google sign-in failed." });
        return;
      }

      if (data) {
        setMessage({ type: "success", text: "Sign-in successful — redirecting..." });
        setTimeout(() => router.push("/dashboard"), 900);
      } else {
        setMessage({ type: "error", text: "Google sign-in returned no data." });
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      setMessage({ type: "error", text: "Google sign-in failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] w-full">
      <div className="w-full hidden md:inline-block">
        <Image
          src="/loginsideImage.png"
          width={600}
          height={600}
          className="w-full object-cover"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
          noValidate
        >
          {/* Message Display */}
          {message.text && (
            <div
              role="status"
              aria-live="polite"
              className={`w-full p-3 rounded-lg mb-4 text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome! Please create your account to continue
          </p>

          {/* Social login button */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            disabled={loading}
            className="w-full mt-8 cursor-pointer bg-gray-500/10 hover:bg-gray-500/20 flex items-center justify-center h-12 rounded-full transition-all disabled:opacity-50"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">or sign Up with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Name input */}
          <div className="relative w-full mt-2">
            {errors.name && (
              <p className="absolute -top-5 left-6 text-red-500 text-sm">{errors.name}</p>
            )}
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </div>
          </div>

          {/* Email input */}
          <div className="relative w-full mt-6">
            {errors.email && (
              <p id="email-error" className="absolute -top-5 left-6 text-red-500 text-sm">
                {errors.email}
              </p>
            )}
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email id"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="relative w-full mt-6">
            {errors.password && (
              <p id="password-error" className="absolute -top-5 left-6 text-red-500 text-sm">
                {errors.password}
              </p>
            )}
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
            </div>
          </div>

          {/* Signup button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-green-500 hover:bg-green-600 hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-indigo-400 hover:underline" href="/login">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
