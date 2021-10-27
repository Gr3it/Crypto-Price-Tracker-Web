import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.scrollTo({ top: 0, behavior: "auto" });
    document.documentElement.style.scrollBehavior = "";
  }, [pathname]);

  return null;
}
