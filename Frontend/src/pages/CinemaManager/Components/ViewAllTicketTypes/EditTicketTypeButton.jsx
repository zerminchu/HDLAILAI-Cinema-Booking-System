import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export function EditTicketTypeButton({ id, data }) {
  return (
    <Button
      component={Link}
      to={`../UpdateTicketType/${id}`}
      // Store the data in the location's state
      state={data}
    >
      Edit
    </Button>
  );
}

export default EditTicketTypeButton;
