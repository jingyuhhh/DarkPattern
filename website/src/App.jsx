// App.jsx
import "./App.css";
import AppRoutes from "./routes";
import { useEffect, useRef } from "react";
import { useLocation, HashRouter as Router } from "react-router-dom";
import { initLogger, uploadLogToFirebase } from "./logger";

function AppContent() {
  useEffect(() => {
    initLogger();
  }, []);

  return <AppRoutes />;
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
