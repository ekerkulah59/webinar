import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PastWebinars from "./pages/PastWebinars";
import Courses from "./pages/Courses";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/past-webinars" component={PastWebinars} />
      <Route path="/courses" component={Courses} />
      <Route path="/insights" component={Blog} />
      <Route path="/insights/:slug" component={BlogPost} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = decodeURIComponent(hash.replace("#", ""));
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <TooltipProvider>
          <Toaster />
          <ScrollManager />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
