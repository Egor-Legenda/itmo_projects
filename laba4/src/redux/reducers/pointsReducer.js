import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Асинхронное получение точек пользователя

export const fetchPoints = createAsyncThunk('points/fetchPoints', async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;

    const response = await fetch('http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/points/user', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch points');
    }
    return await response.json();
});

const pointsReducer = createSlice({
    name: 'points',
    initialState: { points: [], r: 0, loading: false, error: null },
    reducers: {
        addPoint: (state, action) => {
            state.points.push(action.payload);
        },
        setRadius: (state, action) => {
            console.log("gg")
            state.r = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPoints.fulfilled, (state, action) => {
                state.loading = false;
                state.points = action.payload;
            })
            .addCase(fetchPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addPoint, setRadius } = pointsReducer.actions;


export default pointsReducer.reducer;
