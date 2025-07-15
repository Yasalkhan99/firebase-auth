"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Dashboard</h2>
      <p>Welcome, <b>{user.displayName || user.email}</b>!</p>
      <p>Email: {user.email}</p>
      <button onClick={logout} style={{ marginTop: 20, padding: 10 }}>
        Logout
      </button>
    </div>
  );
} 