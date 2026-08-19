import ChangePasswordForm from "../admin/ChangePasswordForm";

function AdminSettings() {
  return (
    <div>
      <h1>Settings</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Manage your admin account.
      </p>
      <ChangePasswordForm />
    </div>
  );
}

export default AdminSettings;
