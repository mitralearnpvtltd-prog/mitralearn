import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { getSlugFromSubmoduleId } from "@/data/curriculum";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Curriculum from "./pages/Curriculum";
import Day from "./pages/Day";
import Dashboard from "./pages/Dashboard";
import Certificate from "./pages/Certificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminUsers from "./components/admin/AdminUsers";
import AdminCourses from "./components/admin/AdminCourses";
import AdminCertificates from "./components/admin/AdminCertificates";
import AdminReports from "./components/admin/AdminReports";

// Legacy redirect component for old URLs
const LegacyRedirect = () => {
  const { submoduleId } = useParams<{ submoduleId: string }>();
  const slug = submoduleId ? getSlugFromSubmoduleId(submoduleId) : undefined;
  
  if (slug) {
    return <Navigate to={`/curriculum/lesson/${slug}`} replace />;
  }
  return <Navigate to="/curriculum" replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/curriculum/lesson/:slug" element={<Day />} />
            <Route path="/curriculum/submodule/:submoduleId" element={<LegacyRedirect />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/verify-certificate/:certificateId" element={<VerifyCertificate />} />
            <Route path="/verify-certificate" element={<VerifyCertificate />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="reports" element={<AdminReports />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;
