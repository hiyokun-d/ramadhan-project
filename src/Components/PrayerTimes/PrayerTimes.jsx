import { useEffect, useState } from "react"
import { getPrayerTimes } from "../../functions/prayertime"
import { getCurrentPrayerStatus } from "../../functions/prayerCurrent"
import { motion } from "framer-motion"
import "./prayerTimesTheme.css"
import "./prayerTimes.css"
import LoadingAnimation from "../Utils/LoadingAnimation"
import { DailyWisdom } from "../Utils/quotesEveryday/DailyWisdom"

const gradientClass = ["asr", "dhuhr", "fajr", "firsthird", "imsak", "isha", "lastthird", "maghrib", "midnight", "sunrise", "sunset"]

const formatPrayerName = (name) => {
  return name.toUpperCase().replace('LASTTHIRD', 'LAST THIRD').replace('FIRSTTHIRD', 'FIRST THIRD');
};

// Generate stars
const generateStars = (count) => {
  return Array(count).fill().map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    blinkDuration: Math.random() * 3 + 2
  }));
}

const getTheme = (prayer) => {
  switch (prayer) {
    case 'fajr':
      return {
        bg: 'linear-gradient(135deg, #0f1730 0%, #1a2a50 100%)',
        sunColor: '#a1b5e3',
        textColor: '#a1b5e3',
        cloudColor: 'rgba(30, 41, 82, 0.7)',
        starOpacity: 0.7
      };
    case 'sunrise':
      return {
        bg: 'linear-gradient(135deg, #4a3b58 0%, #ff7e5f 100%)',
        sunColor: '#ff9e5f',
        textColor: '#fff0d9',
        cloudColor: 'rgba(255, 158, 118, 0.5)',
        starOpacity: 0.1
      };
    case 'dhuhr':
      return {
        bg: 'linear-gradient(135deg, #80bdff 0%, #3f8efc 100%)',
        sunColor: '#ffde59',
        textColor: '#ffffff',
        cloudColor: 'rgba(255, 255, 255, 0.7)',
        starOpacity: 0
      };
    case 'asr':
      return {
        bg: 'linear-gradient(135deg, #6aaee6 0%, #5b7ea8 100%)',
        sunColor: '#ffcb52',
        textColor: '#ffffff',
        cloudColor: 'rgba(255, 255, 255, 0.6)',
        starOpacity: 0
      };
    case 'maghrib':
      return {
        bg: 'linear-gradient(135deg, #ff6b52 0%, #422e49 100%)',
        sunColor: '#ff5e3a',
        textColor: '#ffe0cd',
        cloudColor: 'rgba(150, 75, 68, 0.5)',
        starOpacity: 0.3
      };
    case 'isha':
      return {
        bg: 'linear-gradient(135deg, #1a203c 0%, #121528 100%)',
        sunColor: '#2a4073',
        textColor: '#adbbd4',
        cloudColor: 'rgba(26, 32, 60, 0.8)',
        starOpacity: 0.9
      };
    case 'midnight':
      return {
        bg: 'linear-gradient(135deg, #0f1526 0%, #0a0f1d 100%)',
        sunColor: '#152747',
        textColor: '#8a9bbd',
        cloudColor: 'rgba(15, 21, 38, 0.8)',
        starOpacity: 1
      };
    case 'lastthird':
      return {
        bg: 'linear-gradient(135deg, #131b2e 0%, #293e6e 100%)',
        sunColor: '#4468b0',
        textColor: '#aec1e6',
        cloudColor: 'rgba(19, 27, 46, 0.7)',
        starOpacity: 0.8
      };
    default:
      return {
        bg: 'linear-gradient(135deg, #f9fafb 0%, #f1f3f5 100%)',
        sunColor: '#ffde59',
        textColor: '#4a5568',
        cloudColor: 'rgba(255, 255, 255, 0.7)',
        starOpacity: 0
      };
  }
};

const stars = generateStars(100);

