import React from 'react';
import {RepositoryList} from './repositoryList'
import './App.css';

import { DetailsComponent } from "./DetailsComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './i18n';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RepositoryList/>} />
                <Route path="/detail" element={<DetailsComponent/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
