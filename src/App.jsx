import { useState } from 'react'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);

  function WeatherCard({ weather }) {
  return (
    <>
    <h2 className="card-title text-xl">{weather.name}</h2>
    <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
    <div className="flex items-center gap-2">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="w-16 h-16"
      />
      <span className="capitalize">{weather.weather[0].description}</span>
    </div>
    <div className="text-sm mt-2 opacity-70">
      Humidity: {weather.main.humidity}% • Wind: {weather.wind.speed} m/s
    </div>
    </>
  );
}

  function onChangeQuery(event) {
    setSearchQuery(event.currentTarget.value);
  }

  function getData() {
    const apiKey = "16459259815a0e8e9dc07e9595619fb3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`

    fetch(url)
      .then(resp => resp.json())
      .then((data) => {
        setData(data);
      });

    setSearchQuery("");
  }

  return (
    <>
    <div className="search-container bg-base-100 shadow-xl">
      <div className="mt-3 d-flex">
        <input type="text"
          value={searchQuery}
          placeholder='Search a place'
          className='input input-md'
          onChange={onChangeQuery}
          />
        <button className="btn btn-primary" onClick={getData}>Large</button>
      </div>
      <div className="card-body items-center">
      { data && < WeatherCard weather={data} />}
        </div>
      </div>
    </>
  )
}

export default App
