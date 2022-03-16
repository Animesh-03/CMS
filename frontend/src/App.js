import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [msg,setMsg] = useState("");

  useEffect(() => {
    //Send a get request to the backend
    axios.get("http://localhost:3000")
      .then(res => {
        setMsg(res.data.response);  //Set the message to the response recieved
      });

  },[])

  return (
    <div className="App">
      <p>Msg is {msg}</p> {/*Display the message*/}
    </div>
  );
}

export default App;
