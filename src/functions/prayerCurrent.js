const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const prayerOrder = ["Asr", "Dhuhr", "Fajr", "Firsthird", "Imsak", "Isha", "Lastthird", "Maghrib", "Midnight", "Sunrise", "Sunset"]

export function getCurrentPrayerStatus(prayerTimes) {
  if (!prayerTimes?.timings) return null;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Define prayer order and proper names

  // Convert prayer times to minutes since midnight
  const prayers = prayerOrder.reduce((acc, name) => {
    const time = prayerTimes.timings[name];
    if (!time) return acc;

    const [hours, minutes] = time.split(':').map(Number);
    acc[name] = hours * 60 + minutes;
    return acc;
  }, {});

  // Add next day's Fajr for midnight calculation
  const nextDayFajr = prayers.Fajr + 1440; // 24 hours * 60 minutes

  // Create sorted prayer times array with next day's Fajr
  const prayerEntries = [
    ...Object.entries(prayers),
    ['FajrNext', nextDayFajr]
  ].sort((a, b) => a[1] - b[1]);

  // Find current and next prayer
  let currentPrayer = null;
  let nextPrayer = null;


  for (let i = 0; i < prayerEntries.length; i++) {
    const [name, start] = prayerEntries[i];
    const nextStart = prayerEntries[i + 1]?.[1] || nextDayFajr;

    if (currentTime >= start && currentTime < nextStart) {
      currentPrayer = name.replace('Next', '');
      nextPrayer = prayerEntries[i + 1]?.[0] || 'Fajr';
      break;
    }
  }

  const importantPrayer = prayerNames.includes(currentPrayer);

  for (let i = 0; i < prayerEntries.length; i++) {
    const [name] = prayerEntries[i];
    if (name === currentPrayer || !prayerNames.includes(name.replace('Next', ''))) {
      continue;
    }
    nextPrayer = name.replace('Next', '');
    break;
  }

  // Calculate time remaining to next prayer
  const nextPrayerTime = prayerEntries.find(([name]) => name === nextPrayer)?.[1] || nextDayFajr;
  let timeRemaining = nextPrayerTime - currentTime;

  // Handle midnight wrap-around
  if (timeRemaining < 0) timeRemaining += 1440;

  const hoursLeft = Math.floor(timeRemaining / 60);
  const minutesLeft = timeRemaining % 60;


  return {
    currentPrayer,
    importantPrayer,
    nextPrayer: nextPrayer.replace('Next', ''),
    timeRemaining: {
      hours: hoursLeft,
      minutes: minutesLeft,
      formatted: `${hoursLeft}h ${String(minutesLeft).padStart(2, '0')}m`
    },
    currentTimeFormatted: now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  };
}
