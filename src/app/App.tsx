import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { TypewriterText } from './components/TypewriterText';
import { TimelineCard } from './components/TimelineCard';
import { GalleryCard } from './components/GalleryCard';
import { FloatingElements } from './components/FloatingElements';
import { MusicPlayer } from './components/MusicPlayer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

export default function App() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const excitementSectionRef = useRef<HTMLDivElement>(null);
  const sadSectionRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    { image: 'https://res.cloudinary.com/dzxvmdsew/image/upload/v1781141552/beautiful-couple-mountains-couple-love-mountains-back-view-man-lifted-woman-into-his-arms-couple-travels-mountains-hiking-mountains-copy-space_135372-435_ilue4j.avif', title: 'Mountain Adventures' },
    { image: 'https://images.unsplash.com/photo-1604882356818-9100fce260a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGNvZmZlZSUyMGNvdXBsZSUyMGRhdGV8ZW58MXx8fHwxNzgxMDk5NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Café Hopping' },
    { image: 'https://images.unsplash.com/photo-1631816591249-ba33dde81a23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluJTIwd2luZG93JTIwdGVhJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzgxMDk5NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Tea in the Rain' },
    { image: 'https://images.unsplash.com/photo-1573592371950-348a8f1d9f38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3N0b3JlJTIwYWVzdGhldGljfGVufDF8fHx8MTc4MTA5OTQyM3ww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Bookstore Dates' },
    { image: 'https://images.unsplash.com/photo-1447798084910-4d1dfb81b657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBnb2xkZW4lMjBob3VyJTIwd2Fsa2luZ3xlbnwxfHx8fDE3ODEwOTk0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Sunset Walks' },
    { image: 'https://images.unsplash.com/photo-1595351298020-038700609878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBoYW5kcyUyMGNyZWF0aXZlfGVufDF8fHx8MTc4MTA5OTQyNHww&ixlib=rb-4.1.0&q=80&w=1080', title: 'Pottery Workshops' },
    { image: 'https://images.unsplash.com/photo-1605096048662-5ab61695a122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBjaXR5JTIwc3RyZWV0JTIwZXhwbG9yZSUyMHRyYXZlbHxlbnwxfHx8fDE3ODEwOTk0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Exploring Old Streets' },
    { image: 'https://images.unsplash.com/photo-1611416457332-946853cc75d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwY2l0eSUyMHZpZXclMjBuaWdodHxlbnwxfHx8fDE3ODEwOTk0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Rooftop Conversations' },
    { image: 'https://images.unsplash.com/photo-1537430802614-118bf14be50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZHZlbnR1cmUlMjBiYWNrcGFjayUyMGpvdXJuZXl8ZW58MXx8fHwxNzgxMDk5NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080', title: 'Travel Adventures' },
  ];

  const handleSuperExcited = () => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setShowCelebration(true);
  };

  const handleNotReally = () => {
    sadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRethink = () => {
    excitementSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenInvitation = () => {
    // Placeholder for invitation link
    window.open('https://example.com/invitation', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] relative overflow-x-hidden">
      <FloatingElements />
      <MusicPlayer />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl mb-6 text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              <TypewriterText
                text="Hey Shruti!! 🌻"
                delay={100}
                onComplete={() => setTimeout(() => setShowSubtitle(true), 500)}
              />
            </h1>
            {showSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                I made a tiny corner of the internet for someone I really enjoy spending time with.
              </motion.p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative">
                {!photoLoaded && (
                  <div className="w-full h-96 bg-gradient-to-br from-[#F5D0D7]/40 to-[#A8C3A0]/40 flex flex-col items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="text-4xl"
                    >
                      🌸
                    </motion.div>
                    <p className="text-gray-600 italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Loading loveliness...
                    </p>
                  </div>
                )}
                <img
                  src="https://res.cloudinary.com/dzxvmdsew/image/upload/v1781138072/photo_2026-06-11_06-04-13_xcm6cd.jpg"
                  alt="Photo"
                  className={`w-full h-96 object-cover transition-opacity duration-700 ${photoLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                  onLoad={() => setPhotoLoaded(true)}
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                  <span className="text-4xl">📸</span>
                </div>
              </div>
            </motion.div>

            {/* Poem */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-[#A8C3A0]/30 shadow-xl rounded-3xl">
                <div className="prose prose-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <p className="text-gray-800 leading-relaxed italic mb-4">
                    "To the lovely time, the lovely day!<br />
                    From being late (for the workshop),<br />
                    To spontaneous plans along the way.
                  </p>
                  <p className="text-gray-800 leading-relaxed italic mb-4">
                    Divine intervention, an ode to fate,<br />
                    From complete strangers to the best duo.<br />
                    Alas, the magic paused before we could know.
                  </p>
                  <p className="text-gray-800 leading-relaxed italic">
                    Perhaps the time has come for the tune to replay,<br />
                    For ahead, I think many cute memories lay. ✨"
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl text-center mb-16 text-gray-800"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            🌻 The Story So Far
          </motion.h2>

          <div className="space-y-0">
            <TimelineCard
              emoji="📍"
              title="The Workshop"
              subtitle="(Yeah, the one you were late to 😅)"
              index={0}
            />
            <TimelineCard
              emoji="🤝"
              title="Almost Becoming Co-Founders"
              index={1}
            />
            <TimelineCard
              emoji="💬"
              title="Getting to Know Each Other"
              index={2}
            />
            <TimelineCard
              emoji="🕉️"
              title="Being Blessed by Shiva"
              index={3}
            />
            <TimelineCard
              emoji="🍕"
              title="Domino's Pizza"
              subtitle="(And the Coke thrift 😌)"
              index={4}
            />
            <TimelineCard
              emoji="💭"
              title="You Dreaming About Me"
              subtitle="(Yes, this absolutely deserves a mention 😌)"
              index={5}
            />
            <TimelineCard
              emoji="📸"
              title="My Google Photos Missing You"
              subtitle="(Still one of the funniest notifications ever 😂)"
              index={6}
            />
            <TimelineCard
              emoji="📱"
              title="Endless Instagram Chats"
              subtitle="(Though you seldom appear on Instagram 😪)"
              index={7}
            />
            <TimelineCard
              emoji="✨"
              title="14th June!? ✨"
              isSpecial={true}
              index={8}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 py-20 px-4 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center mb-4 text-gray-800"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Maybe Soon? 👀
        </motion.h2>

        <div className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide mt-12">
          <div className="flex gap-6">
            {galleryItems.map((item, index) => (
              <GalleryCard key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Google Form Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              A Tiny Sneak Peek 🫣
            </h2>
            <p className="text-xl text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              A few things I'd love to know before 14th...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-[#A8C3A0]/30 overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScZRf-qy0V83nIIoVoob5hSIUcJMY3Px48_MzQoTn00Ia2Srg/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-2xl"
                title="14th June Form"
              >
                Loading…
              </iframe>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Excitement Question Section */}
      <section ref={excitementSectionRef} className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl mb-12 text-gray-800"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How excited are you for 14th June?
          </motion.h2>

          {!showCelebration ? (
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSuperExcited}
                  className="text-2xl px-12 py-8 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white shadow-xl"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  ✨ Super Excited
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNotReally}
                  variant="outline"
                  className="text-2xl px-12 py-8 rounded-2xl border-2 border-gray-400 hover:bg-gray-100 shadow-xl"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  😐 Not Really
                </Button>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <p className="text-5xl md:text-6xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                Yayyyyy!! 🎉
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleOpenInvitation}
                  className="text-2xl px-12 py-8 rounded-2xl bg-gradient-to-r from-[#A8C3A0] to-[#F5D0D7] hover:from-[#98b390] hover:to-[#e5c0c7] text-white shadow-xl"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Open Invitation ✨
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-2xl mb-4 text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
            P.S.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Whether you're super excited, slightly excited, or pretending not to be excited...
            <br />
            <span className="text-2xl">I'm looking forward to seeing you. 🌻</span>
          </p>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-8 text-6xl"
          >
            🌻
          </motion.div>
        </motion.div>
      </footer>

      {/* Large spacer to prevent accidental scrolling into sad section */}
      <div style={{ height: '120vh' }} aria-hidden="true" />

      {/* Sad Section — only reachable via "Not Really" button */}
      <section ref={sadSectionRef} className="relative z-10 py-20 px-4 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 -z-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1599692392256-2d084495fe15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcHVwcHklMjBzYWQlMjBleWVzfGVufDF8fHx8MTc4MTA5OTQyNXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sad puppy"
              className="w-full max-w-2xl rounded-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why!! 🥺
            </h2>

            <p className="text-3xl md:text-4xl text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Wait wait wait...
            </p>

            <p className="text-2xl md:text-3xl text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Not excited at all? 😭
            </p>

            <Card className="inline-block p-8 bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl border-2 border-[#F5D0D7]/50">
              <p className="text-4xl md:text-5xl text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
                Kya mai itna bura hoon? 🥺
              </p>
            </Card>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-8">
              <Button
                onClick={handleRethink}
                className="text-2xl px-12 py-8 rounded-2xl bg-gradient-to-r from-[#A8C3A0] to-[#F5D0D7] hover:from-[#98b390] hover:to-[#e5c0c7] text-white shadow-xl"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Dubaara Socho 😌
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
