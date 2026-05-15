"use client";

import { useState, useCallback, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
    document.body.style.overflow = "";
  }, []);

  // Global Vintage Mechanical Click Sound
  useEffect(() => {
    if (!loaded) return;

    let audioCtx: AudioContext | null = null;

    const initVintageClick = () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtx = new AudioCtx();
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        document.removeEventListener('click', initVintageClick);
        document.removeEventListener('touchstart', initVintageClick);
      } catch (err) {
        // Ignore silently
      }
    };

    document.addEventListener('click', initVintageClick);
    document.addEventListener('touchstart', initVintageClick);

    const playVintageClick = () => {
      if (!audioCtx) return;
      try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        // --- The "Satisfying Bubble Pop" ---
        // A soft, universally loved UI sound (pitch sweeps UP)
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        // Start at a medium pitch and rapidly slide UP
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
        
        // Soft but fast volume fade out
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.06);
      } catch (err) {
        // Ignore quietly
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // --- EXCLUSIONS ---
      if (window.location.pathname.includes('/checkout')) return;
      if (target.closest('header')) return;
      if (target.closest('footer')) return;

      // --- INCLUSIONS ---
      if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
        playVintageClick();
      }
    };

    document.addEventListener('click', handleClick);
    
    // ==========================================
    // 2. DYNAMIC "RUBBING" SCROLL/DRAG SOUND
    // ==========================================
    let scrollCtx: AudioContext | null = null;
    let noiseSource: AudioBufferSourceNode | null = null;
    let filter: BiquadFilterNode | null = null;
    let gainNode: GainNode | null = null;
    let isScrollAudioInit = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let lastTouchY = 0;

    const initScrollAudio = () => {
      if (isScrollAudioInit) return;
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        scrollCtx = new AudioCtx();
        if (scrollCtx.state === 'suspended') {
          scrollCtx.resume();
        }
        
        // Generate Brown Noise (sounds like thick fabric/canvas rubbing)
        const bufferSize = scrollCtx.sampleRate * 2;
        const buffer = scrollCtx.createBuffer(1, bufferSize, scrollCtx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + (0.02 * white)) / 1.02; // Brown noise filter
          lastOut = data[i];
          data[i] *= 3.5; // Gain compensation
        }
        
        noiseSource = scrollCtx.createBufferSource();
        noiseSource.buffer = buffer;
        noiseSource.loop = true;
        
        // Lowpass filter makes it muffled and textured
        filter = scrollCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400; // Very muffled initially
        
        gainNode = scrollCtx.createGain();
        gainNode.gain.value = 0; // Silent until scrolled
        
        noiseSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(scrollCtx.destination);
        
        noiseSource.start();
        isScrollAudioInit = true;
        
      } catch (err) {
        // Ignore quietly
      }
    };

    // Browsers require a user interaction before audio can play
    document.addEventListener('click', initScrollAudio, { once: true });
    document.addEventListener('touchstart', initScrollAudio, { once: true });

    const handleDrag = (e: WheelEvent | TouchEvent) => {
      // ONLY allow drag sound on product details pages
      if (!window.location.pathname.startsWith('/product/')) return;

      if (!isScrollAudioInit || !gainNode || !scrollCtx || !filter) return;
      if (scrollCtx.state === 'suspended') scrollCtx.resume();
      
      let speed = 0;
      let isOverscrolling = false;
      const currentScrollY = window.scrollY;
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      
      if (e.type === 'wheel') {
        const deltaY = (e as WheelEvent).deltaY;
        speed = Math.abs(deltaY);
        if (currentScrollY <= 0 && deltaY < 0) isOverscrolling = true;
        if (currentScrollY >= maxScrollY - 1 && deltaY > 0) isOverscrolling = true;
      } else if (e.type === 'touchmove') {
        const currentY = (e as TouchEvent).touches[0].clientY;
        const deltaY = lastTouchY - currentY; // positive = scrolling down the page
        speed = Math.abs(deltaY) * 3; // Multiplier for touch sensitivity
        lastTouchY = currentY;
        
        if (currentScrollY <= 0 && deltaY < 0) isOverscrolling = true;
        if (currentScrollY >= maxScrollY - 1 && deltaY > 0) isOverscrolling = true;
      }
      
      // If we hit the bounds of the page, instantly kill the sound and ignore movement
      if (isOverscrolling || speed < 1) {
        gainNode.gain.setTargetAtTime(0, scrollCtx.currentTime, 0.01);
        return;
      }
      
      // Volume based on drag speed (max volume 0.15)
      const targetGain = Math.min(speed / 100, 0.15);
      
      // Fast attack to match drag exactly
      gainNode.gain.setTargetAtTime(targetGain, scrollCtx.currentTime, 0.01);
      
      // Increase brightness (filter freq) slightly when dragging faster
      filter.frequency.setTargetAtTime(400 + (speed * 10), scrollCtx.currentTime, 0.05);

      // Cut off to silence accurately and instantly when dragging stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (gainNode && scrollCtx) {
          gainNode.gain.setTargetAtTime(0, scrollCtx.currentTime, 0.01);
        }
      }, 30); // Trigger cutoff much faster (no lingering tail)
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    window.addEventListener('wheel', handleDrag, { passive: true });
    window.addEventListener('touchmove', handleDrag, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchstart', handleTouchStart);
      if (noiseSource) {
        noiseSource.stop();
        noiseSource.disconnect();
      }
      if (scrollCtx) scrollCtx.close();
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleComplete} />}
      <div className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
