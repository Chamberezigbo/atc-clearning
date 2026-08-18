import LeadsManager from "../admin/LeadsManager";

function AdminLeads() {
  return (
    <div>
      <h1>Leads</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        People who submitted their details before chatting on WhatsApp.
      </p>
      <LeadsManager />
    </div>
  );
}

export default AdminLeads;
