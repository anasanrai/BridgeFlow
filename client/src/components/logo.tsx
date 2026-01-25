import { useTheme } from "@/components/theme-provider";
import bMarkImage from "@assets/new_B_1769319306959.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <img 
        src={bMarkImage} 
        alt="" 
        className="h-full w-auto object-contain"
      />
      <span 
        className="font-semibold tracking-tight transition-colors duration-300"
        style={{
          color: theme === "dark" ? "#ffffff" : "#1a1a2e",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.25rem",
          letterSpacing: "-0.02em",
        }}
      >
        BridgeFlow
      </span>
    </div>
  );
}
