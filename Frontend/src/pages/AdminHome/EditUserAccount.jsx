import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { TextInput, Select, Button, Group, Box } from "@mantine/core";

function EditUserAccount({ data, setData }) {
  console.log(data);
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
  function handleSubmit(id) {
    console.log(userProfile);
    axios
      .put("http://localhost:8080/updateuseraccount/update/${id}", {
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
      });

      axios
      .get("http://localhost:8080/updateuseraccount/all")
      .then(() => {
        setData (
          data.map ( (user) =>
            user.id === id ? { ...user,  
              name: name,
              password: password,
              email: email,
              userProfile: {
                id: userProfile,
              } 
            } : user
          )
        );
      })  
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>UserAdmin Update Account</h1>
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

export default EditUserAccount;
