import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a premium feel
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
