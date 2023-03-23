import React, { useEffect } from "react";
import { WeatherProps } from "./Weather";

const Weathercard = ({ data }: { data: WeatherProps | null }) => {
  const [weatherState, setWeatherState] = React.useState<string>("");

  useEffect(() => {
    if (data?.weather[0]) {
      switch (data?.weather[0]?.main) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");

          break;
        case "Haze":
          setWeatherState("wi-fog");

          break;

        case "Clear":
          setWeatherState("wi-day-Sunny");

          break;

        case "Mist":
          setWeatherState("wi-dust");

          break;

        default:
          setWeatherState("wi-day-Sunny");
          break;
      }
    }
  }, [data?.weather]);

  let timeStr;
  if (data) {
    let sec = data?.sys?.sunset;
    let date = new Date(sec * 1000);
    timeStr = `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <>
      {data ? (
        <article className="widget">
          <div className="weatherIcon">
            <i className={`wi ${weatherState}`}></i>
          </div>

          <div className="weatherInfo">
            <div className="temperature">
              <span>{data?.main?.temp}</span>
            </div>

            <div className="description">
              <div className="weatherCondition">{data?.weather[0]?.main}</div>
              <div className="place">
                {data?.name}, {data?.sys?.country}
              </div>
            </div>
          </div>

          <div className="date">{new Date().toLocaleString()}</div>

          {/* our 4 column system */}

          <div className="extra-temp">
            <div className="temp-info-minmax">
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-sunset"}></i>
                </p>
                <p className="extra-info-leftside">
                  {timeStr} PM <br />
                  Sunset
                </p>
              </div>

              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-humidity"}></i>
                </p>
                <p className="extra-info-leftside">
                  {data?.main?.humidity} <br />
                  Humidity
                </p>
              </div>
            </div>

            <div className="weather-extra-info">
              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-rain"}></i>
                </p>
                <p className="extra-info-leftside">
                  {data?.main?.pressure} <br />
                  Pressure
                </p>
              </div>

              <div className="two-sided-section">
                <p>
                  <i className={"wi wi-strong-wind"}></i>
                </p>
                <p className="extra-info-leftside">
                  {data?.wind?.speed} <br />
                  Speed
                </p>
              </div>
            </div>
          </div>
        </article>
      ) : null}
    </>
  );
};

export default Weathercard;
