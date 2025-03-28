import { createSlice } from "@reduxjs/toolkit";

let initialstate={
    login:[{username:""}]
};
export let loginslice=createSlice({
    name:"login",
    initialState:initialstate,
    reducers:{
        add:(state,action)=>
        {
          state.login=[action.payload];
        }
    }
});
export let{add}=loginslice.actions;
export default loginslice.reducer;