import React, { useState, useEffect } from "react";
import "./style.css";
import Card from "./Card";

export type WeatherProps = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const Weather = () => {
  const [searchValue, setSearchValue] = useState<string>("pune");
  const [data, setData] = useState<WeatherProps | null>(null);
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&&appid=5d9f2102711600e2a8a0fe05cbdede0f`;

      const res = await fetch(url);
      const data: WeatherProps = await res.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search...."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our weather card */}

      <Card data={data} />
    </>
  );
};

export default Weather;
