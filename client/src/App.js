import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DocsForm from "./DocsForm";



function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <div className="Header-div">
        <h1 className="Header-one">Cover Letter Generator</h1>
        <p>Powered with OpenAI's GPT-3 language model.</p>  
      </div>
      <DocsForm />

      
    </div>
  );
}


export default App;
