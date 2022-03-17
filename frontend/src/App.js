import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [msg,setMsg] = useState({});

  useEffect(() => {
    //Send a get request to the backend
    axios.get("http://localhost:3000")
      .then(res => {
        setMsg(res.data);  //Set the message to the response recieved
      });

  },[])

  return (
    <div className="App">
      <p>Msg is {msg.length && msg[0].username} </p> {/*Display the message*/}
    </div>
  );
}

export default App;