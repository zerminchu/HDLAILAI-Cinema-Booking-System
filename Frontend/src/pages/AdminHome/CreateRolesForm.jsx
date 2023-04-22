import { createStyles, rem, Group, Box } from "@mantine/core";
import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import { toast } from "react-toastify";

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
  //const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const rolesData = [
    { label: "Customer", value: "Customer" },
    { label: "Cinema Manager", value: "Cinema Manager" },
    { label: "Cinema Owner", value: "Cinema Owner" },
    { label: "User Admin", value: "User Admin" },
  ];

  const handleAddClick = () => {
    /* if (!profileName || !selectedRole) {
      toast.error("Please fill out all fields");
      return;
    } */
    try {
      const newProfile = { name: profileName, role: selectedRole };
      setProfiles([...profiles, newProfile]);
      // Resets the form fields
      setProfileName("");
      setSelectedRole("");
      onAddUser(profileName, selectedRole); // Pass profileName and selectedRole to onAddUser prop
    } catch (error) {
      console.log("hi");
      console.log(error);
    }
  };

  const handleRoleSelect = (value) => {
    setSelectedRole(value);
  };

  return (
    <div>
      <TextInput
        label="Profile Name"
        placeholder="Experience Manager"
        classNames={classes.input}
        value={profileName}
        onChange={(event) => setProfileName(event.target.value)}
      />

      <Select
        mt="md"
        withinPortal
        data={rolesData}
        placeholder="Roles"
        label="Select Permission"
        className={classes.value}
        value={selectedRole}
        onChange={handleRoleSelect}
      />

      <Group position="right" mt="md">
        <Button className={classes.button} onClick={handleAddClick}>
          Add
        </Button>
      </Group>
    </div>
  );
}

export default CreateRolesForm;
