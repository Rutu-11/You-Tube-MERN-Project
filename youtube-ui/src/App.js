import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import axios from'axios'
function App() {
  const [videos, setVideos]= useState([]);
  // "proxy": "http://localhost:8080/api/"
  const fetchData=async()=>{
    let res = await axios.get("http://localhost:8080/api/videos/random");
    let data = await res.json();
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="App">
     display data
    </div>
  );
}

export default App;
