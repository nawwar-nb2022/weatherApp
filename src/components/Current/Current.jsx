import { useState } from "react"
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

import "./Current.scss"
const Current = ({state}) => {

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     let SunRise =""; let  sunSet = "" 
  //     state.sys ? SunRise =  state.data.sys.sunrise : SunRise = ""
  //     state.sys ? sunSet =  state.data.sys.sunset : sunSet = ""

  //     let time = new Date(SunRise * 1000)
  //     SetTimeRise(`${time.getHours()} : ${time.getMinutes()}`)

  //      let Settime = new Date(sunSet * 1000) 
  //      setTimeSet(`${Settime.getHours()} : ${Settime.getMinutes()}`)
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeOut)
  //   }
  // }, [state])

  
  const [SunRiseState , SetTimeRise] = useState()
  const [SunSetState ,setTimeSet ] = useState()

//  (°C * 1.8) + 32 = °F

    const weather = state.weather[0]
    return (
        <div className="currentWeather">
                
        <div className="mainWeather" title={weather.description}>
            <div className="cityName" title={state.sys.country}>
                    {state.name}
            </div>
            <div className="Weather_in">
                <p>{weather.main}</p>
                <img src={` https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt=""/>
            </div>
        </div>

        <div className="subContainer">
            <div className="SubSCON Temp">
                <div className="icon"><ThermostatIcon/> Temperature</div>
               <p className="value">
               {state.main.temp} C
               </p>
            </div>
            <div className="SubSCON Wind">
                <div className="icon"><AirIcon/> Wind speed</div>
                <p className="value">
                {state.wind.speed} meter/sec
                </p>
            </div>
            <div className="SubSCON pressure">
                <div className="icon"><CompressIcon/> pressure</div>
                <p className="value">
                {state.main.pressure}  hPa
                </p>
            </div>
            <div className="SubSCON humidity">
                <div className="icon"><WaterDropIcon/> humidity</div>
               <p className="value">
               {state.main.humidity} %
               </p>
            </div>
        </div>

        </div>
    )
}

export default Current
