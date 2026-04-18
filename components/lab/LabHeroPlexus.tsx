"use client";

import { useEffect, useRef } from "react";

/** Subtle drifting nodes + distance-based links for lab hero (Quip-style ambience). */
export function LabHeroPlexus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      reduced = mq.matches;
      if (width < 2) return;
      spawn();
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduced) {
        draw();
      } else if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    mq.addEventListener("change", onMq);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      violet: boolean;
    };

    let nodes: Node[] = [];

    function nodeCount() {
      const area = width * height;
      return Math.min(68, Math.max(24, Math.floor(area / 20000)));
    }

    function spawn() {
      const n = nodeCount();
      nodes = [];
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (reduced ? 0 : 0.11),
          vy: (Math.random() - 0.5) * (reduced ? 0 : 0.11),
          r: Math.random() * 1.15 + 0.35,
          violet: Math.random() > 0.66,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      if (width < 2 || height < 2) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
      if (reduced) {
        cancelAnimationFrame(raf);
        raf = 0;
        draw();
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    function linkRadius() {
      return Math.min(132, width * 0.105 + 48);
    }

    function wrap(v: number, max: number) {
      if (v < 0) return max + v;
      if (v > max) return v - max;
      return v;
    }

    function tick(dt: number) {
      if (reduced) return;
      const t = Math.min(dt / 16, 2.2);
      for (const n of nodes) {
        n.x = wrap(n.x + n.vx * t, width);
        n.y = wrap(n.y + n.vy * t, height);
      }
    }

    function draw() {
      const maxD = linkRadius();
      const maxD2 = maxD * maxD;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.6;
      ctx.lineCap = "round";

      const cx = width * 0.7;
      const cy = height * 0.38;
      const diag = Math.hypot(width, height) || 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxD2) continue;
          const d = Math.sqrt(d2);
          const falloff = 1 - d / maxD;
          const midX = (a.x + b.x) * 0.5;
          const midY = (a.y + b.y) * 0.5;
          const towardTerminal = 1 + 0.22 * (1 - Math.hypot(midX - cx, midY - cy) / diag);
          const baseA = falloff * 0.078 * towardTerminal;
          const violetLine = a.violet && b.violet;
          if (violetLine) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${baseA * 0.95})`;
          } else {
            ctx.strokeStyle = `rgba(0, 240, 255, ${baseA * 0.85})`;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const g = n.violet ? "168, 85, 247" : "0, 240, 255";
        ctx.fillStyle = `rgba(${g}, ${n.violet ? 0.2 : 0.16})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let last = performance.now();
    function frame(now: number) {
      const dt = now - last;
      last = now;
      tick(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    if (!reduced) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const vis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduced && raf === 0) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", vis);

    return () => {
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div className="lab-hero-plexus" aria-hidden>
      <canvas ref={canvasRef} className="lab-hero-plexus__canvas" />
    </div>
  );
}
