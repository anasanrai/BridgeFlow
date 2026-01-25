import { useTheme } from "@/components/theme-provider";
import logoImage from "@assets/New_02_1769317320002.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8" }: LogoProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoImage} 
        alt="BridgeFlow" 
        className="h-full w-auto object-contain"
        style={{
          clipPath: "inset(0 65% 0 0)",
          marginRight: "-1rem",
        }}
      />
      <span 
        className="font-semibold text-lg tracking-tight transition-colors duration-300"
        style={{
          color: theme === "dark" ? "#ffffff" : "#1a1a2e",
          fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
        }}
      >
        BridgeFlow
      </span>
    </div>
  );
}
