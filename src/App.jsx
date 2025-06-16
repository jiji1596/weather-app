import { useState } from 'react'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  function onChangeQuery(event) {
    setSearchQuery(event.currentTarget.value);
  }

  function getData() {
    const apiKey = "16459259815a0e8e9dc07e9595619fb3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`

    fetch(url)
      .then(resp => resp.json())
      .then((data) => {
        console.log(data);
      })
  }

  return (
    <>
    <div className='search-container'>
      <input type="text"
        value={searchQuery}
        placeholder='Search a place'
        className='input input-md'
        onChange={onChangeQuery}
        />
      <button className="btn btn-primary" onClick={getData}>Large</button>
    </div>
    </>
  )
}

export default App
