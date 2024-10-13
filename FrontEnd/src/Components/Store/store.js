import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./Slice/authslice"
 
export default configureStore({
  reducer: {
    auth: counterReducer,
  },
})