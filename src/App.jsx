import './App.css'
import { PrayerTimes } from './Components/PrayerTimes/PrayerTimes'
import { QuranVerse } from './Components/quranVerse/quranVerse'
import { TasbihDigital } from './Components/tasbihDigital/tasbihDigital'
import { DailyWisdom } from './Components/Utils/quotesEveryday/DailyWisdom'

function App() {
  return (
    <>
      <PrayerTimes />
      <QuranVerse />
      <TasbihDigital />
    </>
  )
}

export default App
