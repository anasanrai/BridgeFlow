import { motion } from "framer-motion";

interface GradientBackgroundProps {
  variant?: "hero" | "section" | "cta";
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ 
  variant = "section", 
  children, 
  className = "" 
}: GradientBackgroundProps) {
  if (variant === "hero") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (variant === "cta") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, transparent 50%, hsl(var(--accent) / 0.05) 100%)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background/50" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
