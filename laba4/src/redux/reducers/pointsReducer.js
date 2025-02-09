import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное получение точек пользователя
export const fetchPoints = createAsyncThunk('points/fetchPoints', async () => {
    const response = await fetch('/api/points/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch points');
    }
    return await response.json();
});

const pointsSlice = createSlice({
    name: 'points',
    initialState: { points: [], loading: false, error: null },
    reducers: {},
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

export default pointsSlice.reducer;
