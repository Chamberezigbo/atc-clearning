import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main className="container section">
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
