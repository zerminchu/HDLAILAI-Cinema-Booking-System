import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function UPEditButton({ id, data }) {
  return (
    <Button
      variant="outline"
      component={Link}
      to={`/EditUserProfile/${id}`}
      // Store the data in the location's state
      state={data}
    >
      Edit
    </Button>
  );
}

export default UPEditButton;
