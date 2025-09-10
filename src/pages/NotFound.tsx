import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-8xl font-bold hero-gradient bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Oops! The anime you're looking for seems to have gone on an adventure.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 button-gradient button-shadow text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
