import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Firebase Authenticator",
  description: "A modern Next.js app with Firebase Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        minHeight: "100vh",
        margin: 0,
        background: "#0f0f23",
        fontFamily: 'Inter, sans-serif',
      }}>
        <AuthProvider>
          <header style={{
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#18182a",
            boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
            padding: "0.5rem 0",
            marginBottom: 32,
            borderBottom: "1px solid #23233a"
          }}>
            <nav style={{
              maxWidth: 900,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px"
            }}>
              <a href="/" style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 800,
                fontSize: 22,
                color: "#a5b4fc",
                letterSpacing: 1,
                textDecoration: "none"
              }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 18,
                  boxShadow: "0 2px 8px rgba(99,102,241,0.10)"
                }}>F</span>
                Firebase Authenticator
              </a>
              <div style={{ display: "flex", gap: 18 }}>
                <a href="/signup" className="nav-link" style={{
                  color: "#38bdf8",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "8px 18px",
                  borderRadius: 8,
                  transition: "background 0.2s, color 0.2s",
                  background: "transparent"
                }}>Sign Up</a>
                <a href="/login" className="nav-link" style={{
                  color: "#a5b4fc",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "8px 18px",
                  borderRadius: 8,
                  transition: "background 0.2s, color 0.2s",
                  background: "transparent"
                }}>Login</a>
                <a href="/dashboard" className="nav-link" style={{
                  color: "#f59e42",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "8px 18px",
                  borderRadius: 8,
                  transition: "background 0.2s, color 0.2s",
                  background: "transparent"
                }}>Dashboard</a>
              </div>
            </nav>
          </header>
          <main style={{ minHeight: "80vh" }}>{children}</main>
          <footer style={{
            width: "100%",
            textAlign: "center",
            color: "#a0a0a0",
            fontSize: 15,
            padding: "24px 0 12px 0",
            background: "#18182a",
            borderTop: "1px solid #23233a"
          }}>
            &copy; {new Date().getFullYear()} Firebase Authenticator Demo
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
