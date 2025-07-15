import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        padding: 40,
        maxWidth: 400,
        width: "100%",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, color: "#0ea5e9", letterSpacing: 1 }}>Firebase Authenticator</h1>
        <p style={{ fontSize: 17, color: "#555", marginBottom: 32 }}>
          A modern Next.js app with Firebase Authentication.<br />
          Sign up, log in, and access your protected dashboard.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          <a href="/signup" style={{
            padding: "12px 0",
            background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            transition: "box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
            letterSpacing: 0.5
          }}>Sign Up</a>
          <a href="/login" style={{
            padding: "12px 0",
            background: "linear-gradient(90deg, #0ea5e9 0%, #6366f1 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            transition: "box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(14,165,233,0.08)",
            letterSpacing: 0.5
          }}>Login</a>
          <a href="/dashboard" style={{
            padding: "12px 0",
            background: "#f59e42",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            transition: "box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(245,158,66,0.08)",
            letterSpacing: 0.5
          }}>Dashboard</a>
        </div>
        <footer style={{ marginTop: 16, color: "#aaa", fontSize: 14 }}>
          &copy; {new Date().getFullYear()} Firebase Authenticator Demo
      </footer>
      </div>
    </div>
  );
}
