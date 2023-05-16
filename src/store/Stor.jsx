import { configureStore } from "@reduxjs/toolkit";
import ChartSlice from "../features/ChartSlice";
import fetchSlice from "../features/fetchSlice";

const store = configureStore({
    reducer :{
        data : fetchSlice,
        Chart : ChartSlice,
    }
})

export default store;