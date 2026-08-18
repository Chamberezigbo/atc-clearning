import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CleanSwipeLoader from "./components/CleanSwipeLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import TestimonialsPage from "./pages/TestimonialsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminLeads from "./pages/AdminLeads";

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
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/testimonials"
              element={
                <ProtectedRoute>
                  <AdminTestimonials />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedRoute>
                  <AdminLeads />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
