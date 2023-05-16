/* import React from "react";
import { Button } from "@mantine/core";

function CustomerPurchaseButton({ id, data, handleAdd }) {
  const handleClick = () => {
    handleAdd(id, data);
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Add
    </Button>
  );
}

export default CustomerPurchaseButton;
 */

// CustomerPurchaseButton.jsx
import React from "react";
import { Button } from "@mantine/core";

function CustomerPurchaseButton({ id, data, handleAdd, disabled }) {
  return (
    <Button
      onClick={() => handleAdd(id, data)}
      disabled={disabled} // Pass the disabled state to the button
    >
      Add
    </Button>
  );
}

export default CustomerPurchaseButton;
