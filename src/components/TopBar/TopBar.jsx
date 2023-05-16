import { useState } from "react";
import { useDispatch } from "react-redux";
import { regin } from "../../features/fetchSlice"
import SearchIcon from '@mui/icons-material/Search';
import "./TopBar.scss";
const TopBar = () => {
    const  dispatch = useDispatch()  
    const [city , setCity] = useState("")
    const [show , setShow] = useState(false)

    const timeTitle =new Date()
    let year = timeTitle.getFullYear()
    let month = timeTitle.toLocaleString('default', { month: 'long' });
    
    const handleChange = () =>{
        let reg =/^[a-z\u0621-\u064A ]{1,}$/gi;
       if(city ===""){
           window.alert("you need to add data to change the value ")
           setShow(false)
       } if(reg.test(city) === false){
            setShow(true)
            console.log(reg.test(city))
            console.log(city)
       }else{
           dispatch(regin(city))
           setShow(false)
       }
    }  
    return (
        <div className="TopBar">
            <div className="cities">
                <button className="btn"  onClick={()=>{dispatch(regin("London"))}}>London</button>
                <button className="btn"  onClick={()=>{dispatch(regin("paris"))}}>Paris</button>
                <button className="btn"  onClick={()=>{dispatch(regin("Tokio"))}}>Tokio</button>
                <button className="btn"  onClick={()=>{dispatch(regin("New york"))}}>New york</button>
                <button className="btn"  onClick={()=>{dispatch(regin("Beijing"))}}>Beijing</button>
            </div>
            <div className="search">
                <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder="search for place"/>
            {show && <p className="inputNot">you cant enter any special character or number</p>}
                <button onClick={handleChange}><SearchIcon sx={{color:"white"}}/></button>
            </div>
        </div>
    )
}

export default TopBar
