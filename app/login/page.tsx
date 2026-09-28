"use client";
import React, { useEffect } from "react";
import type { SubmitEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Login = () => {

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
  axios
    .get("http://localhost:5000/dashboard", {
      withCredentials: true,
    })
    .then(() => {
      setIsAuthenticated(true);
    })
    .catch(() => {
      setIsAuthenticated(false);
    });
}, []);

  const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/logout",
      {},
      {
        withCredentials: true,
      }
    );

    setIsAuthenticated(false);
  } catch (error) {
    console.log(error);
  }
};

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const result = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);
      
      router.replace("/dashboard");

      setSuccess("Login successful!");
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  

  if (isAuthenticated) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
        
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mt-5 text-2xl font-black text-slate-900">
          You are logged in
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Your account is currently authenticated.
        </p>

        <button
          onClick={handleLogout}
          className="mt-7 h-12 w-full rounded-xl bg-red-500 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-200 hover:bg-red-600 hover:shadow-red-500/30 active:scale-[0.98]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
  return (
    <>
      <div className="w-full max-w-md mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Sasy Shop
          </span>

          <h1 className="mt-3 text-3xl font-black text-slate-900">
            Welcome Back
          </h1>
          <h1 className="mt-3 text-lg font-black text-red-400">
            You need to login to access the dashboard.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your account to continue.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">

          <h2 className="text-xl font-black text-slate-900">
            Login
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Enter your account details.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-7 space-y-5"
          >

            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                {success}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Login
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 Sasy Shop
        </p>

      </div>
    </>
  );
};

export default Login;