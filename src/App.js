import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Set initial volume to 50%
      
      // Add error handling
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
      });

      // Clean up
      return () => {
        audio.removeEventListener('error', () => {});
      };
    }

    const targetDate = new Date('April 8, 2025 00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown('Happy Birthday! 🎉');
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        await audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-pink-300 to-pink-200 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-pink-400/30"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ top: '15%', left: '15%' }}
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full bg-pink-300/30"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ bottom: '15%', right: '15%' }}
      />

      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-pink-600 mb-4 drop-shadow-lg"
      >
        ✨ Happy Birthday in Advance! ✨
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        className="text-xl text-pink-800 font-medium"
      >
        Since you came into my life, everything has changed for the better. 💖
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-8 bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
      >
        <p className="text-2xl font-bold text-pink-700">🎂 Countdown to Your Special Day 🎂</p>
        <p className="text-3xl font-semibold text-pink-800 mt-2">{countdown}</p>
      </motion.div>
      
      <motion.div 
        className="mt-8 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <button 
          onClick={() => setShowMessage(!showMessage)} 
          className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-lg mx-2"
        >
          🎁 Click for a Surprise
        </button>

        <button 
          onClick={toggleMusic} 
          className="bg-pink-400 text-white px-8 py-3 rounded-full hover:bg-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-lg mx-2"
        >
          {isPlaying ? '🔇 Pause Music' : '🎵 Play Music'}
        </button>
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl max-w-md transform hover:scale-105 transition-all duration-300"
          >
            <p className="text-pink-600 text-xl font-medium leading-relaxed">
              I love you the most! 💕 You make my life magical. Keep dancing, keep singing, and keep being amazing! 🎶💃
              <br />
              <span className="block mt-2 text-2xl">🌟 You're My Everything! 🌟</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef}
        loop
        preload="auto"
        src="/song.mp3"
      />
    </div>
  );
}

export default App;

      