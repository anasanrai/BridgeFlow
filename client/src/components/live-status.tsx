import { motion } from "framer-motion";

interface LiveStatusProps {
  text?: string;
  className?: string;
}

export function LiveStatus({ text = "Online", className = "" }: LiveStatusProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.75, 0.25, 0.75],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="text-xs text-muted-foreground font-medium">{text}</span>
    </div>
  );
}

export function FloatingOrb({ 
  className = "", 
  color = "primary",
  size = "md",
  delay = 0 
}: { 
  className?: string;
  color?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  delay?: number;
}) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const colorClasses = {
    primary: "bg-primary/20",
    accent: "bg-accent/20",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function AnimatedCounter({ 
  value, 
  suffix = "",
  prefix = "",
  className = "" 
}: { 
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  );
}
