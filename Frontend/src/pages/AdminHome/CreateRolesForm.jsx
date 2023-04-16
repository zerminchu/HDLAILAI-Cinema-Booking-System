import { createStyles, rem } from "@mantine/core";
import { useState } from "react";
import { TextInput, Select, Button } from "@mantine/core";
import DisplayRoles from "./DisplayRoles";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },

  button: {
    marginTop: theme.spacing.md,
  },
}));

function CreateRolesForm(props) {
  const classes = useStyles();
  //const [user, setUser] = useState({});
  const [profiles, setProfiles] = useState([]);

  const [profileName, setProfileName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const rolesData = [
    { label: "Customer", value: "customer" },
    { label: "Cinema Manager", value: "cinema_manager" },
    { label: "Cinema Owner", value: "cinema_owner" },
    { label: "User Admin", value: "user_admin" },
  ];

  const handleAddClick = () => {
    const newProfile = { name: profileName, role: selectedRole };
    setProfiles([...profiles, newProfile]);
    setProfileName("");
    setSelectedRole("");
    props.onAddUser(profileName, selectedRole); // Pass profileName and selectedRole to onAddUser prop
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

      <Button className={classes.button} onClick={handleAddClick}>
        Add
      </Button>
      <DisplayRoles data={props.data} />
    </div>
  );
}

export default CreateRolesForm;
