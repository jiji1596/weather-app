import { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function WeatherCard({ weather }) {
    return (
      <>
        <h2 className="text-4xl">{weather.name}</h2>
        <div className="flex w-half">
          <div className="card rounded-box grid h-24 grow place-items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24"
            />
          </div>
          <div className="card rounded-box grid h-24 grow place-items-center">
            <p className="text-4xl font-bold">
              {Math.round(weather.main.temp)}°C
            </p>
          </div>
        </div>

        <span className="capitalize text-2xl">
          {weather.weather[0].description}
        </span>
        <div className="text-lg mt-2 opacity-70">
          Humidity: {weather.main.humidity}% • Wind: {weather.wind.speed} m/s
        </div>
      </>
    );
  }

  function onChangeQuery(event) {
    setSearchQuery(event.currentTarget.value);
  }

  function getData() {
    setLoading(true);
    setData(null);
    setError(false);

    const apiKey = "16459259815a0e8e9dc07e9595619fb3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(true);      // 👈 city not found
          setLoading(false);
          return;
        }

        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Stop loading even if there's an error
      });
  }

  return (
    <>
      <div className="place-items-center">
        <div className="search-container bg-base-100 shadow-xl mb-3">
          <h1 className="font-mono text-secondary text-shadow-lg pt-3">
            Weather App
          </h1>
          <div className="pt-3 flex gap-3 justify-center  ">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search a place"
              className="input input-md"
              onChange={onChangeQuery}
            />
            <button className="btn btn-secondary" onClick={getData}>
              Search
            </button>
          </div>
          <div className="card-body items-center">
            {error && <p>Can't find the city</p>}
            {loading && <span className="loading loading-dots loading-xl"></span>}
            {data && <WeatherCard weather={data} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
