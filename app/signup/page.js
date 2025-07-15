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
      background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          padding: 36,
          maxWidth: 400,
          width: "100%",
          textAlign: "center"
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#6366f1", marginBottom: 18 }}>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            width: "100%", padding: 12, marginBottom: 14, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 16
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: "100%", padding: 12, marginBottom: 14, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 16
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: "100%", padding: 12, marginBottom: 18, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 16
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
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div style={{ marginTop: 10, fontSize: 15 }}>
          Already have an account? <a href="/login" style={{ color: "#0ea5e9", fontWeight: 600 }}>Login</a>
        </div>
      </form>
    </div>
  );
} 