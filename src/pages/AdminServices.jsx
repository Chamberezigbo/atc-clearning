import ServiceManager from "../admin/ServiceManager";

function AdminServices() {
  return (
    <div>
      <h1>Services</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        Manage the cleaning services and prices customers can book.
      </p>
      <ServiceManager />
    </div>
  );
}

export default AdminServices;
