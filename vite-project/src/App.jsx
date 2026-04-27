import React from "react";
import Card from "./Components/card";
import "./App.css";

function App() {
  const Name = (props) => {
    console.log("hello", props.name);
  };
  return (
    <>
      <Name name="Pratik" />
    </>
  );
}
export default App;
