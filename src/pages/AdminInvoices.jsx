import InvoiceManager from "../admin/InvoiceManager";

function AdminInvoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Generate, download, and email invoices to clients.
      </p>
      <InvoiceManager />
    </div>
  );
}

export default AdminInvoices;
