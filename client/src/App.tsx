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
import CourseDetail from "./pages/CourseDetail";
import CustomAIAssistant from "./pages/CustomAIAssistant";
import BookAppointment from "./pages/BookAppointment";
import ManageAppointment from "./pages/ManageAppointment";
import ForOrganizations from "./pages/ForOrganizations";
import Pilot from "./pages/Pilot";
import HowItWorks from "./pages/HowItWorks";
import Results from "./pages/Results";

import Offers from "./pages/Offers";
import IndividualLearning from "./pages/IndividualLearning";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SiteAnalytics from "./components/SiteAnalytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/offers" component={Offers} />
      <Route path="/individual-learning" component={IndividualLearning} />
      <Route path="/about" component={About} />
      <Route path="/resources" component={Resources} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/pilot" component={Pilot} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/results" component={Results} />
      <Route path="/for-organizations" component={ForOrganizations} />
      <Route path="/custom-ai-assistant" component={CustomAIAssistant} />
      <Route path="/past-webinars" component={PastWebinars} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:slug" component={CourseDetail} />
      <Route path="/insights" component={Blog} />
      <Route path="/insights/:slug" component={BlogPost} />
      <Route path="/book" component={BookAppointment} />
      <Route path="/appointment/:token" component={ManageAppointment} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollManager() {
  const [location, navigate] = useLocation();
  useEffect(() => {
    let frame = 0;
    const scrollToDestination = () => {
      // Preserve workshop links already shared in articles and campaigns.
      if (
        window.location.pathname === "/" &&
        window.location.hash === "#upcoming"
      ) {
        navigate("/individual-learning#upcoming", { replace: true });
        return;
      }
      frame = window.requestAnimationFrame(() => {
        const main =
          document.querySelector("main") ||
          document.querySelector("header")?.nextElementSibling;
        if (main instanceof HTMLElement && main.tagName !== "FOOTER") {
          main.id = "main-content";
          main.tabIndex = -1;
        }
        const hash = window.location.hash.slice(1);
        let targetId = hash;
        try {
          targetId = decodeURIComponent(hash);
        } catch {
          /* A malformed fragment should not break navigation. */
        }
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          target.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
            block: "start",
          });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    };
    scrollToDestination();
    window.addEventListener("hashchange", scrollToDestination);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToDestination);
    };
  }, [location, navigate]);
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
          <SiteAnalytics />
          {/* Restore the assistant after its knowledge base and service are verified. */}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
