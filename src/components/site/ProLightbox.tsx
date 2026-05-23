"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ──────────────────────────── types ──────────────────────────── */

export type LightboxImage = {
  src: string;
  alt: string;
};

type ProLightboxProps = {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
};

/* ──────────────────────────── helpers ──────────────────────────── */

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const AUTOPLAY_MS = 4000;
const ZOOM_LEVELS = [1, 1.5, 2.5, 4];
const ZOOM_STEP_PX = 0.004;

/* ──────────────────────────── component ──────────────────────────── */

export function ProLightbox({ images, initialIndex = 0, isOpen, onClose }: ProLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUI, setShowUI] = useState(true);

  const dragRef = useRef({ startX: 0, startY: 0, panStartX: 0, panStartY: 0 });
  const swipeRef = useRef({ startX: 0, startTime: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const uiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = images.length;
  const current = images[index] ?? images[0];

  /* reset on open */
  useEffect(() => {
    if (!isOpen) return;
    setIndex(initialIndex);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsAutoplay(false);
    setShowUI(true);
  }, [isOpen, initialIndex]);

  /* keyboard */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": onClose(); break;
        case "ArrowRight": goNext(); break;
        case "ArrowLeft": goPrev(); break;
        case "+": case "=": zoomIn(); break;
        case "-": case "_": zoomOut(); break;
        case "0": resetZoom(); break;
        case " ": e.preventDefault(); toggleAutoplay(); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  /* lock body scroll */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* autoplay timer */
  useEffect(() => {
    if (!isOpen || !isAutoplay) { clearInterval(timerRef.current!); return; }
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current!);
  }, [isOpen, isAutoplay, index]);

  /* auto-hide UI */
  const scheduleHideUI = useCallback(() => {
    setShowUI(true);
    clearTimeout(uiTimerRef.current!);
    uiTimerRef.current = setTimeout(() => { if (!isDragging) setShowUI(false); }, 3000);
  }, [isDragging]);

  /* ── navigation ── */
  const goNext = useCallback(() => { setIndex((i) => (i + 1) % count); setZoom(1); setPan({ x: 0, y: 0 }); scheduleHideUI(); }, [count, scheduleHideUI]);
  const goPrev = useCallback(() => { setIndex((i) => (i - 1 + count) % count); setZoom(1); setPan({ x: 0, y: 0 }); scheduleHideUI(); }, [count, scheduleHideUI]);
  const goTo = useCallback((i: number) => { setIndex(i); setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  /* ── zoom ── */
  const zoomIn = useCallback(() => { const next = ZOOM_LEVELS.findIndex((z) => z > zoom); setZoom(next >= 0 ? ZOOM_LEVELS[next] : zoom); setPan({ x: 0, y: 0 }); }, [zoom]);
  const zoomOut = useCallback(() => { const prev = [...ZOOM_LEVELS].reverse().find((z) => z < zoom); setZoom(prev ?? zoom); setPan({ x: 0, y: 0 }); }, [zoom]);
  const resetZoom = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);
  const toggleAutoplay = useCallback(() => { setIsAutoplay((a) => !a); }, []);

  /* ── wheel zoom ── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => clamp(z + (e.deltaY < 0 ? ZOOM_STEP_PX : -ZOOM_STEP_PX) * z, 1, 5));
    scheduleHideUI();
  }, [scheduleHideUI]);

  /* ── pointer drag for pan (zoomed) / swipe (1x) ── */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    scheduleHideUI();

    if (zoom > 1) {
      dragRef.current = { startX: e.clientX, startY: e.clientY, panStartX: pan.x, panStartY: pan.y };
    } else {
      swipeRef.current = { startX: e.clientX, startTime: Date.now() };
    }
  }, [zoom, pan, scheduleHideUI]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    if (zoom > 1) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPan({ x: dragRef.current.panStartX + dx, y: dragRef.current.panStartY + dy });
    }
  }, [isDragging, zoom]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (zoom <= 1) {
      const dx = e.clientX - swipeRef.current.startX;
      const dt = Date.now() - swipeRef.current.startTime;
      if (Math.abs(dx) > 50 && dt < 400) {
        dx < 0 ? goNext() : goPrev();
      }
    }
  }, [isDragging, zoom, goNext, goPrev]);

  /* ── touch pinch zoom ── */
  const touchDistRef = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistRef.current = Math.sqrt(dx * dx + dy * dy);
    }
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scale = dist / (touchDistRef.current || dist);
      setZoom((z) => clamp(z * scale, 1, 5));
      touchDistRef.current = dist;
    }
  }, []);

  if (!isOpen || !current) return null;

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      className="pro-lightbox-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={containerRef}
      onTouchEnd={handlePointerUp as unknown as React.TouchEventHandler}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {/* ── top bar ── */}
      <div className={`pro-lightbox-topbar${showUI ? " is-visible" : ""}`}>
        <div className="pro-lightbox-counter">
          {index + 1} / {count}
        </div>
        <div className="pro-lightbox-topbar-actions">
          <button onClick={toggleAutoplay} className="pro-lightbox-btn" title={isAutoplay ? "Pause" : "Play"}>
            {isAutoplay ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button onClick={resetZoom} className="pro-lightbox-btn" title="Reset zoom">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </button>
          <button onClick={onClose} className="pro-lightbox-btn pro-lightbox-close" title="Close (Esc)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* ── prev / next arrows ── */}
      {count > 1 && (
        <>
          <button onClick={goPrev} className={`pro-lightbox-arrow pro-lightbox-arrow--left${showUI ? " is-visible" : ""}`} aria-label="Previous">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={goNext} className={`pro-lightbox-arrow pro-lightbox-arrow--right${showUI ? " is-visible" : ""}`} aria-label="Next">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </>
      )}

      {/* ── image ── */}
      <div
        className="pro-lightbox-image-container"
        onWheel={handleWheel}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        <Image
          alt={current.alt}
          className="pro-lightbox-image"
          fill
          draggable={false}
          priority
          sizes="100vw"
          src={current.src}
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* ── bottom bar ── */}
      <div className={`pro-lightbox-bottombar${showUI ? " is-visible" : ""}`}>
        {/* thumbnail strip */}
        <div className="pro-lightbox-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`pro-lightbox-thumb${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            >
              <img src={img.src} alt={img.alt} draggable={false} />
            </button>
          ))}
        </div>

        {/* zoom controls */}
        <div className="pro-lightbox-zoom-controls">
          <button onClick={zoomOut} className="pro-lightbox-btn" title="Zoom out (-)">−</button>
          <span className="pro-lightbox-zoom-label">{zoomPercent}%</span>
          <button onClick={zoomIn} className="pro-lightbox-btn" title="Zoom in (+)">+</button>
        </div>

        {/* keyboard hints */}
        <div className="pro-lightbox-hints">
          <kbd>←</kbd><kbd>→</kbd> navigate
          <kbd>+</kbd><kbd>-</kbd> zoom
          <kbd>Space</kbd> play
          <kbd>Esc</kbd> close
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Context Hook ──────────────────────────── */

import { createContext, useContext } from "react";

type LightboxContextValue = {
  open: (images: LightboxImage[], index?: number) => void;
};

const LightboxCtx = createContext<LightboxContextValue>({ open: () => {} });

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    images: LightboxImage[];
    index: number;
    isOpen: boolean;
  }>({ images: [], index: 0, isOpen: false });

  const open = useCallback((images: LightboxImage[], index = 0) => {
    setState({ images, index, isOpen: true });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false }));
  }, []);

  return (
    <LightboxCtx.Provider value={{ open }}>
      {children}
      <ProLightbox
        images={state.images}
        initialIndex={state.index}
        isOpen={state.isOpen}
        onClose={close}
      />
    </LightboxCtx.Provider>
  );
}

export function useLightbox() {
  return useContext(LightboxCtx);
}
