import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: 60 }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Firebase Authenticator</h1>
      <p style={{ fontSize: 18, marginBottom: 32 }}>
        A Next.js demo app with Firebase Authentication.<br />
        Sign up, log in, and access your protected dashboard.
      </p>
      <div style={{ marginBottom: 24 }}>
        <a href="/signup" style={{
          display: "inline-block",
          margin: "0 12px",
          padding: "12px 28px",
          background: "#0070f3",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: 600
        }}>Sign Up</a>
        <a href="/login" style={{
          display: "inline-block",
          margin: "0 12px",
          padding: "12px 28px",
          background: "#22c55e",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: 600
        }}>Login</a>
        <a href="/dashboard" style={{
          display: "inline-block",
          margin: "0 12px",
          padding: "12px 28px",
          background: "#f59e42",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
          fontWeight: 600
        }}>Dashboard</a>
      </div>
      <footer style={{ marginTop: 40, color: "#888" }}>
        &copy; {new Date().getFullYear()} Firebase Authenticator Demo
      </footer>
    </main>
  );
}
