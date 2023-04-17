import { useEffect, useState } from "react";
import { TextInput, PasswordInput, Button, Select } from "@mantine/core";
import axios from "axios";
import "./TestCss.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// import { EmailFieldTest, PasswordFieldTest } from "./LoginFieldsTest";

function LoginFormTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);
  // Load user profiles
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

  function handleSubmit(event) {
    // Prevent submit from refreshing the page
    event.preventDefault();
    // handle submit here
    axios
      .post("http://localhost:8080/login", {
        userProfile: { id: userProfile },
        email: email,
        password: password,
      })
      .then((response) => {
        alert(response.data);
      })
      .catch((response) => {
        alert(response.data);
      });
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <div className="formFields">
        <Select
          data={profileOptions}
          value={userProfile}
          placeholder="Login As"
          onChange={setUserProfile}
        />

        <TextInput
          className="EmailFieldTest"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <PasswordInput
          className="PasswordFieldTest"
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

export default LoginFormTest;
