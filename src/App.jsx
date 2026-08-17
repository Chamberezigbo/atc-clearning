import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CleanSwipeLoader from "./components/CleanSwipeLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import TestimonialsPage from "./pages/TestimonialsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startExitTimer = window.setTimeout(() => setIsExiting(true), 1200);
    const removeLoaderTimer = window.setTimeout(
      () => setIsLoading(false),
      1550,
    );

    return () => {
      window.clearTimeout(startExitTimer);
      window.clearTimeout(removeLoaderTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        {isLoading && <CleanSwipeLoader isExiting={isExiting} />}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
