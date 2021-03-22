// OpenWeather Info
const openWeatherKey = '4a1d4c33d92aa2e4b0c2ad6b20f288c5';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weekDays = ['Domenica','Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const getForecast = async () => {
    const cityID = '3218998';
    const urlToFetch = weatherUrl+'?id='+cityID+'&APPID='+openWeatherKey+'&lang=it';
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        return jsonResponse;
      }
    }
    catch (error) {
      console.log(error);
    }
  
  }

const renderForecast = (day) => {
  let weatherContent = createWeatherHTML(day);
  document.getElementById('forecast-container').innerHTML=weatherContent;
}


function format_time(s) {
    return new Date(s * 1e3).toISOString().slice(-13, -5);
}  

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

const createWeatherHTML = (currentDay) => {
    // console.log(currentDay)
    let readingTime = currentDay.dt;
    let time = new Date(readingTime * 1e3);
    // let timeLocal = new Date(readingTime * 1e3).toLocaleTimeString();
    let date = new Date(readingTime * 1e3);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = time.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();

    let twoDigitMonth = (month + 1).toString().padStart(2, '0'); // "04"

    function twoDigitDateDay (rawDay) {
      if (rawDay<10){
        return day.toString().padStart(2, '0');
      } else {
        return rawDay;
      }
    }
  


    let sunrise = new Date(currentDay.sys.sunrise * 1e3).toLocaleTimeString();
    let sunset = new Date(currentDay.sys.sunset * 1e3).toLocaleTimeString();
    // return `<h2>${currentDay.name}</h2>
    //     <h3>${time}</h3>
    //     <h3>${weekDays[(new Date()).getDay()]}, ${date}, ${time}</h3>
    //     <h3>Temperatura: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;C</h3>
    //     <h3>Percepcija temperature: ${kelvinToFahrenheit(currentDay.main.feels_like)}&deg;C</h3>
    //     <h3>Pritisak: ${currentDay.main.pressure} hpA</h3>
    //     <h3>Vjetar: ${currentDay.wind.speed}m/s</h3>
    //     <h3>Izlazak sunca: ${sunrise}</h3>
    //     <h3>Izlazak sunca: ${sunset}</h3>
    //     <h3>Vlaga: ${currentDay.main.humidity}%</h3>
    //     <h3>Stanje: ${capitalize(currentDay.weather[0].description)}</h3>
    //     <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
    return ` 
              <a id="forecast-close-button" href="#contatti" onclick="closeWeather()"  class="forecast-closebtn">&times;</a>
                        
              <div class="forecast-body">
                  <div>
                      <img  id="forecast-icon" src="resources/weatherIcons/${currentDay.weather[0].icon}@2x.png">
                  </div>
                  <div>
                      <h3 id="temperature">${kelvinToFahrenheit(currentDay.main.temp)}&deg;C</h3>  
                      <h3>${capitalize(currentDay.weather[0].description)}</h3>                        
                  </div>
                  <div>
                      <h2>${currentDay.name}</h2>
                      <h4>${weekDays[(new Date()).getDay()]}, ${twoDigitDateDay(day)} ${months[month]}, ${hour}:${minute}</h3>
                  </div>                            
              </div>`

    // Condition to use custom icons if available, otherwise use openweather icons 
  //         if (currentDay.weather[0].icon === '01d' || currentDay.weather[0].icon === '01n' || currentDay.weather[0].icon === '04n' || currentDay.weather[0].icon === '04d' ){              
  //             return ` 
  //             <a id="forecast-close-button" href="#contatti" onclick="closeWeather()"  class="forecast-closebtn">&times;</a>
                        
  //             <div class="forecast-body">
  //                 <div>
  //                     <img  id="forecast-icon" src="resources/weatherIcons/${currentDay.weather[0].icon}@2x.png">
  //                 </div>
  //                 <div>
  //                     <h3 id="temperature">${kelvinToFahrenheit(currentDay.main.temp)}&deg;C</h3>  
  //                     <h3>${capitalize(currentDay.weather[0].description)}</h3>                        
  //                 </div>
  //                 <div>
  //                     <h2>${currentDay.name}</h2>
  //                     <h4>${weekDays[(new Date()).getDay()]}, ${twoDigitDateDay(day)} ${months[month]}, ${hour}:${minute}</h3>
  //                 </div>                            
  //             </div>`;
  //         } else {

  //         return ` 
  //         <a id="forecast-close-button" href="#contatti" onclick="closeWeather()"  class="forecast-closebtn">&times;</a>
                        
  //         <div class="forecast-body">
  //             <div>
  //                 <img  id="forecast-icon" src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">
  //             </div>
  //             <div>
  //                 <h3 id="temperature">${kelvinToFahrenheit(currentDay.main.temp)}&deg;C</h3>  
  //                 <h3>${capitalize(currentDay.weather[0].description)}</h3>                        
  //             </div>
  //             <div>
  //                 <h2>${currentDay.name} ${currentDay.weather[0].icon}</h2>
  //                 <h4>${weekDays[(new Date()).getDay()]}, ${twoDigitDateDay(day)} ${months[month]}, ${hour}:${minute}</h3>
  //             </div>                            
  //         </div>`;
  //         }
  }
  
  const kelvinToFahrenheit = k => (k-273.15).toFixed(0);
  