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
      className={`${className} transition-all duration-300 ${
        theme === "dark" 
          ? "brightness-110 contrast-110" 
          : "brightness-100"
      }`}
    />
  );
}
