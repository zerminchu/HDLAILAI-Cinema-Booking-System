import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { TextInput, Select, Button, Group, Box } from "@mantine/core";
function CreateUserAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);

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