export function PrayerTimes() {
  const [prayerTimesData, setPrayerTimes] = useState(null)
  const [holidays, setHoliday] = useState(null) // HIJRI CALLENDAR
  const [currentPrayer, setCurrentPrayer] = useState('fajr');
  // BACKGROUND CLASS COLOR (gradient color)
  const [status, setStatus] = useState(null)
  const [times, setTimes] = useState(null)

  useEffect(() => {
    getPrayerTimes().then(data => {
      setPrayerTimes(data);
      checkHolidays(data); // Check for holidays once data is fetched
    });
  }, []);

  // Method to check if there are any holidays
  const checkHolidays = (prayerData) => {
    if (prayerData.hijri && prayerData.hijri.holidays && prayerData.hijri.holidays.length > 0) {
      setHoliday(prayerData.hijri.holidays); // Set the holidays if available
    } else {
      setHoliday(null); // No holidays found
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await getPrayerTimes();
      setTimes(data);
      updateStatus(data);
    };

    loadData();
    const interval = setInterval(() => updateStatus(times), 60000); // Update every minute

    return () => clearInterval(interval);
  }, [times]);

  const updateStatus = (prayerData) => {
    if (prayerData) {
      const newStatus = getCurrentPrayerStatus(prayerData);
      setStatus(newStatus);
      updateBackground(newStatus.currentPrayer); // Update background based on the next prayer
    }
  };

  const updateBackground = (nextPrayer) => {
    // Map the next prayer to a gradient class for the background
    const prayerIndex = gradientClass.indexOf(nextPrayer.toLowerCase()); // Match prayer name with gradient class
    if (prayerIndex !== -1) {
      setCurrentPrayer(gradientClass[prayerIndex]); // Set corresponding background class
    } else {
      setCurrentPrayer("default"); // Fallback to default background
    }
  };

  const theme = getTheme(currentPrayer);


  return (
    <motion.section className={"container"} style={{ background: theme.bg }}>
      {status ? (
        <>

          {
            stars.map(star => (
              <motion.div
                key={`star-${star.id}`}
                style={{
                  position: 'absolute',
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  opacity: star.opacity * theme.starOpacity,
                }}
                animate={{
                  opacity: [
                    star.opacity * theme.starOpacity,
                    (star.opacity + 0.4) * theme.starOpacity,
                    star.opacity * theme.starOpacity
                  ],
                }}
                transition={{
                  duration: star.blinkDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))
          }

          {/* Sun/Moon */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: theme.sunColor,
              boxShadow: `0 0 60px ${theme.sunColor}`,
              zIndex: 2,
            }}
            initial={{ scale: 0.2 }}
            animate={{
              y: currentPrayer === 'fajr' || currentPrayer === 'sunrise'
                ? [-130, -120]
                : currentPrayer === 'maghrib' || currentPrayer === 'isha'
                  ? [90, 100]
                  : [10, 15, 10],
              opacity: currentPrayer === 'midnight' ? 0.4 : 1,
              scale: currentPrayer === "midnight" ? [2, 1.55, 2] : [1, 1.15, 1]
            }}

            transition={{
              y: {
                duration: currentPrayer === 'fajr' || currentPrayer === 'sunrise' ||
                  currentPrayer === 'maghrib' || currentPrayer === 'isha'
                  ? 8 : 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              opacity: {
                duration: 2,
              },

              scale: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            }}

            drag
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          />

          {/* Main prayer text */}
          <motion.div
            className="prayer-text"
            style={{
              color: theme.textColor,
              fontFamily: 'Roboto, Noto Sans, sans-serif',
              fontSize: '28px',
              fontWeight: '500',
              letterSpacing: '0.08em',
              textAlign: 'center',
              position: 'relative',
              zIndex: 10,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {status.currentTimeFormatted}
            {/* {formatPrayerName(currentPrayer)} PRAYER TIME */}
          </motion.div>

          {status.currentPrayer && status.importantPrayer ? (
            <motion.div
              className="prayer-text"
              style={{
                color: theme.textColor,
                fontFamily: 'Roboto, Noto Sans, sans-serif',
                fontSize: '28px',
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
              {formatPrayerName(status.currentPrayer)} PRAYER TIME
            </motion.div>
          ) : <DailyWisdom theme={theme} />}


          {/* Horizontal line */}
          <motion.div
            style={{
              position: 'absolute',
              width: '80%',
              height: '1px',
              backgroundColor: theme.textColor,
              opacity: 0.2,
              bottom: '25%',
              zIndex: 1,
            }}

            initial={{ width: "0%", filter: "invert(1)", opacity: 1, height: 5 }}
            animate={{ width: "80%", filter: "invert(0)", opacity: 0.2, height: 1 }}
            exit={{ width: "0%", filter: "invert(1)" }}

            transition={{
              visualDuration: 0.3,
              type: "spring"
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              bottom: '15%',
              color: theme.textColor,
              fontSize: '16px',
              opacity: 0.7,
              textAlign: 'center',
              fontFamily: 'Roboto, Noto Sans, sans-serif',
              letterSpacing: '0.05em',
              zIndex: 10,
            }}

            animate={{
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Next: {status.nextPrayer} in {status.timeRemaining.formatted}
          </motion.div>

        </>
      ) : (<LoadingAnimation />)}


    </motion.section >
  );
}
