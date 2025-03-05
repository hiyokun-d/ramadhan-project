import axios from "axios";

// Create axios instance with CORS headers
const api = axios.create({
  baseURL: "https://api.aladhan.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export async function getPrayerTimes() {
  try {
    let location;
    try {
      location = await axios.get(`https://ipwho.is/?output=json&security=1`, {});

      const { city, country } = location.data;

      const response = await api.get("timingsByCity", {
        params: {
          city: city || "Jakarta",
          country: country || "Indonesia",
          method: 2,
        },
      });
      console.log(response.data.data)

      return response.data.data;
    } catch (error) {
      console.error("Location API Error:", error);
      throw new Error("Failed to get location data");
    }
  } catch (error) {
    console.error("Prayer Times API Error:", error);

    const fallback = await api.get("timingsByCity", {
      params: {
        city: "Mecca",
        country: "Saudi Arabia",
        method: 2,
      },
    });

    return fallback.data.data;
  }
}
