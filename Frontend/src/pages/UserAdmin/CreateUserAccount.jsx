import { useEffect, useState } from "react";
import axios from "axios";
import { TextInput, Select, Button, Group, Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

function CreateUserAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewuserprofile/all")
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
    event.preventDefault();
    console.log(userProfile);
    axios
      .post("http://localhost:8080/createuseraccount/add", {
        name: name,
        password: password,
        email: email,
        profile: {
          id: profile,
        },
      })
      .then(() => {
        notifications.show({
          title: `User Account`,
          message: "Account created successfully",
          autoClose: 3000,
        });
        navigateTo("/UserAdminHome");
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = `${error.response.data}`;
        if (errorMessage === "Name cannot be empty") {
          errorMessage = "Please fill in all the fields";
        }
        setError(errorMessage);
        notifications.show({
          title: `Error creating User Account`,
          message: errorMessage,
          autoClose: 1500,
          color: "red",
        });
      });
  }
  function handleReturn(event) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>User Admin Create Account</h1>
      <Box maw={300} mx="auto">
        <form>
          <TextInput
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            withAsterisk
          />

          <TextInput
            label="Email"
            placeholder="Email@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            withAsterisk
          />

          <TextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            withAsterisk
          />

          <Select
            label="User Profile"
            placeholder={userProfile}
            data={profileOptions}
            value={userProfile}
            onChange={setUserProfile}
            withAsterisk
          />
          <Group position="right" mt="md">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default CreateUserAccount;
