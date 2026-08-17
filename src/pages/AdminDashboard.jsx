import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="container section">
      <h1>Admin Dashboard</h1>
      <p>
        News, testimonials, leads, and invoices management arrive in later
        phases.
      </p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default AdminDashboard;
