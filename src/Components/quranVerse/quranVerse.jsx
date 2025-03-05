import { useEffect, useState, useRef } from "react";
import { quranGet, quranGetSurah } from "../../functions/quranGet";
import "./QuranVerse.css";
import LoadingAnimation from "../Utils/LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function QuranVerse() {
  const [allSurah, setAllSurah] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahData, setSurahData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const cachedSurah = localStorage.getItem("surahData");
    if (cachedSurah) {
      setAllSurah(JSON.parse(cachedSurah));
    } else {
      quranGet().then((data) => {
        if (data) {
          setAllSurah(data);
          localStorage.setItem("surahData", JSON.stringify(data));
        }
      });
    }
  }, []);

  const handleSurahSelect = async (surah) => {
    setIsLoading(true);
    setSelectedSurah(surah);
    try {
      const data = await quranGetSurah(surah.number);
      setSurahData(data);
      // Reset scroll position when new surah is loaded
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      // Close menu on mobile after selection
      setMenuOpen(false);
    } catch (error) {
      console.error("Error loading surah:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="container">
      {allSurah ? (
        <AnimatePresence mode="wait">
          <div className="content-container">
            <div className={`surah-list-container ${menuOpen ? 'active' : ''}`}>
              <h2>Surah</h2>
              <motion.div
                className="surah-list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
              >
                {allSurah.map((surah) => (
                  <motion.div
                    key={surah.number}
                    onClick={() => handleSurahSelect(surah)}
                    variants={slideUp}
                    className={`surah-item ${selectedSurah?.number === surah.number ? "surah-item-select" : ""}`}
                  >
                    <div className={`surah-number ${selectedSurah?.number === surah.number ? "surah-number-selected" : ""}`}>
                      {surah.number}
                    </div>
                    <div className="surah-info">
                      <h3>{surah.name}</h3>
                      <p>{surah.translation} • {surah.numberOfAyahs} Ayahs</p>
                    </div>
                    <div className={`surah-relevation ${selectedSurah?.number === surah.number ? "surah-number-selected" : ""}`}>
                      {surah.revelation}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingAnimation />
              ) : selectedSurah && surahData ? (
                <motion.div className="ayahs-container"
                  inital={{ x: 1000 }}
                  animate={{ x: 0 }}
                  exit={{ X: -1000 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ staggerChildren: 0.01 }}
                    className="surah-header"
                  >
                    <h1>{surahData.name}</h1>
                    <p className="surah-translation">{surahData.translation}</p>
                  </motion.div>

                  <div className="ayahs-scrollable-content" ref={scrollRef}>
                    {surahData.ayahs.map((ayah, index) => (
                      <motion.div
                        key={ayah.number.inQuran}
                        className="ayah-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="ayah-content">
                          <div className="ayah-header">
                            <div className="ayah-number">{index + 1}</div>
                            <div className="ayah-meta">
                              <span className="verse-number">Verse {ayah.number.inSurah}</span>
                              <span className="revelation-badge">{surahData.revelation}</span>
                            </div>
                          </div>
                          <div className="ayah-arabic">{ayah.arab}</div>
                          <div
                            className="ayah-translation"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            {ayah.translation}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : !selectedSurah && <LoadingAnimation activateTheDots={false} />}
            </AnimatePresence>
          </div>
        </AnimatePresence>
      ) : (
        <LoadingAnimation />
      )}

      {/* Mobile Menu Toggle Button */}
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Backdrop for closing menu */}
      <div
        className={`menu-backdrop ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </section>
  );
}
