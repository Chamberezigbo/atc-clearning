import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./pageFlip.module.css";

const FLIP_MS = 320;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function PublicLayout() {
  const [isFlippingOut, setIsFlippingOut] = useState(false);
  const navigate = useNavigate();

  // Passed down to Header so the triple-tap gesture can flip the WHOLE
  // page (this layout wraps Header + the routed page + Footer) rather
  // than just the small logo image — Header itself no longer knows
  // about navigation or animation, it just reports the gesture up.
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
        <Header onAdminTripleTap={() => flipTo("/admin/login")} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default PublicLayout;
