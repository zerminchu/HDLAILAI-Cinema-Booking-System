import { createStyles, rem, Group, Box } from "@mantine/core";
import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
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

function CreateRolesForm({ onAddUser }) {
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
