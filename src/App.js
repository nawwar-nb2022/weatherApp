import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import {useSelector , useDispatch} from "react-redux";
import Current from "./components/Current/Current";
import Chart from "./components/Hourly/Chart";
import TopBar from "./components/TopBar/TopBar";
import { fetchData } from "./features/fetchSlice"


import "./App.scss"
function App() {
  const state = useSelector(state=>state.data)

  const dispatch = useDispatch()
  const loadingRef = useRef(null)
  
// dispatch data from the api
  useEffect(()=>{
      dispatch(fetchData(state.url)) 
  },[state.url , dispatch])

// adding lottie while loading 
  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: loadingRef.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData : require("./lottie/loaderScreen.json")
    });
    return () => {
      instance.destroy()
    }
  }, [])



console.log(state);
  
  return (
    <div className="App">
        {state.loading && 
          <div  className="loadingScreen">
              <div ref={loadingRef}></div>
          </div>
        }
        {!state.loading && state.error ? <div> you have pass a wrong city or country name please refresh  {console.log(state.error)}</div> : null}
        {!state.loading && !state.error &&state.data ? 
            <div className="mainContainer">
              <TopBar />
              <Current state={state.data}/>
              <Chart/>
            </div>

          :null}
    </div>
  );
}

export default App;
