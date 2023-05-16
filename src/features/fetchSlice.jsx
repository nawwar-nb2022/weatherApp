import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const api  = {
//     key : "8c71888891aa892d31a379a929c2d472",
//     baseUrl : "https://api.openweathermap.org/data/2.5/"
//   }
// url : `https://api.openweathermap.org/data/2.5/weather?q=Boston&units=metric&APPID=8c71888891aa892d31a379a929c2d472`
// https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=38&exclude=current,hourly,daily&appid=8c71888891aa892d31a379a929c2d472
const initialState = {
    loading : true,
    error : "",
    data : [],
    url :'https://api.openweathermap.org/data/2.5/weather?q=tartous&units=metric&APPID=8c71888891aa892d31a379a929c2d472'
}

export const fetchData = createAsyncThunk(
    "data/fetchData",
    (url)=>{
      return axios.get(url)
        .then(res=>res.data)
    }
)
const fetchSlice = createSlice({
    name : "data",
    initialState,
    reducers  :{
         regin : (state , action)=>{
            state.url = `https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&units=metric&APPID=8c71888891aa892d31a379a929c2d472`
            console.log(action.payload)
            console.log("state.url" , state.url)
        }
    },
    extraReducers : (builder)=>{
        
        builder.addCase(fetchData.pending , (state)=>{
            state.loading   = true
        })
        builder.addCase(fetchData.fulfilled , (state , action)=>{
            state.loading = false
            state.error = ""
            state.data = action.payload
        })
        builder.addCase(fetchData.rejected  , (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.data = []
        })
    }
})

export default fetchSlice.reducer;
export const { regin } = fetchSlice.actions;