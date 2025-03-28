import{createSlice}from "@reduxjs/toolkit";
let initialState={
    users:[{chct:"",st:"",specificProductsChCt:""}]
};
export let userSlice=createSlice(
    {
        name:"users",
        initialState,
        reducers:{
            setUsers:(state,action)=>
            {
                state.users=[action.payload];
            },
            deleteUser:(state,action)=>
            {
                state.users=state.users.filter((user,index)=>
                {
                    return(index!==action.payload);
                });
            }
        }
    }
);
export let{setUsers,deleteUser}=userSlice.actions;
export default userSlice.reducer;