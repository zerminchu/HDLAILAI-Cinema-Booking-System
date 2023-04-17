import { useState } from "react";
import axios from "axios";
import { useForm } from '@mantine/form';
function CreateUserAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userprofile, setProfile] = useState("");
  //const [cfmPassword, setcfmPassword] = useState("");

  
  // if i set this as const, i cannot add more profiles in
  const profileOptions = [
    { value: "", label: "Select a profile" },
    { value: "Admin", label: "Admin" },
    { value: "CinemaOwner", label: "Cinema Owner" },
    { value: "CinemaManager", label: "Cinema Manager" },
    { value: "Customer", label: "Customer" }
  ];

  // Validation (Not too sure if validation should be done here or at controller)
  const form = useForm({
    initialValues: { name: '', password: 'password', email: ''},

    // functions will be used to validate values at corresponding key
    /*validate: {
      // name: (value) => (value.length == 0 ? 'Name must not be blank' : null),
      name: (value) => (value.length == 0 ? 'Please Fill Up the Field!' : null),
      //name: (value) => (value.length < 4 ? 'Name must have at least 4 letters' : null),
      name: (value) => (value.length < 4 ? 'Field must have at least 4 characters!' : null),
      //username: (value) => (value.length == 0 ? 'Username must not be blank' : null),
      username: (value) => (value.length == 0 ? 'Please Fill Up the Field!' : null),
      //username: (value) => (value.length < 4 ? 'Username must have at least 4 letters' : null),
      username: (value) => (value.length < 4 ? 'Field must have at least 4 characters!' : null),
      //password: (value) => (value.length == 0 ? 'Password must not be blank' : null),
      password: (value) => (value.length == 0 ? 'Please Fill Up the Field!' : null),
      //password: (value) => (value.length < 4 ? 'Password must have at least 8 characters' : null),
      password: (value) => (value.length < 4 ? 'Field must have at least 4 characters!' : null),
      cfmPassword: (value, values) =>(value !== values.password ? 'Confirm Password does not match Password!' : null),
        
    }, */
  });
  
  // Not yet make changes
  function handleSubmit(event) {
    event.preventDefault();
    console.log (name);
    axios
      .post("http://localhost:8080/createuseraccount/add", { name: name, password: password, email: email, userprofile: userprofile})
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
  function handleReturn(event){
    event.preventDefault();

  }

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
    <div>
      <h1>UserAdmin Create Account</h1>
      <div className="card">
        <form onSubmit>
          {/* Name */}
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
          {/* Email */}
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
              placeholder="JohnDoe@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
             
            />
          </div>
          {/* Password */}
          <div style={{ width: "100%" }}>
            <label for="Password">Password:</label>
            <input
              style={{
                margin: "10px",
                justifyContent: "center",
              }}
              type="password"
              name="password"
              value={password}
              placeholder="********"
              onChange={(event) => setPassword(event.target.value)}
            
            />
          </div> 
          {}
          <div style={{ width: "100%" }}>
            <label htmlFor="userprofile">User Profile:</label>
           <select
            style={{
                margin: "10px",
                justifyContent: "center",
            }}
            name="userprofile"
            value={userprofile}
            onChange={(event) => setProfile(event.target.value)}
         
  >
            {profileOptions.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
            </select>
            </div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReturn}>Return</button>
        </form>
      </div>
    </div>
    </form>
  );
}

export default CreateUserAccount;
