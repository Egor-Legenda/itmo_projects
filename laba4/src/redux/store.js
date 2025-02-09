// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import timeReducer from './timeSlice';
import authReducer from './reducers/authReducer';
import pointsReducer from './reducers/pointsReducer';


export const store = configureStore({
    reducer: {
        time: timeReducer,
        auth: authReducer,
        points: pointsReducer,
    },
});


