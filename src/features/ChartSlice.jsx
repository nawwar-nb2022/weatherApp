import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading : false,
    error  :"",
    data : [],
    cordUrl : "https://api.openweathermap.org/data/2.5/forecast?lat=34.889&lon=35.8866&appid=8c71888891aa892d31a379a929c2d472"
}

export const fetchChart = createAsyncThunk(
    "Chart/fetchChart",
    (url)=>{
      return axios.get(url)
        .then(res=>res.data)
    }
)
const ChartSlice = createSlice({
    name:"Chart",
    initialState,
    reducers : {
        cord : (state , action)=>{
            state.url = `api.openweathermap.org/data/2.5/forecast?lat=${action.payload[0]}&lon=${action.payload[1]}&appid=8c71888891aa892d31a379a929c2d472`
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchChart.pending ,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchChart.rejected , (state ,action)=>{
            state.loading = false
            state.error = action.
            state.data =[]
        })
        builder.addCase(fetchChart.fulfilled , (state, action)=>{
            state.loading = false
            state.error = ""
            state.data = action.payload
        })
    }
})

export default ChartSlice.reducer
export const {cord} = ChartSlice.actions