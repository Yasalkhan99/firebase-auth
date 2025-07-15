"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

// Sample static data for recent logins
const recentLogins = [
  { time: "2025-07-16 01:00", ip: "192.168.1.2", device: "Chrome/Windows" },
  { time: "2025-07-15 22:30", ip: "192.168.1.3", device: "Safari/iPhone" },
  { time: "2025-07-15 18:10", ip: "192.168.1.4", device: "Edge/Windows" },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
      color: "#fff",
      fontSize: 22
    }}>
      Loading...
    </div>
  );
  if (!user) return null;

  // Avatar logic
  const avatarUrl = user.photoURL;
  const initials = user.displayName
    ? user.displayName.split(" ").map(n => n[0]).join("").toUpperCase()
    : user.email[0].toUpperCase();
  const isVerified = user.emailVerified;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
      padding: 16
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        padding: 40,
        maxWidth: 800,
        width: "100%",
        textAlign: "center"
      }}>
        {/* Welcome & Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid #6366f1" }} />
            ) : (
              <div style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 700,
                border: "3px solid #6366f1"
              }}>{initials}</div>
            )}
            {/* Email verified badge */}
            <span style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: isVerified ? "#22c55e" : "#f59e42",
              color: "#fff",
              borderRadius: "50%",
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              border: "2px solid #fff",
              boxShadow: "0 1px 4px rgba(99,102,241,0.10)"
            }} title={isVerified ? "Email Verified" : "Email Not Verified"}>
              {isVerified ? "✔" : "!"}
            </span>
          </div>
          <div style={{ textAlign: "left", minWidth: 220 }}>
            <div style={{ fontWeight: 700, fontSize: 22, color: "#6366f1" }}>
              Welcome, {user.displayName || user.email}!
            </div>
            <div style={{ color: "#555", fontSize: 16, marginBottom: 6 }}>{user.email}</div>
            <div style={{ color: isVerified ? "#22c55e" : "#f59e42", fontWeight: 600, fontSize: 15 }}>
              {isVerified ? "Email Verified" : "Email Not Verified"}
            </div>
          </div>
        </div>
        {/* Motivational Quote */}
        <div style={{ fontStyle: "italic", color: "#0ea5e9", marginBottom: 24, fontSize: 17 }}>
          "The best way to get started is to quit talking and begin doing." – Walt Disney
        </div>
        {/* Quick Actions */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          <button style={{
            padding: "10px 24px",
            background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(99,102,241,0.08)"
          }}>Update Profile</button>
          <button style={{
            padding: "10px 24px",
            background: "#f59e42",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(245,158,66,0.08)"
          }}>Change Password</button>
          <button style={{
            padding: "10px 24px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(239,68,68,0.08)"
          }}>Sign Out All Devices</button>
          <button onClick={logout} style={{
            padding: "10px 24px",
            background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(99,102,241,0.08)"
          }}>Logout</button>
        </div>
        {/* Stats Section */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 18,
          marginBottom: 24,
          flexWrap: "wrap"
        }}>
          <div style={{
            flex: 1,
            minWidth: 140,
            background: "#f1f5f9",
            borderRadius: 10,
            padding: 18,
            boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 15, color: "#888" }}>Account Type</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#6366f1" }}>Standard</div>
          </div>
          <div style={{
            flex: 1,
            minWidth: 140,
            background: "#f1f5f9",
            borderRadius: 10,
            padding: 18,
            boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 15, color: "#888" }}>Last Login</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#6366f1" }}>Just now</div>
          </div>
          <div style={{
            flex: 1,
            minWidth: 140,
            background: "#f1f5f9",
            borderRadius: 10,
            padding: 18,
            boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 15, color: "#888" }}>Status</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#22c55e" }}>Active</div>
          </div>
        </div>
        {/* Sample Chart (static) */}
        <div style={{
          background: "#f9fafb",
          borderRadius: 10,
          padding: 18,
          marginBottom: 28,
          boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
          textAlign: "left"
        }}>
          <div style={{ fontWeight: 600, color: "#6366f1", marginBottom: 8 }}>Login Activity (Sample)</div>
          <svg width="100%" height="60" viewBox="0 0 300 60">
            <polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              points="0,50 40,40 80,45 120,30 160,20 200,35 240,25 280,10"
            />
            <circle cx="0" cy="50" r="4" fill="#6366f1" />
            <circle cx="40" cy="40" r="4" fill="#6366f1" />
            <circle cx="80" cy="45" r="4" fill="#6366f1" />
            <circle cx="120" cy="30" r="4" fill="#6366f1" />
            <circle cx="160" cy="20" r="4" fill="#6366f1" />
            <circle cx="200" cy="35" r="4" fill="#6366f1" />
            <circle cx="240" cy="25" r="4" fill="#6366f1" />
            <circle cx="280" cy="10" r="4" fill="#6366f1" />
          </svg>
        </div>
        {/* Recent Logins Table */}
        <div style={{
          background: "#f9fafb",
          borderRadius: 10,
          padding: 18,
          marginBottom: 10,
          boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
          textAlign: "left"
        }}>
          <div style={{ fontWeight: 600, color: "#6366f1", marginBottom: 8 }}>Recent Logins</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
            <thead>
              <tr style={{ color: "#888", fontWeight: 700 }}>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Time</th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>IP</th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Device</th>
              </tr>
            </thead>
            <tbody>
              {recentLogins.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "6px 8px" }}>{row.time}</td>
                  <td style={{ padding: "6px 8px" }}>{row.ip}</td>
                  <td style={{ padding: "6px 8px" }}>{row.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 