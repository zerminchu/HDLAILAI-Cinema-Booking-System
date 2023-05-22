import { createStyles, rem, Group, Box } from "@mantine/core";
import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
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

function CreateRolesForm() {
  const classes = useStyles();
  const rolesData = [
    { label: "Customer", value: "Customer" },
    { label: "Cinema Manager", value: "Cinema Manager" },
    { label: "Cinema Owner", value: "Cinema Owner" },
    { label: "User Admin", value: "User Admin" },
  ];
  const form = useForm({
    initialValues: {
      profileName: "",
      selectedRole: "",
    },

    validate: {
      profileName: (value) => {
        if (value.length === 0) return "Profile name is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Profile name contains trailing/leading whitespaces";
        return null;
      },
      selectedRole: (value) => {
        if (rolesData.find((role) => role.value === value) === undefined)
          return "Invalid Permissions selected.";
        return null;
      },
    },
  });

  function onAddUser(profileName, selectedRole) {
    console.log(profileName, selectedRole); // Check that profileName and selectedRole are received correctly

    // Make sure key of javascript dictionary matches the java object in the backend
    axios
      .post("http://localhost:8080/createuserprofile/add", {
        profileName: profileName, // Means profileName: profileName
        permission: selectedRole,
      })
      .then((response) => {
        console.log(response.data); // Check that the new profile is received correctly

        notifications.show({
          title: `User Profile`,
          message: "Profile created successfully",
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        notifications.show({
          title: "Error creating User Profile",
          message: error.response.data,
          autoClose: 3000,
        });
      });
  }

  function handleSubmit(values) {
    try {
      const { profileName, selectedRole } = values;
      onAddUser(profileName, selectedRole); // Pass profileName and selectedRole to onAddUser prop
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Profile Name"
        placeholder="Experience Manager"
        classNames={classes.input}
        {...form.getInputProps("profileName")}
      />

      <Select
        mt="md"
        withinPortal
        data={rolesData}
        placeholder="Roles"
        label="Select Permission"
        className={classes.value}
        {...form.getInputProps("selectedRole")}
      />

      <Group position="right" mt="md">
        <Button className={classes.button} type="submit">
          Add
        </Button>
      </Group>
    </form>
  );
}

export default CreateRolesForm;
