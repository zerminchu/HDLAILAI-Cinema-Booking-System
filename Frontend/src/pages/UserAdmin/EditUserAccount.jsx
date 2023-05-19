import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { TextInput, Select, Button, Group, Box } from "@mantine/core";
import { useLocation, useParams } from "react-router-dom";

function EditUserAccount() {
  // Take the user account object passed in from the link
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;
  // Use the data from the link to set up the states in this page
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  console.log(data.userProfile);
  const [profileId, setProfileId] = useState(`${data.profile.id}`);
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/viewuserprofile/all`)
      .then(({ data }) => {
        if (data) {
          const options = data.map((profile) => {
            // Convert value and label to string to avoid bugs when using value inside mantine Select
            // Refer to https://mantine.dev/core/select/#controlled
            return { value: `${profile.id}`, label: `${profile.profileName}` };
          });
          setProfileOptions([...options]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // Not yet make changes
  function handleSubmit() {
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
          message: "Profile updated successfully",
          autoClose: 3000,
        });
      });
  }

  return (
    <div>
      <h1>User Admin Update Account</h1>
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
            placeholder={"Select a profile"}
            data={profileOptions}
            value={profileId}
            onChange={setProfileId}
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

export default EditUserAccount;
