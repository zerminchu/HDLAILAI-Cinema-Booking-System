import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function UAHomeButton({ id, data }) {
  return (
    <Button
      variant="outline"
      component={Link}
      to={`/EditUserAccount/${id}`}
      // Store the data in the location's state
      state={data}
    >
      Edit
    </Button>
  );
}

export default UAHomeButton;
