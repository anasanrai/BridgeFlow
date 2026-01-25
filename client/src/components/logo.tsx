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
          ? "brightness(1.2) drop-shadow(0 0 8px rgba(28, 160, 242, 0.3))" 
          : "brightness(0.9) contrast(1.1)",
      }}
    />
  );
}
