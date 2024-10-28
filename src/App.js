import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateProduct from './components/createProduct';
import Header from './components/Header';
//import { requestPermissionAndGetToken } from './firebaseMessaging'; 

function App() {
  // useEffect(() => {
  //   requestPermissionAndGetToken();
  // }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
