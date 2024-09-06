import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 0) {
          window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    const timeoutId = setTimeout(scrollToTop, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
