import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
function CreateUserAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);
  //const [cfmPassword, setcfmPassword] = useState("");

  // Validation (Not too sure if validation should be done here or at controller)
  const form = useForm({
    initialValues: { name: "", password: "secret", email: "" },

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
  // Load userProfiles from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/createuserprofile/all")
      .then(({ data }) => {
        if (data) {
          const options = data.map((profile) => {
            return { value: profile.id, label: profile.profileName };
          });
          setProfileOptions(options);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // Not yet make changes
  function handleSubmit(event) {
    event.preventDefault();
    console.log(userProfile);
    axios
      .post("http://localhost:8080/createuseraccount/add", {
        name: name,
        password: password,
        email: email,
        userProfile: {
          id: userProfile,
        },
      })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
  function handleReturn(event) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>UserAdmin Create Account</h1>
      <div className="card">
        <form>
          {/* Name */}
          <div style={{ width: "100%" }}>
            <label htmlFor="name">Name:</label>
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
            <label htmlFor="email">Email:</label>
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
            <label htmlFor="Password">Password:</label>
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

          <div style={{ width: "100%" }}>
            <label htmlFor="userprofile">User Profile:</label>
            <Select
              label="Your favorite framework/library"
              placeholder="Pick one"
              data={profileOptions}
              value={userProfile}
              onChange={setUserProfile}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReturn}>Return</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserAccount;
