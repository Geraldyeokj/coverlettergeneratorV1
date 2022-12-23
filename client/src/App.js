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
      <h1>Cover Letter Generator</h1>
      <DocsForm />
    </div>
  );
}

export default App;
