import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import bMarkImage from "../assets/logo.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`flex items-center gap-1.5 cursor-pointer group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`relative ${className}`}>
        <img
          src={bMarkImage}
          alt=""
          className="h-full w-auto object-contain transition-transform duration-300 group-hover:rotate-6"
        />
        <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span
        className="font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary"
        style={{
          color: theme === "dark" ? "#ffffff" : "#1a1a2e",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.25rem",
          letterSpacing: "-0.02em",
        }}
      >
        BridgeFlow
      </span>
    </motion.div>
  );
}
