import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GalleryCardProps {
  image: string;
  title: string;
  index: number;
}

export function GalleryCard({ image, title, index }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="flex-shrink-0 w-80 h-96 rounded-3xl overflow-hidden shadow-xl relative group"
    >
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white text-xl font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
