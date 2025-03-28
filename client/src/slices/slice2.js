import { createSlice } from "@reduxjs/toolkit";
let initialstate={
    fruits:[]
};
export let fruitslice=createSlice({
    name:"fruit",
    initialState:initialstate,
    reducers:{
        add:(state,action)=>
        {
            state.fruits=[...initialstate.fruits,action.payload];
        }
    }
});
export let{add}=fruitslice.actions;
export default fruitslice.reducer;