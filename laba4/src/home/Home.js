import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import TimeDisplay from '../components/TimeDisplay';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Home = () => {
    return (
        <Provider store={store}>
            <div id="time-container">
                <TimeDisplay/>
            </div>
            <div className="App">
                <LoginForm/>
                <RegisterForm/>
            </div>
        </Provider>
    );
};

export default Home;