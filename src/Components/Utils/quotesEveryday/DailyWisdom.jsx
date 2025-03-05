import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./DailyWisdom.css";

const dailyQuotes = [
  // Quran
  {
    type: "quran",
    arabic: "۞ وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا",
    translation: "And whoever fears Allah - He will make for him a way out",
    source: "Quran 65:2-3",
    tags: ["Taqwa", "Relief"]
  },
  {
    type: "quran",
    arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease",
    source: "Quran 94:5",
    tags: ["Patience", "Hope"]
  },
  {
    type: "quran",
    arabic: "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ",
    translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence",
    source: "Quran 2:255 (Ayat al-Kursi)",
    tags: ["Tawhid", "Power"]
  },

  // Hadith
  {
    type: "hadith",
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
    translation: "Your smile for your brother is charity",
    source: "Jami` at-Tirmidhi 1956",
    tags: ["Charity", "Smiling"]
  },
  {
    type: "hadith",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    translation: "The merciful will be shown mercy by the Most Merciful",
    source: "Sunan Abi Dawud 4941",
    tags: ["Mercy", "Compassion"]
  },
  {
    type: "hadith",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    translation: "The best among you are those who learn the Quran and teach it",
    source: "Sahih al-Bukhari 5027",
    tags: ["Quran", "Knowledge"]
  },

  // Ramadan Specific
  {
    type: "hadith",
    arabic: "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    translation: "Whoever fasts Ramadan out of faith and hope for reward will have his previous sins forgiven",
    source: "Sahih al-Bukhari 38",
    tags: ["Ramadan", "Forgiveness"]
  },
  {
    type: "quran",
    arabic: "شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ هُدًى لِّلنَّاسِ",
    translation: "The month of Ramadan in which was revealed the Quran, a guidance for mankind",
    source: "Quran 2:185",
    tags: ["Ramadan", "Quran"]
  },

  // Daily Wisdom
  {
    type: "hadith",
    arabic: "لاَ تُكْثِرُوا الْكَلامَ بِغَيْرِ ذِكْرِ اللهِ",
    translation: "Do not speak much without remembering Allah",
    source: "Sunan Ibn Majah 3793",
    tags: ["Dhikr", "Speech"]
  },
  {
    type: "quran",
    arabic: "وَٱسْتَعِينُوا بِٱلصَّبْرِ وَٱلصَّلَوٰةِ",
    translation: "And seek help through patience and prayer",
    source: "Quran 2:45",
    tags: ["Prayer", "Patience"]
  }];

const getRandomQuotes = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)]

export function DailyWisdom({ theme }) {
  return (
    <motion.div
      className="prayer-text"
      style={{
        color: theme.textColor,
        fontFamily: 'Roboto, Noto Sans, sans-serif',
        fontSize: '18px',
        width: 300,
        fontWeight: '500',
        letterSpacing: '0.08em',
        marginTop: '5px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      }}
      initial={{
        translateX: 1000,
        scale: 0.5
      }}
      animate={{
        translateX: 0,
        scale: 1
      }}
      exit={{
        translateX: -1000,
        scale: 0.3,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        stiffness: 1880,
        damping: 22,
        mass: 4.5
      }}
    >
      {getRandomQuotes.translation}
    </motion.div>
  )
}
