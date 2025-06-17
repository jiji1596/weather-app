import { useState } from 'react'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);

  function WeatherCard({ weather }) {
  return (
    <>

    <div className="flex gap-5">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="w-32 h-32"
      />
      <div className="flex-col justify-center">
        <h2 className="text-2xl">{weather.name}</h2>
        <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      </div>
    </div>


    <span className="capitalize">{weather.weather[0].description}</span>
    <div className="text-md mt-2 opacity-70">
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`

    fetch(url)
      .then(resp => resp.json())
      .then((data) => {
        setData(data);
      });
  }

  return (
    <>
    <div className="search-container bg-base-100 shadow-xl mb-3">
      <h1 className="font-mono text-secondary text-shadow-lg pt-3">Weather App</h1>
      <div className="pt-3 flex gap-3 justify-center  ">
        <input type="text"
          value={searchQuery}
          placeholder='Search a place'
          className='input input-md'
          onChange={onChangeQuery}
          />
        <button className="btn btn-secondary" onClick={getData}>Search</button>
      </div>
      <div className="card-body items-center">
        { data &&
        < WeatherCard weather={data} />
        }
      </div>
    </div>
    </>
  )
}

export default App
