import React from 'react';
import './App.css';
import Intersection from "./Component/Intersection"

function App() {
  return (
    <div className="App">
      <Intersection onVisible = {() => console.log("Visisble")}/>
    </div>
  );
}

export default App;
