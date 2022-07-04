import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../assets/styles/reset.css";
import GlobalStyle from "../assets/styles/globalStyles";

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import BalancePage from "./BalancePage";
import IncomePage from "./IncomePage";
import ExpenditurePage from "./ExpenditurePage";

import UserContext from "../context/UserContext";

function App () {
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<LoginPage />} />
                    <Route path ="/signup" element = {<SignupPage />} />
                    <Route path="/balance" element = {<BalancePage />} />
                    <Route path="/income" element = {<IncomePage />} />
                    <Route path="/expenditure" element = {<ExpenditurePage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;