import { useEffect, useState } from "react";
import { TextInput, PasswordInput, Button, Select } from "@mantine/core";
import axios from "axios";
import "./LoginStyle.css";
import { useAuth } from "../../AuthContext";
import * as jose from "jose";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
// import "react-dropdown/style.css";

function LoginForm() {
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfileId, setUserProfileId] = useState(-1);
  const [profileOptions, setProfileOptions] = useState([]);
  
  const navigate = useNavigate();
  // Load user profiles
  useEffect(() => {
    axios
      .get("http://localhost:8080/viewuserprofile/all")
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

  function login(event) {
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
        console.log(response);
        const token = response.data;
        const decodedToken = jose.decodeJwt(token);
        localStorage.setItem("jwt", token);
        setCurrentUser(decodedToken);

        notifications.show({ title: "Welcome!", message: "Login successful" });
        return navigate("/");
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Error",
          message: error.response.data,
          color: "red",
        });
      });
  }

  return (
    <form className="loginForm" onSubmit={login}>
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
