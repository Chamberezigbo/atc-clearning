import { useAuth } from "../context/AuthContext";
import NewsManager from "../admin/NewsManager";

function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="container section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Log Out</button>
      </div>

      <h2>News</h2>
      <NewsManager />

      <p style={{ marginTop: "2rem", color: "var(--color-text-muted)" }}>
        Testimonials, leads, and invoice management arrive in later phases.
      </p>
    </div>
  );
}

export default AdminDashboard;
