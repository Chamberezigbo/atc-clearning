import NewsManager from "../admin/NewsManager";

function AdminDashboard() {
  return (
    <div>
      <h1>News</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Create, edit, and publish news posts.
      </p>
      <NewsManager />
    </div>
  );
}

export default AdminDashboard;
