// src/components/TimeDisplay.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from '../redux/timeSlice';
import axios from 'axios';

const TimeDisplay = () => {
    const dispatch = useDispatch();
    const currentTime = useSelector((state) => state.time.currentTime);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await axios.get('http://localhost:8080/laba3-1.0-SNAPSHOT/rest-server/time');
                dispatch(setTime(response.data));
            } catch (error) {
                console.error('Error fetching time:', error);
            }
        };

        fetchTime();
        const intervalId = setInterval(fetchTime, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <div id ="time-container">
            <h1>{currentTime}</h1>
        </div>
    );
};

export default TimeDisplay;