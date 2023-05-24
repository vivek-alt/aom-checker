import React, { useState } from 'react';
import Login from './login';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Page from './page';
function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
    </BrowserRouter>
    </div>);
}
export default App;
