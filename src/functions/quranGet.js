import axios from "axios";

export async function quranGet() {
  try {
    const { data } = await axios.get("https://quran-api-id.vercel.app/surahs/");
    return data; // Return the data directly
  } catch (e) {
    console.error("Error fetching surahs:", e);
    return false;
  }
}

export async function quranGetSurah(surah) {
  try {
    const { data } = await axios.get(`https://quran-api-id.vercel.app/surahs/${surah}`);
    return data; // Return the data directly
  } catch (e) {
    console.error("Error fetching surahs:", e);
    return false;
  }
}
