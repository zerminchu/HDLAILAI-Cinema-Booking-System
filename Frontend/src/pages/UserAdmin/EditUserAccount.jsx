import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { TextInput, Select, Button, Group, Box } from "@mantine/core";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function EditUserAccount() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [profileId, setProfileId] = useState(`${data.profile.id}`);
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userProfileIdError, setUserProfileIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [profileIdError, setProfileIdError] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    let isValid = true;

    const fields = [
      { value: name, errorSetter: setNameError, fieldName: "Name" },
      { value: email, errorSetter: setEmailError, fieldName: "Email" },
      { value: password, errorSetter: setPasswordError, fieldName: "Password" },
    ];

    fields.forEach(({ value, errorSetter, fieldName }) => {
      const trimmedValue = value.trim();

      if (trimmedValue === "") {
        errorSetter(`${fieldName} is empty`);
        isValid = false;
      } else if (value !== trimmedValue) {
        errorSetter(`${fieldName} contains trailing/leading whitespace`);
        isValid = false;
      } else {
        errorSetter("");
      }
    });

    if (profileId === -1) {
      setProfileIdError("Profile not selected");
      isValid = false;
    } else {
      setProfileIdError("");
    }

    return isValid;
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/viewuserprofile/all`)
      .then(({ data }) => {
        if (data) {
          const options = data.map((profile) => {
            return { value: `${profile.id}`, label: `${profile.profileName}` };
          });
          setProfileOptions([...options]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:8080/updateuseraccount/update/${id}`, {
          id: id,
          name: name,
          password: password,
          email: email,
          profile: {
            id: profileId,
          },
        })
        .then(() => {
          notifications.show({
            title: `User Account`,
            message: "Account updated successfully",
            autoClose: 3000,
          });

          navigate("/");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })

        .catch((error) => {
          notifications.show({
            title: "Error updating User Account",
            message: error.response.data,
            autoClose: 3000,
          });
          form.reset();
        });
    }
  }

  return (
    <div>
      <h1>Update User Account</h1>
      <Box maw={300} mx="auto">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={nameError}
            withAsterisk
          />

          <TextInput
            label="Email"
            placeholder="Email@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
            withAsterisk
          />

          <TextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
            withAsterisk
          />
          <Select
            label="User Profile"
            placeholder={"Select a profile"}
            data={profileOptions}
            value={profileId}
            onChange={setProfileId}
            error={profileIdError}
            withAsterisk
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default EditUserAccount;
