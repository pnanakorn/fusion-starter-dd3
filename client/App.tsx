import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ParentDashboard from "./pages/ParentDashboard";
import ParentProfile from "./pages/ParentProfile";
import IndividualReport from "./pages/IndividualReport";
import ParentProgress from "./pages/ParentProgress";
import ParentSessions from "./pages/ParentSessions";
import PatientTrends from "./pages/PatientTrends";
import TherapistProfile from "./pages/TherapistProfile";
import GroupMetrics from "./pages/GroupMetrics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/parent/profile" element={<ParentProfile />} />
          <Route path="/parent/progress" element={<ParentProgress />} />
          <Route path="/parent/sessions" element={<ParentSessions />} />
          <Route path="/reports" element={<GroupMetrics />} />
          <Route path="/reports/:id" element={<GroupMetrics />} />
          <Route path="/individual/:id" element={<IndividualReport />} />
          <Route path="/patient-trends" element={<PatientTrends />} />
          <Route path="/therapist/profile" element={<TherapistProfile />} />
          <Route path="/group-metrics" element={<GroupMetrics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
