import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

function CustomerPurchaseButton({ id, data }) {
  return (
    <Button
      variant="outline"
      component={Link}
      to={`/FnbCart/${id}`}
      // Store the data in the location's state
      state={data}
    >
      Add
    </Button>
  );
}

export default CustomerPurchaseButton;
