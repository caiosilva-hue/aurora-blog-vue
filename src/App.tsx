import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import PostsList from "./pages/PostsList";
import ArticleCreate from "./pages/ArticleCreate";
import ArticleEdit from "./pages/ArticleEdit";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/criar-artigo" element={<ProtectedRoute><ArticleCreate /></ProtectedRoute>} />
          <Route path="/editar-artigo/:id" element={<ProtectedRoute><ArticleEdit /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
