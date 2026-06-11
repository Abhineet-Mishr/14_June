import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface TimelineCardProps {
  emoji: string;
  title: string;
  subtitle?: string;
  isSpecial?: boolean;
  index: number;
}

export function TimelineCard({ emoji, title, subtitle, isSpecial = false, index }: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6 group"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full ${isSpecial ? 'bg-gradient-to-br from-yellow-300 to-pink-300' : 'bg-white'} border-2 border-[#A8C3A0] flex items-center justify-center text-2xl shadow-md z-10`}>
          {emoji}
        </div>
        <div className="w-0.5 h-full bg-gradient-to-b from-[#A8C3A0] to-transparent mt-2" />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className={`flex-1 mb-8 p-6 rounded-2xl ${isSpecial ? 'bg-gradient-to-br from-yellow-50 to-pink-50' : 'bg-white/80 backdrop-blur-sm'} border border-[#A8C3A0]/30 shadow-lg`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {subtitle}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
