import { useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/demo/add", { name: name, email: email })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <form onSubmit>
          <div style={{ width: "100%" }}>
            <label for="name">Name:</label>
            <input
              style={{
                margin: "10px",
                justifyContent: "center",
              }}
              type="text"
              name="name"
              value={name}
              placeholder="John Doe"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div style={{ width: "100%" }}>
            <label for="email">Email:</label>
            <input
              style={{
                margin: "10px",
                justifyContent: "center",
              }}
              type="text"
              name="email"
              value={email}
              placeholder="example@email.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
