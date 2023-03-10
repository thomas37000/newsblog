import axios from 'axios';

const urlWeather: string = 'https://api.openweathermap.org/data/2.5/weather';
const API_WEATHER_KEY: string | undefined =
  process.env.REACT_APP_API_WEATHER_KEY;

export const fetchWeather = async (query: string) => {
  const { data } = await axios.get(urlWeather, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_WEATHER_KEY,
    },
  });

  return data;
};
