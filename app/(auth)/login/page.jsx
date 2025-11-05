'use client'

import { authClient } from "../../lib/auth-client"; 
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  // Client-side validation
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

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
      newErrors.password = "";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: "", text: "" });
    setErrors({ email: "", password: "" });
    
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: false,
      });

      if (error) {
        setMessage({ type: "error", text: error.message || "Invalid credentials. Please try again." });
      } else if (data) {
        setMessage({ type: "success", text: "Login successful! Redirecting..." });
        console.log(data);
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/welcome",
        disableRedirect: true,
      });

      if (error) {
        setMessage({ type: "error", text: error.message || "Google sign-in failed. Please try again." });
      } else if (data) {
        setMessage({ type: "success", text: "Login successful! Redirecting..." });
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Google sign-in failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <Image
          src="/loginsideImage.png"
          width={600}
          height={700}
          className="h-full w-full object-cover"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          {/* Message Display */}
          {message.text && (
            <div className={`w-full p-3 rounded-lg mb-4 text-sm ${
              message.type === "success" 
                ? "bg-green-100 text-green-700 border border-green-200" 
                : "bg-red-100 text-red-700 border border-red-200"
            }`}>
              {message.text}
            </div>
          )}

          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Welcome back! Please sign in to continue
          </p>

          {/* Social login */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            disabled={loading}
            className="w-full mt-8 cursor-pointer bg-gray-500/10 hover:bg-gray-500/20 flex items-center justify-center h-12 rounded-full transition-all"
          >
            
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
          
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Email input */}
          <div className="relative w-full mt-2">
            {errors.email && (
              <p className="absolute -top-5 left-6 text-red-500 text-sm">{errors.email}</p>
            )}
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email id"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="relative w-full mt-6">
            {errors.password && (
              <p className="absolute -top-5 left-6 text-red-500 text-sm">{errors.password}</p>
            )}
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-6 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="remember" />
              <label className="text-sm" htmlFor="remember">Remember me</label>
            </div>
            <Link className="text-sm underline" href="/forgotpassword">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 hover:opacity-90 transition-all flex items-center justify-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <Link className="text-indigo-400 hover:underline" href="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
