import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  animation,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  animation?: "lightSpeedInRight" | "lightSpeedInLeft" | "fadeInLeft" | "fadeInRight";

}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as "div";
  const animClass = animation === "lightSpeedInRight"
    ? "light-speed-right"
    : animation === "lightSpeedInLeft"
      ? "light-speed-left"
      : "reveal";

  return (
    <Comp
      ref={ref}
      className={`${animClass} ${className}`}
      data-visible={visible ? "true" : "false"}
      style={
        animation
          ? { animationDelay: `${delay}ms` }
          : { transitionDelay: `${delay}ms` }
      }
    >
      {children}
    </Comp>
  );
}
