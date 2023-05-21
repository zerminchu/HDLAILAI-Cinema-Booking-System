import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createStyles,
  rem,
  TextInput,
  Select,
  Button,
  Group,
  Box,
} from "@mantine/core";
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
      password: "",
      profileId: "",
    },

    validate: {
      name: (value) => {
        if (value.length === 0) return "name is empty.";
        if (value !== value.trim())
          return "Name contains trailing/leading whitespaces";

        return null;
      },
      email: (value) => {
        if (value.length === 0) return "Email is empty.";
        if (value !== value.trim())
          return "Email contains trailing/leading whitespaces";

        return null;
      },
      
      profileId: (value) => {
        if (value.length === 0) return "Profile is empty.";

        return null;
      },
    },
  });

  function handleSubmit(values, event) {
    event.preventDefault();
    console.log(values);
    try {
      const { name, email, password, profileId } = values;
      onAddAccount(name, email, password, profileId);
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
          {...form.getInputProps("profileId")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </Box>
    </form>
  );
}

export default CreateAccountForm;
