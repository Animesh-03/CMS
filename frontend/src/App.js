import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const [msg,setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000")
      .then(res => {
        setMsg(res.data.response);
      });
  },[])

  return (
    <div className="App">
      <p>Msg is {msg}</p>
    </div>
  );
}

export default App;
