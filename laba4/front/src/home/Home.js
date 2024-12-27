import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import TimeDisplay from '../components/TimeDisplay';
import PointsTable from "../components/PointsTable";
import Graph from '../components/Graph';
import PointInputForm from "../components/PointInputFrom";
import Header from "../cap/Header";
import LogoutButton from "../authorizations/Logout";


const Home = () => {

    return (
        <Provider store={store}>
            <LogoutButton />
            <div id="style-header">
                <Header/>
            </div>
            <Graph/>
            <div id="time-container">
                <TimeDisplay/>
            </div>
            <div id="formSubmit">
                <PointInputForm/>
            </div>
            <div id="resultsTable">
                <PointsTable/>

            </div>
        </Provider>
    );
};

export default Home;