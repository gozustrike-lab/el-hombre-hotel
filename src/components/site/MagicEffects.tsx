"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "motion/react";

/* ============================================================
   1. SCROLL REVEAL — Fade up on scroll into view
   ============================================================ */

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   2. STAGGER CHILDREN — Reveal children one by one
   ============================================================ */

type StaggerChildrenProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   3. TEXT REVEAL — Word-by-word blur-in (MagicUI style)
   ============================================================ */

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            willChange: "opacity, filter, transform",
          }}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 16, filter: "blur(8px)" }
          }
          transition={{
            duration: 0.45,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/* ============================================================
   4. SHIMMER BUTTON — Gradient sweep effect
   ============================================================ */

type ShimmerButtonProps = {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
};

export function ShimmerButton({
  children,
  className = "",
  shimmerColor = "rgba(212,165,116,0.25)",
  shimmerSize = "0.1em",
  borderRadius = "999px",
  shimmerDuration = "2s",
}: ShimmerButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: "inherit",
        }}
      >
        <motion.span
          animate={{ x: ["-200%", "200%"] }}
          transition={{
            duration: parseFloat(shimmerDuration),
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "50%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
            transform: "skewX(-20deg)",
          }}
        />
      </span>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}

/* ============================================================
   5. SPARKLES / PARTICLES — Floating sparkle effect (MagicUI)
   ============================================================ */

type SparklesProps = {
  className?: string;
  color?: string;
  count?: number;
};

function Sparkle({ x, y, color, delay }: { x: string; y: string; color: string; delay: number }) {
  return (
    <motion.span
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 4,
        height: 4,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function Sparkles({ className = "", color = "#d4a574", count = 6 }: SparklesProps) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: i * 0.4 + Math.random(),
  }));

  return (
    <span className={className} style={{ position: "relative", display: "inline-flex" }}>
      {sparkles.map((s, i) => (
        <Sparkle key={i} {...s} color={color} delay={s.delay} />
      ))}
    </span>
  );
}

/* ============================================================
   6. AURORA BACKGROUND — Animated gradient mesh (MagicUI)
   ============================================================ */

type AuroraBgProps = {
  className?: string;
  colors?: string[];
  speed?: number;
};

export function AuroraBg({
  className = "",
  colors = ["#d4a574", "#b87333", "#0A1628", "#1a3a5c"],
  speed = 6,
}: AuroraBgProps) {
  return (
    <span
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {colors.map((color, i) => (
        <motion.span
          key={i}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: speed + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
          style={{
            position: "absolute",
            width: `${60 + i * 15}%`,
            height: `${60 + i * 15}%`,
            top: `${-20 + i * 10}%`,
            left: `${-10 + i * 15}%`,
            background: `radial-gradient(ellipse at center, ${color}44 0%, transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
        />
      ))}
    </span>
  );
}

/* ============================================================
   7. PARALLAX FLOAT — Subtle floating parallax
   ============================================================ */

type ParallaxFloatProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxFloat({
  children,
  className = "",
  speed = 0.15,
}: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ============================================================
   8. MAGNETIC BUTTON — Follows cursor slightly
   ============================================================ */

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className = "",
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   9. COUNTER — Animated number counter
   ============================================================ */

type CounterProps = {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function Counter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ============================================================
   10. ORB — Glowing animated orb background
   ============================================================ */

type OrbProps = {
  className?: string;
  color?: string;
  size?: number;
};

export function Orb({ className = "", color = "#d4a574", size = 300 }: OrbProps) {
  return (
    <motion.span
      className={className}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 30, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
        filter: "blur(40px)",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}

/* ============================================================
   11. PULSE RING — Expanding ring effect
   ============================================================ */

export function PulseRing({ className = "", color = "#d4a574" }: { className?: string; color?: string }) {
  return (
    <span className={className} style={{ position: "relative", display: "inline-flex" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            scale: [1, 2.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            border: `2px solid ${color}`,
          }}
        />
      ))}
    </span>
  );
}

/* ============================================================
   12. MARQUEE — Infinite scroll ticker (MagicUI)
   ============================================================ */

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  className = "",
  speed = 40,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      onMouseEnter={(e) => {
        if (pauseOnHover) {
          const inner = e.currentTarget.querySelector<HTMLElement>(".marquee-inner");
          if (inner) inner.style.animationPlayState = "paused";
        }
      }}
      onMouseLeave={(e) => {
        if (pauseOnHover) {
          const inner = e.currentTarget.querySelector<HTMLElement>(".marquee-inner");
          if (inner) inner.style.animationPlayState = "running";
        }
      }}
    >
      <div
        className="marquee-inner"
        style={{
          display: "flex",
          gap: "2rem",
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          whiteSpace: "nowrap",
        }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   13. TYPEWRITER — Typewriter effect
   ============================================================ */

type TypewriterProps = {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
};

export function Typewriter({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </span>
  );
}

/* ============================================================
   14. SMOOTH SCALE-IN — Scale + fade entrance
   ============================================================ */

type ScaleInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScaleIn({ children, className = "", delay = 0 }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
