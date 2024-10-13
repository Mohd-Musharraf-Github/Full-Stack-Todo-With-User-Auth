import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    user:"",
    isLoggedIn:false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;      
    },
    logout: (state) =>{
      state.isLoggedIn = false;
    }
    
  },
})


export const { login, logout, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer