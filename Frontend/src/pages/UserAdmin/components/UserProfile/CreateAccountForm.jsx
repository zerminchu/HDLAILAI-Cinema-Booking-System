import { useEffect, useState } from "react";
import { createStyles, rem,TextInput, Select, Button, Group, Box } from "@mantine/core";
import axios from "axios";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
    root: {
      position: "relative",
    },
  
    input: {
      height: rem(54),
      paddingTop: rem(18),
    },
  
    button: {
      marginTop: theme.spacing.md,
    },
  }));

function CreateAccountForm({ onAddAccount }) {
  const classes = useStyles();
  const [userProfile, setUserProfile] = useState("");
  const [profileOptions, setProfileOptions] = useState([
    { value: "", label: "" },
  ]);

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

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password:"",
      userProfile:"",
    },

    validate: {
      name: (value) => {
        if (value.length === 0) return "name is empty.";
        return null;
      },
      email: (value) => {
        if (value.length === 0) return "Email is empty.";
        return null;
      },
      password: (value) => {
        if (value.length === 0) return "Password is empty.";
        return null;
      },
      userProfile: (value) => {
        if (value.length === 0) return "Profile is empty.";
        return null;
      },
    },
  });

  function handleSubmit(values) {
    try {
      const { name, email,password,userProfile } = values;
      onAddAccount(name, email,password,userProfile); 
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Box maw={300} mx="auto">
          <TextInput
            label="Name"
            placeholder="Name"
            classNames={classes.input}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Email"
            placeholder="Email@gmail.com"
            classNames={classes.input}
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Password"
            placeholder="Password"
            classNames={classes.input}
            {...form.getInputProps("password")}
          />

        <Select
            label="User Profile"
            placeholder={userProfile}
            data={profileOptions}
            value={userProfile}
            onChange={setUserProfile}
            withAsterisk
            {...form.getInputProps("userProfile")}
          />
          
          <Group position="right" mt="md">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
      </Box>
    </form>
  );
}

export default CreateAccountForm;
