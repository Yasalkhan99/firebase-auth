"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
      <form onSubmit={handleSubmit} style={{
        background: "#18182a",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
        padding: 36,
        maxWidth: 400,
        width: "100%",
        textAlign: "center",
        border: "1px solid #23233a"
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#a5b4fc", marginBottom: 18 }}>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            width: "100%", padding: 12, marginBottom: 14, borderRadius: 8, border: "1px solid #23233a", fontSize: 16, background: "#23233a", color: "#fff"
          }}
        />
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
        <button type="submit" disabled={loading} style={{
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
        }}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div style={{ marginTop: 10, fontSize: 15, color: "#a0a0a0" }}>
          Already have an account? <a href="/login" style={{ color: "#38bdf8", fontWeight: 600 }}>Login</a>
        </div>
      </form>
    </div>
  );
} 