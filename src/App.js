import React, { useState } from 'react';
import coldimg from './images/cold-img.jpg';
import warmimg from './images/warm-img.jpg';

const api = {
  key: "zpHBAzLBsEZNudpR9AzyS0D42oQTvQka",
  base: "http://dataservice.accuweather.com",
  autocomplete_path: "locations/v1/cities/autocomplete"
}

function App() {
  const [query, setQuery] = useState('');    // query //
  // console.log("query", query); 
  const [weather, setWeather] = useState({});

  const search = evt => {
    // if (evt.key === "Enter") {         MIGHT BE USELESS 
      fetch(`${api.base}/${api.autocomplete_path}?apikey=${api.key}&q=${evt.key}`) //added the autocomplete path will need new fetch every time
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    // }           ^^
  }


const dateGenerator = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)} //query //
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateGenerator(new Date())}</div>
          </div>
        <div className="weather-box">
          <div className="temp">
            15°c
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
