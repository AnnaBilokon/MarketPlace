"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  type: "signup" | "login";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (type === "signup") {
        response = await supabase.auth.signUp({
          email,
          password,
        });
      } else if (type === "login") {
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (response?.error) throw new Error(response.error.message);

      const { data: session, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw new Error(sessionError.message);

      if (session) {
        console.log("Session available after login:", session);
        router.push("/");
      } else {
        throw new Error("Session not available after login.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-[#aacae6] text-black rounded-md hover:bg-[#EBF6FB] w-full"
      >
        {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Log In"}
      </button>
      {type === "login" ? (
        <p className="text-black text-sm text-center">
          Have no account?
          <span className="font-bold">
            <Link href="/signup"> SignUp</Link>
          </span>
        </p>
      ) : (
        <p className="text-black text-sm text-center">
          Have an account?
          <span className="font-bold">
            <Link href="/login"> Login</Link>
          </span>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
