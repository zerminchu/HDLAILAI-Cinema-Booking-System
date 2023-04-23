import { useEffect, useState } from "react";
import { TextInput, PasswordInput, Button, Select } from "@mantine/core";
import axios from "axios";
import "./LoginStyle.css";
// import "react-dropdown/style.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfileId, setUserProfileId] = useState(-1);
  const [profileOptions, setProfileOptions] = useState([]);
  // Load user profiles
  useEffect(() => {
    axios
      .get("http://localhost:8080/createuserprofile/all")
      .then(({ data }) => {
        if (data) {
          const options = data.map((profile) => {
            return { value: profile.id, label: profile.profileName };
          });
          setProfileOptions([...options]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit(event) {
    // Prevent submit from refreshing the page
    event.preventDefault();
    console.log(userProfileId);
    // handle submit here
    axios
      .post("http://localhost:8080/login", {
        userProfile: { id: userProfileId },
        email: email,
        password: password,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <div className="formFields">
        <Select
          className="profileField"
          data={profileOptions}
          value={userProfileId}
          placeholder="Login As"
          onChange={setUserProfileId}
        />

        <TextInput
          className="emailField"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <PasswordInput
          className="passwordField"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button className="loginBtn" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
