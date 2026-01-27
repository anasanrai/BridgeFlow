import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2,
  className = "" 
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  pauseDuration?: number;
}

export function TypewriterText({ 
  texts, 
  className = "",
  speed = 100,
  pauseDuration = 2000
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentFullText.length) {
          setDisplayText(currentFullText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentFullText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, isPaused, currentTextIndex, texts, speed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  );
}

interface PulsingTextProps {
  children: React.ReactNode;
  className?: string;
}

export function PulsingText({ children, className = "" }: PulsingTextProps) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{ 
        scale: [1, 1.02, 1],
        opacity: [1, 0.9, 1]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  );
}

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "gold";
  showCursor?: boolean;
}

export function GlowingText({ children, className = "", color = "primary", showCursor = false }: GlowingTextProps) {
  const glowColors = color === "gold" 
    ? {
        subtle: "0 0 10px hsl(45 93% 47% / 0.5), 0 0 20px hsl(38 92% 60% / 0.3)",
        bright: "0 0 20px hsl(45 93% 47% / 0.8), 0 0 40px hsl(38 92% 60% / 0.5)"
      }
    : {
        subtle: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)",
        bright: "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.5)"
      };

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      animate={{
        textShadow: [
          glowColors.subtle,
          glowColors.bright,
          glowColors.subtle
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.85em] bg-current ml-0.5 align-middle"
        />
      )}
    </motion.span>
  );
}

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function InfiniteMarquee({ 
  children, 
  speed = 30,
  direction = "left",
  className = ""
}: InfiniteMarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
}

export function TiltCard({ children, className = "", tiltAmount = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -tiltAmount;
    const rotateYValue = (mouseX / (rect.width / 2)) * tiltAmount;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxShapeProps {
  color?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
  speed?: number;
  shape?: "circle" | "square" | "triangle";
}

export function ParallaxShape({ 
  color = "primary", 
  size = "md", 
  className = "",
  speed = 1,
  shape = "circle"
}: ParallaxShapeProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  const colorClasses = {
    primary: "bg-primary/20",
    accent: "bg-accent/20"
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg rotate-45",
    triangle: "clip-triangle"
  };

  return (
    <motion.div
      className={`absolute blur-2xl ${sizeClasses[size]} ${colorClasses[color]} ${shapeClasses[shape]} ${className}`}
      animate={{
        y: [0, -20 * speed, 0],
        x: [0, 10 * speed, 0],
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.7, 0.5]
      }}
      transition={{
        duration: 6 / speed,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
