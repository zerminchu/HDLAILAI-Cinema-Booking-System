import { useEffect, useState } from "react";
import { TextInput, PasswordInput, Button, Select } from "@mantine/core";
import axios from "axios";
import "./LoginStyle.css";
import { useAuth } from "../../AuthContext";
import * as jose from "jose";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function LoginForm() {
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfileId, setUserProfileId] = useState(-1);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userProfileIdError, setUserProfileIdError] = useState("");
  const [profileOptions, setProfileOptions] = useState([]);

  const navigate = useNavigate();

  function validateForm() {
    const fields = [
      { value: email, errorSetter: setEmailError, fieldName: "Email" },
      { value: password, errorSetter: setPasswordError, fieldName: "Password" },
    ];

    let isValid = true;

    fields.forEach(({ value, errorSetter, fieldName }) => {
      const trimmedValue = String(value).trim();

      if (trimmedValue === "") {
        errorSetter(`${fieldName} is empty`);
        isValid = false;
      } else {
        errorSetter("");
      }
    });

    if (userProfileId === -1) {
      setUserProfileIdError("Profile not selected");
      isValid = false;
    } else {
      setUserProfileIdError("");
    }

    return isValid;
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewuserprofile/all")
      .then(({ data }) => {
        if (data) {
          const options = data
            .filter((profileName) => !profileName.suspended)
            .map((profile) => ({
              value: profile.id,
              label: profile.profileName,
            }));
          setProfileOptions(options);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function login(event) {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:8080/login", {
          profile: { id: userProfileId },
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          const token = response.data;
          const decodedToken = jose.decodeJwt(token);
          localStorage.setItem("jwt", token);
          setCurrentUser(decodedToken);
          localStorage.setItem("user", JSON.stringify(decodedToken));
          notifications.show({
            title: "Welcome!",
            message: "Login successful",
          });
          navigate("/");
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
          error={userProfileIdError}
          withAsterisk
        />

        <TextInput
          className="emailField"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={emailError}
          withAsterisk
        />

        <PasswordInput
          className="passwordField"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          error={passwordError}
          withAsterisk
        />
        <Button className="loginBtn" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
