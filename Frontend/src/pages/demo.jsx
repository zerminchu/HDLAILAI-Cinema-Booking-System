import { useState } from "react";
import axios from "axios";

function Demo() {
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
    <div>
      <h1>DEMO</h1>
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
        </form>
      </div>
    </div>
  );
}

export default Demo;
