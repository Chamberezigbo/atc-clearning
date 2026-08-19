import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import styles from "./pageFlip.module.css";

const FLIP_MS = 320;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function AdminLayout() {
  const [isFlippingOut, setIsFlippingOut] = useState(false);
  const navigate = useNavigate();

  function flipTo(path) {
    if (prefersReducedMotion()) {
      navigate(path);
      return;
    }
    setIsFlippingOut(true);
    setTimeout(() => navigate(path), FLIP_MS);
  }

  return (
    <div className={styles.stage}>
      <div className={`${styles.flip} ${isFlippingOut ? styles.flipOut : ""}`}>
        <AdminHeader onLogoClickHome={() => flipTo("/")} />
        <main className="container section">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
