"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// Real-time data simulation
const getCurrentTime = () => new Date().toLocaleString();
const getCurrentIP = () => "192.168.1." + Math.floor(Math.random() * 255);
const getCurrentDevice = () => {
  const devices = ["Chrome/Windows", "Safari/iPhone", "Edge/Windows", "Firefox/Mac", "Chrome/Android"];
  return devices[Math.floor(Math.random() * devices.length)];
};

// Notifications data
const notifications = [
  { id: 1, type: "security", message: "New login detected from unknown device", time: "2 min ago", read: false },
  { id: 2, type: "info", message: "Your account has been verified successfully", time: "1 hour ago", read: true },
  { id: 3, type: "warning", message: "Please update your password for security", time: "1 day ago", read: true },
];

// Security events
const securityEvents = [
  { id: 1, event: "Login successful", time: "Just now", ip: getCurrentIP(), device: getCurrentDevice() },
  { id: 2, event: "Password changed", time: "2 days ago", ip: "192.168.1.100", device: "Chrome/Windows" },
  { id: 3, event: "Email verified", time: "3 days ago", ip: "192.168.1.101", device: "Safari/iPhone" },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: user?.displayName || "User",
    email: user?.email || "",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    timezone: "UTC-5",
    language: "English"
  });
  const [deviceInfo, setDeviceInfo] = useState("");
  const [ip, setIp] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [resetError, setResetError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setDeviceInfo(navigator.userAgent);
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp("Unknown"));
  }, []);

  const handleProfileUpdate = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...userProfile,
        updatedAt: new Date()
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  const handlePasswordChange = () => {
    alert("Password change functionality would be implemented here");
  };

  const handleTwoFactorAuth = () => {
    alert("Two-factor authentication setup would be implemented here");
  };

  const handleExportData = () => {
    const data = {
      user: userProfile,
      loginHistory: securityEvents,
      notifications: notifications
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-data.json';
    a.click();
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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  if (loading) return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f0f23",
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
      background: "#0f0f23",
      padding: 0,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Main Content Wrapper */}
      <div style={{ flex: 1, padding: 16 }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          background: "#1a1a2e",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          border: "1px solid #2d2d44"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700
                }}>{initials}</div>
              )}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>
                {user.displayName || user.email}
              </div>
              <div style={{ color: "#a0a0a0", fontSize: 14 }}>{currentTime}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{
              padding: "8px 16px", background: "#f59e42", color: "#fff", border: "none",
              borderRadius: 6, fontWeight: 600, cursor: "pointer"
            }}>
              🔔 Notifications ({notifications.filter(n => !n.read).length})
            </button>
            <button onClick={() => setShowLogoutModal(true)} style={{
              padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none",
              borderRadius: 6, fontWeight: 600, cursor: "pointer"
            }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>
          {/* Main Content */}
          <div>
            {/* Quick Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16, marginBottom: 24
            }}>
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                border: "1px solid #2d2d44"
              }}>
                <div style={{ fontSize: 14, color: "#a0a0a0", marginBottom: 8 }}>Account Type</div>
                <div style={{ fontWeight: 700, fontSize: 24, color: "#6366f1" }}>Premium</div>
              </div>
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                border: "1px solid #2d2d44"
              }}>
                <div style={{ fontSize: 14, color: "#a0a0a0", marginBottom: 8 }}>Security Score</div>
                <div style={{ fontWeight: 700, fontSize: 24, color: "#22c55e" }}>95%</div>
              </div>
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                border: "1px solid #2d2d44"
              }}>
                <div style={{ fontSize: 14, color: "#a0a0a0", marginBottom: 8 }}>Active Sessions</div>
                <div style={{ fontWeight: 700, fontSize: 24, color: "#0ea5e9" }}>3</div>
              </div>
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                border: "1px solid #2d2d44"
              }}>
                <div style={{ fontSize: 14, color: "#a0a0a0", marginBottom: 8 }}>Last Login</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#6366f1" }}>Just now</div>
              </div>
            </div>

            {/* Current Session Info Table */}
            <div style={{
              background: "#1a1a2e",
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "1px solid #2d2d44"
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#6366f1", marginBottom: 16 }}>
                🖥️ Current Session Info
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#18182a", color: "#f4f4f5", borderRadius: 8 }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #23233a" }}>
                    <td style={{ padding: "10px 12px", color: "#a0a0a0", fontWeight: 600, width: 120 }}>IP Address</td>
                    <td style={{ padding: "10px 12px" }}>{ip}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "10px 12px", color: "#a0a0a0", fontWeight: 600 }}>Device</td>
                    <td style={{ padding: "10px 12px" }}>{deviceInfo}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap"
            }}>
              <button onClick={() => setShowSettings(true)} style={{
                padding: "12px 20px", background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
                color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer"
              }}>
                ⚙️ Settings
              </button>
              <button onClick={() => setShowSecurity(true)} style={{
                padding: "12px 20px", background: "#22c55e", color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 600, cursor: "pointer"
              }}>
                🔒 Security
              </button>
              <button onClick={handleExportData} style={{
                padding: "12px 20px", background: "#8b5cf6", color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 600, cursor: "pointer"
              }}>
                📊 Export Data
              </button>
              <button onClick={() => window.open('https://console.firebase.google.com', '_blank')} style={{
                padding: "12px 20px", background: "#f59e42", color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 600, cursor: "pointer"
              }}>
                🔥 Firebase Console
              </button>
            </div>

            {/* Security Events */}
            <div style={{
              background: "#1a1a2e", borderRadius: 12, padding: 20, marginBottom: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid #2d2d44"
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#6366f1", marginBottom: 16 }}>
                🔒 Security Events
              </div>
              <div style={{ maxHeight: 300, overflowY: "auto" }}>
                {securityEvents.map((event) => (
                  <div key={event.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 0", borderBottom: "1px solid #2d2d44"
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{event.event}</div>
                      <div style={{ fontSize: 14, color: "#a0a0a0" }}>{event.ip} • {event.device}</div>
                    </div>
                    <div style={{ fontSize: 14, color: "#888" }}>{event.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Chart */}
            <div style={{
              background: "#1a1a2e", borderRadius: 12, padding: 20, marginBottom: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid #2d2d44"
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#6366f1", marginBottom: 16 }}>
                📈 Login Activity (Last 7 Days)
              </div>
              <svg width="100%" height="120" viewBox="0 0 400 120">
                <polyline
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  points="0,100 50,80 100,90 150,60 200,40 250,70 300,50 350,30"
                />
                <circle cx="0" cy="100" r="4" fill="#6366f1" />
                <circle cx="50" cy="80" r="4" fill="#6366f1" />
                <circle cx="100" cy="90" r="4" fill="#6366f1" />
                <circle cx="150" cy="60" r="4" fill="#6366f1" />
                <circle cx="200" cy="40" r="4" fill="#6366f1" />
                <circle cx="250" cy="70" r="4" fill="#6366f1" />
                <circle cx="300" cy="50" r="4" fill="#6366f1" />
                <circle cx="350" cy="30" r="4" fill="#6366f1" />
              </svg>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Notifications Panel */}
            {showNotifications && (
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, marginBottom: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid #2d2d44"
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#6366f1", marginBottom: 12 }}>
                  🔔 Notifications
                </div>
                {notifications.map((notification) => (
                  <div key={notification.id} style={{
                    padding: "8px 0", borderBottom: "1px solid #2d2d44",
                    opacity: notification.read ? 0.7 : 1
                  }}>
                    <div style={{ fontSize: 14, color: "#fff", marginBottom: 4 }}>
                      {notification.message}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>{notification.time}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Settings Panel */}
            {showSettings && (
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, marginBottom: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid #2d2d44"
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#6366f1", marginBottom: 12 }}>
                  ⚙️ Profile Settings
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    style={{ 
                      padding: "8px 12px", 
                      border: "1px solid #2d2d44", 
                      borderRadius: 6, 
                      background: "#0f0f23",
                      color: "#fff"
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    style={{ 
                      padding: "8px 12px", 
                      border: "1px solid #2d2d44", 
                      borderRadius: 6,
                      background: "#0f0f23",
                      color: "#fff"
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    style={{ 
                      padding: "8px 12px", 
                      border: "1px solid #2d2d44", 
                      borderRadius: 6,
                      background: "#0f0f23",
                      color: "#fff"
                    }}
                  />
                  <button onClick={handleProfileUpdate} style={{
                    padding: "8px 16px", background: "#22c55e", color: "#fff", border: "none",
                    borderRadius: 6, fontWeight: 600, cursor: "pointer"
                  }}>
                    Update Profile
                  </button>
                </div>
              </div>
            )}

            {/* Security Panel */}
            {showSecurity && (
              <div style={{
                background: "#1a1a2e", borderRadius: 12, padding: 20, marginBottom: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid #2d2d44"
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#6366f1", marginBottom: 12 }}>
                  🔒 Security Settings
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button onClick={handlePasswordChange} style={{
                    padding: "8px 12px", background: "#f59e42", color: "#fff", border: "none",
                    borderRadius: 6, fontWeight: 600, cursor: "pointer", textAlign: "left"
                  }}>
                    🔑 Change Password
                  </button>
                  <button onClick={handleTwoFactorAuth} style={{
                    padding: "8px 12px", background: "#8b5cf6", color: "#fff", border: "none",
                    borderRadius: 6, fontWeight: 600, cursor: "pointer", textAlign: "left"
                  }}>
                    🔐 Two-Factor Auth
                  </button>
                  <button style={{
                    padding: "8px 12px", background: "#ef4444", color: "#fff", border: "none",
                    borderRadius: 6, fontWeight: 600, cursor: "pointer", textAlign: "left"
                  }}>
                    🚫 Sign Out All Devices
                  </button>
                </div>
              </div>
            )}

            {/* System Status */}
            <div style={{
              background: "#1a1a2e", borderRadius: 12, padding: 20, marginBottom: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)", border: "1px solid #2d2d44"
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#6366f1", marginBottom: 12 }}>
                🖥️ System Status
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, color: "#a0a0a0" }}>Firebase Auth</span>
                  <span style={{ color: "#22c55e", fontWeight: 600 }}>✅ Online</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, color: "#a0a0a0" }}>Firestore DB</span>
                  <span style={{ color: "#22c55e", fontWeight: 600 }}>✅ Online</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, color: "#a0a0a0" }}>Vercel Deploy</span>
                  <span style={{ color: "#22c55e", fontWeight: 600 }}>✅ Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Logout Modal */}
      {showLogoutModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(15,15,35,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#18182a",
            borderRadius: 14,
            padding: 36,
            minWidth: 320,
            boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
            border: "1px solid #23233a",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#a5b4fc", marginBottom: 18 }}>
              Are you sure you want to logout?
            </div>
            <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
              <button
                onClick={() => { setShowLogoutModal(false); logout(); }}
                style={{
                  padding: "10px 28px",
                  background: "linear-gradient(90deg, #6366f1 0%, #0ea5e9 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer"
                }}
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: "10px 28px",
                  background: "#23233a",
                  color: "#a0a0a0",
                  border: "1px solid #23233a",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 