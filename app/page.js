import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f23",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 0
    }}>
      {/* Hero Section */}
      <div style={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        padding: "64px 24px 32px 24px",
        background: "#18182a",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
        border: "1px solid #23233a"
      }}>
        <div style={{
          fontSize: 44,
          fontWeight: 800,
          color: "#a5b4fc",
          marginBottom: 18,
          letterSpacing: 1
        }}>
          Firebase Authenticator
        </div>
        <div style={{
          fontSize: 20,
          color: "#a0a0a0",
          marginBottom: 32,
          fontWeight: 500
        }}>
          Secure, modern authentication for your Next.js apps.<br />
          Sign up, log in, and access your protected dashboard.
        </div>
        <div style={{ display: "flex", gap: 18, justifyContent: "center", marginBottom: 16 }}>
          <a href="/signup" style={{
            padding: "14px 36px",
            background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
            color: "#fff",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 18,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(99,102,241,0.10)",
            transition: "background 0.2s, color 0.2s"
          }}>Sign Up</a>
          <a href="/login" style={{
            padding: "14px 36px",
            background: "#23233a",
            color: "#a5b4fc",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 18,
            textDecoration: "none",
            border: "1px solid #23233a",
            boxShadow: "0 2px 8px rgba(99,102,241,0.10)",
            transition: "background 0.2s, color 0.2s"
          }}>Login</a>
        </div>
      </div>
    </div>
  );
}
