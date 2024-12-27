// import React from 'react';
// import { Gallery } from './Gallery';
//
// function App() {
//   return (
//       <div>
//         <Gallery />
//       </div>
//   );
// }
//
// export default App;
// src/App.js
import React from 'react';
import { useSessionCheck } from './session/useSessionCheck';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Authorization from "./authorizations/Authorization";
const App = () => {
    useSessionCheck();
    return (

        <Routes>
            <Route path={"/home"} element={<Home/>}/>
            <Route path={"/"} element={<Authorization />} />
            {/*<Route path={"/main"} element={<Main/>}/>*/}
        </Routes>

    );
};

export default App;


