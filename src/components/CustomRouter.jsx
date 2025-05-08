// src/components/CustomRouter.jsx
import { HashRouter, BrowserRouter } from "react-router-dom";

const CustomRouter = ({ children }) => {
  // Use HashRouter for GitHub Pages, BrowserRouter for Vercel
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
};

export default CustomRouter;
