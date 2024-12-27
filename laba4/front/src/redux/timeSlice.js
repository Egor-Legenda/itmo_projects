// src/redux/timeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const timeSlice = createSlice({
    name: 'time',
    initialState: {
        currentTime: '',
    },
    reducers: {
        setTime(state, action) {
            state.currentTime = action.payload;
        },
    },
});

export const { setTime } = timeSlice.actions;
export default timeSlice.reducer;
