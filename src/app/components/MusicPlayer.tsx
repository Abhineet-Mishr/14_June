import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import musicFile from '../../imports/ytmp3free.cc_romantic-guitar-4-best-instrumental-soft-music-love-songs-relaxing-ocean-sleeping-for-studying-youtubemp3free.org.mp3';

const SPARKLES = ['✨', '🌸', '🌼', '💫', '🌻', '🌷', '⭐', '🍀'];

function FloatingSparkle({ id }: { id: number }) {
  const emoji = SPARKLES[id % SPARKLES.length];
  const left = `${10 + (id * 37 + 13) % 80}%`;
  const duration = 6 + (id * 7) % 8;
  const delay = (id * 1.3) % 5;
  const size = 16 + (id * 11) % 18;

  return (
    <motion.div
      key={id}
      className="fixed pointer-events-none z-20 select-none"
      style={{ left, bottom: '-60px', fontSize: `${size}px` }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        y: [0, -(window.innerHeight + 100)],
        opacity: [0, 0.8, 0.8, 0],
        scale: [0.5, 1, 1, 0.7],
        x: [0, (id % 2 === 0 ? 30 : -30), 0, (id % 2 === 0 ? -20 : 20)],
        rotate: [0, 15, -10, 5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.div>
  );
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const fadeVolume = (from: number, to: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const steps = 30;
    const stepTime = duration / steps;
    const diff = (to - from) / steps;
    let current = from;
    let step = 0;
    const interval = setInterval(() => {
      current += diff;
      step++;
      audio.volume = Math.max(0, Math.min(1, current));
      if (step >= steps) clearInterval(interval);
    }, stepTime);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      fadeVolume(0, 0.3, 1500);
      setIsPlaying(true);
    } else {
      fadeVolume(0.3, 0, 1000);
      setTimeout(() => audio.pause(), 1100);
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Floating sparkles when music is playing */}
      <AnimatePresence>
        {isPlaying && Array.from({ length: 12 }, (_, i) => (
          <FloatingSparkle key={i} id={i} />
        ))}
      </AnimatePresence>

      {/* Music button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.4, 0], scale: [1, 2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle, #F5D0D7 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex items-center gap-2 px-4 py-3 rounded-full shadow-xl select-none cursor-pointer"
          style={{
            background: 'rgba(255, 248, 240, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(168, 195, 160, 0.45)',
            boxShadow: isPlaying
              ? '0 8px 32px rgba(245, 208, 215, 0.5), 0 2px 8px rgba(0,0,0,0.08)'
              : '0 8px 24px rgba(0,0,0,0.10)',
            transition: 'box-shadow 0.6s ease',
          }}
        >
          <motion.span
            animate={isPlaying ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
            transition={{ duration: 1.6, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
            className="text-lg"
          >
            🎵
          </motion.span>
          <span
            className="text-sm font-medium"
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#6b6b6b',
              letterSpacing: '0.02em',
            }}
          >
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>
        </motion.button>
      </div>
    </>
  );
}
