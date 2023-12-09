import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignInOutContainer from './containers';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignInOutContainer />} />
     </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
