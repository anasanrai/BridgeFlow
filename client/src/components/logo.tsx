import { useTheme } from "@/components/theme-provider";
import logoImage from "@assets/New_02_1769317320002.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  const { theme } = useTheme();

  return (
    <img 
      src={logoImage} 
      alt="BridgeFlow" 
      className={`${className} transition-all duration-300`}
      style={{
        filter: theme === "dark" 
          ? "brightness(2) contrast(1.1) drop-shadow(0 0 6px rgba(28, 160, 242, 0.4))" 
          : "none",
      }}
    />
  );
}
