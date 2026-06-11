import { motion } from 'motion/react';

export function FloatingElements() {
  const floatingVariants = {
    animate: (i: number) => ({
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    }),
  };

  const elements = [
    { emoji: '🌻', top: '10%', left: '5%' },
    { emoji: '✨', top: '20%', right: '10%' },
    { emoji: '🌸', top: '40%', left: '8%' },
    { emoji: '💫', top: '60%', right: '15%' },
    { emoji: '🍃', top: '75%', left: '12%' },
    { emoji: '🌺', top: '85%', right: '8%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatingVariants}
          animate="animate"
          className="absolute text-4xl opacity-20"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
}
