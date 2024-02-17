// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
// import allusers from './slice/allusers';


const store = configureStore({
  reducer: {
    user: userReducer,
  
  },
});

export default store;
