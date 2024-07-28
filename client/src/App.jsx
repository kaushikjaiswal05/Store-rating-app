import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import StoreDetails from './components/storedetails/StoreDetails';
import StoreList from './components/storelist/StoreList';
import { AuthContextProvider } from './components/AuthContextProvider';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stores" element={<StoreList />} />
          <Route path="/stores/:id" element={<StoreDetails />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
