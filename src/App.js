import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import { Routes } from "./app/router/Routes";
import logo from './logo.svg';
import './App.css';

function App() {
  return (

    <BrowserRouter>
      <LastLocationProvider>
        <Routes />
      </LastLocationProvider>
    </BrowserRouter>
  );
}

export default App;
