import { useEffect, useRef, useState } from "react"
import { useDispatch , useSelector } from "react-redux"
import { fetchChart } from "../../features/ChartSlice"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line  } from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import "./Chart.scss"
import Lottie from "lottie-web";
  const Chart = () => {
    const time = new Date(1684206000 *1000)  
    const dispatch = useDispatch()
    const state = useSelector(state=>state.Chart)
    const list  = state.data.list ? state.data.list : ""
    useEffect(()=>{
        dispatch(fetchChart("https://api.openweathermap.org/data/2.5/forecast?lat=34.889&lon=35.8866&units=metric&appid=8c71888891aa892d31a379a929c2d472"))
    },[dispatch])
console.log(list);
    const CustomsValue= ()=>{
        if(list){
            return(
                <div className="mainChartLegend">
                    <div className='title'>
                        <p>
                            <ShowChartIcon sx={{fontSize:"12px" , color :"crimson"}}/> temperature
                        </p>
                        <p>
                            <ShowChartIcon sx={{fontSize:"12px" , color :"#ffc658"}}/>  windSpeed
                        </p>
                    </div>
                    <div className="note">
                        this chart should weather state for the next five days with 3 hour step
                    </div>
                </div>
            )
        }
        return ""
    }
    const loadingRef = useRef(null)
    // console.log(loadingRef.current)
    useEffect(() => {
        const instance = Lottie.loadAnimation({
            container: loadingRef.current, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData : require("../../lottie/loaderScreen.json")
            });
        return () => {
          instance.destroy()
        }
      }, [])
    
    
    return (
        <div  className="ChartHours">    
            {state.loading && 
                        <div className="loading"  >
                            <div ref={loadingRef} style={{height:"500px", width:"100%"}}></div>
                            please wait we getting data 
                        </div>
            }
            {!state.loading && state.error ?
                <div>
                    some thing went wrong
                </div>
                :
                null
            }
            {!state.loading && !state.error && state.data ?
            <div className="rechartHeight">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={400}
                        data={list}
                    >
                    <CartesianGrid strokeDasharray="0 3" />
                        <XAxis stroke="#fff"  dataKey="weather[0].main"/>
                        <YAxis  stroke="#fff" />
                        <Legend verticalAlign="top" align="center" content={<CustomsValue/>}/>
                        <Tooltip  />
                        <Line dot={false} type="monotone" dataKey="main.temp" name="temperature"  stackId="1" stroke="crimson"  />
                        <Line dot={false} type="monotone" dataKey="wind.speed" stackId="1" name="windSpeed" stroke="#ffc658"  />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            : 
                null
            }

 
       
        </div>
    )
}

export default Chart









// import React, { PureComponent } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



// export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>
//     );
//   }
// }





