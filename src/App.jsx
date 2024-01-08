import { useState } from 'react'
import './App.css'





function App() {

  const[city,setCity]=useState("")
  const[weatherData,setWeatherData]=useState(null);
  const[error,setError]=useState(null)


  function fetchData(){
    fetch(`http://api.weatherapi.com/v1/current.json?key=a0e1806263ce421e88981800240301&q=${city}&aqi=yes`)
    .then(async function(res){
      const data=await res.json();
      if(!res.ok){
        console.log("error")
        setError("error")
      }
      else{
        setWeatherData(data.current)
        setError(null)
      }
    })
  }


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", objectFit:"fit"}}>
      <div style={{ textAlign: "center" }}>
        <div>
          <input style={{ height: "30px", width: "200px", borderRadius: "20px" }} type='text' placeholder='   Enter Your City' onChange={function (e) {
            const value = e.target.value
            setCity(value);
          }}></input>
          <button style={{ marginLeft: "20px", height: "30px", width: "150px", borderRadius: "20px" }} onClick={()=>{
            // setCity(value),
            fetchData()
          }}>Get Weather</button>
        </div>

        
        {error ? <div>No City Found</div> : 
          <div style={{ borderRadius: "10px", background: "black", color: "white", width: "500px", height: "500px" ,backgroundImage:`url(${weatherData.condition.icon})`,backgroundSize:"cover",backgroundPosition:"center"}} >
            <h3 style={{ fontSize: "30px", paddingTop: "20px", marginLeft: "50px", display: "flex", alignContent: "flex-start" }}>{city}</h3>
            <h1 style={{ fontSize: "80px", marginTop: "-20px", marginLeft: "50px", display: "flex", alignContent: "flex-start" }}>{weatherData.temp_c}°C</h1>
  
            <p style={{ fontSize: "17px", paddingTop: "120px", marginLeft: "50px", display: "flex", alignContent: "flex-start" }}> Today's weather is {weatherData.condition.text} in {city}</p>
  
            <div style={{ borderRadius: "50px", marginLeft: "50px", display: 'flex', justifyContent: "space-evenly", background: "grey", width: "400px" }}>
              <div>
                <p>Wind </p>
                <p>{weatherData.wind_kph} kph</p>
              </div>
              <div>
                <p>Precipitation</p>
                <p>{weatherData.precip_mm} mm</p>
              </div>
              <div>
                <p>Humidity</p>
                <p>{weatherData.humidity} %</p>
              </div>
              <div>
                <p>Air Quality</p>
                <p>{weatherData.air_quality.co}</p>
              </div>
            </div>
          </div>
          }
        
      </div>
    </div>
  )
  
}

export default App
