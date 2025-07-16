"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetError, setResetError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setResetMsg("");
    setResetError("");
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMsg("Password reset email sent!");
    } catch (err) {
      setResetError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f0f23",
    }}>
      <form
        onSubmit={handleEmailLogin}
        style={{
          background: "#18182a",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
          padding: 36,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          border: "1px solid #23233a"
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#a5b4fc", marginBottom: 18 }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: "100%", padding: 12, marginBottom: 14, borderRadius: 8, border: "1px solid #23233a", fontSize: 16, background: "#23233a", color: "#fff"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: "100%", padding: 12, marginBottom: 18, borderRadius: 8, border: "1px solid #23233a", fontSize: 16, background: "#23233a", color: "#fff"
          }}
        />
        {error && <div style={{ color: "#ef4444", marginBottom: 12 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 10,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(99,102,241,0.10)"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            background: "#ea4335",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 10,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(234,67,53,0.10)"
          }}
        >
          {loading ? "Please wait..." : "Sign in with Google"}
        </button>
        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={() => setShowReset(!showReset)}
            style={{
              background: "none",
              border: "none",
              color: "#38bdf8",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "underline"
            }}
          >
            Forgot Password?
          </button>
        </div>
        {showReset && (
          <div style={{ marginTop: 16 }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              style={{
                width: "100%", padding: 10, borderRadius: 8, border: "1px solid #23233a", background: "#23233a", color: "#fff", marginBottom: 8
              }}
            />
            <button
              type="button"
              onClick={handleReset}
              style={{
                width: "100%",
                padding: 10,
                background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer"
              }}
            >
              Send Reset Email
            </button>
            {resetMsg && <div style={{ color: "#22c55e", marginTop: 8 }}>{resetMsg}</div>}
            {resetError && <div style={{ color: "#ef4444", marginTop: 8 }}>{resetError}</div>}
          </div>
        )}
        <div style={{ marginTop: 10, fontSize: 15, color: "#a0a0a0" }}>
          Don't have an account? <a href="/signup" style={{ color: "#38bdf8", fontWeight: 600 }}>Sign Up</a>
        </div>
      </form>
    </div>
  );
} 