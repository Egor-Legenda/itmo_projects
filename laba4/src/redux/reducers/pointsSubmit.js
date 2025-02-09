// pointsSubmit.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {addPoint} from "../redux/reducers/pointsReducer";

// Асинхронное действие для отправки точки на сервер

export const fetchPoints = createAsyncThunk('points/fetchPoints', async (_, thunkAPI) => {
    const response = await fetch('http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/points', {
        credentials: 'include', // Для передачи сессии
    });

    if (!response.ok) {
        throw new Error('Failed to fetch points');
    }

    return await response.json();
});


export const submitPoint = (point) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/points/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(point),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to submit point');
        }
        const data = await response.json();
        dispatch(addPoint(data));
        return data; // Верните точку, добавленную на сервере
    } catch (error) {
        console.error('Ошибка сети:', error);
           }
};

const pointsSlice = createSlice({
    name: 'points',
    initialState: {
        points: [], // Хранилище точек
        r: NaN, // Радиус
        status: 'idle',
        error: null,
    },
    reducers: {
        setRadius: (state, action) => {
            console.log('setRadius payload:', action.payload);

            state.r = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoints.fulfilled, (state, action) => {
                state.points = action.payload; // Загружаем точки с сервера
            })
            .addCase(submitPoint.fulfilled, (state, action) => {
                state.points.push(action.payload);
            });
    },
});

export const { setRadius } = pointsSlice.actions;
export default pointsSlice.reducer;
