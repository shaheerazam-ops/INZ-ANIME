import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Genres from "./pages/Genres";
import SearchPage from "./pages/SearchPage";
import RecentlyViewed from "./pages/RecentlyViewed";
import About from "./pages/About";
import StreamingPage from "./pages/StreamingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recent" element={<RecentlyViewed />} />
          <Route path="/about" element={<About />} />
          <Route path="/stream/:animeId/:episodeId" element={<StreamingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
