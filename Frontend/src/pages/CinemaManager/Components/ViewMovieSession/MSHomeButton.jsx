import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function MSHomeButton({ id, data }) {
  return (
    <Button
      variant="outline"
      component={Link}
      to={`/EditMovieSession/${id}`}
      // Store the data in the location's state
      state={data}
    >
      Edit
    </Button>
  );
}

export default MSHomeButton;
