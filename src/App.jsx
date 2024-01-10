import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState("london");
  const [data,setData]=useState([])
  

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a0e1806263ce421e88981800240301&q=${city}&aqi=no`);
          const data = await response.json();
          setData(data)
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData()
     
    },[city])



  return (
    < div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',background:'black', height:'100vh' ,width:'100%'}}>
      <div style={{textAlign:'center'}}>
        <input style={{textAlign:'center',color:'white',boxShadow: '0 0 10px 2px white', animation: 'glow 2s infinite',border:'none',borderRadius:'20px',height:'30px', width:'300px',background:'black'}}
          type='text'
          placeholder='     Enter Your City'
          onChange={(e) => {
            setCity(e.target.value);
          }}
        /><br>
        </br>
        

        <div style={{boxShadow: '0 0 10px 2px white', animation: 'glow 2s infinite' ,marginTop:'50px',paddingTop:'15px',border:'1px solid grey',borderRadius:'15px',background:'black', height:'500px' ,width:"400px",color:'white'}}>
          {data.current ? <p>{data.current.last_updated}</p> : null}
          {data.current ? <h1>{data.current.temp_c} °C</h1> : null}
          {data.location ? <p style={{paddingTop:'40px'}}>{data.location.name}</p> : null}
          {data.current ? <p style={{color:'grey'}}>{data.current.condition.text}</p> : null}
          <div style={{paddingTop:'120px',display:'flex', justifyContent:'space-evenly'}}>
            <div>
              {data.current ? <p>{data.current.humidity}%</p> : null }
              <p>Humidity</p>
            </div>
            <div>
              {data.current ? <p>{data.current.wind_kph} km/h</p> : null}
              <p>Wind</p>
            </div>
            <div>
              {data.current ? <p>{data.current.precip_mm}mm</p> : null}
              <p>Rain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
