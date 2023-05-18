import { createStyles, rem, Group, NumberInput } from "@mantine/core";
import { useState } from "react";
import { TextInput, Button, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { Link } from "react-router-dom";

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

const CinemaManagerFNBAdd = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [type, setType] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [urlError, setURLError] = useState("");
  const [typeError, setTypeError] = useState("");

  const handleCancel = () => {
    setName("");
    setCurrentPrice("");
    setImageURL("");
    setType("");
    clearErrors();
  };

  const clearErrors = () => {
    setNameError("");
    setPriceError("");
    setURLError("");
    setTypeError("");
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;

    if (name.trim() === "") {
      setNameError("Item Name cannot be empty");
      isValid = false;
    } else if (name !== name.trim()) {
      setNameError("Item Name contains trailing/leading whitespace");
      isValid = false;
    }

    if (currentPrice === "" || parseFloat(currentPrice) === 0) {
      setPriceError("Price cannot be zero");
      isValid = false;
    }

    if (imageURL.trim() === "") {
      setURLError("Image URL cannot be empty");
      isValid = false;
    } else if (imageURL !== imageURL.trim()) {
      setURLError("Image URL contains trailing/leading whitespace");
      isValid = false;
    }

    if (type.trim() === "") {
      setTypeError("Please select an item type");
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const newItem = {
        name: name,
        currentPrice: parseFloat(currentPrice),
        imageURL: imageURL,
        type: type,
      };

      axios
        .post("http://localhost:8080/createfnb/add", newItem)
        .then((response) => {
          console.log(response.data);

          notifications.show({
            title: "F&B Item",
            message: "Item Added successfully",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          notifications.show({
            title: "Error Adding New F&B Item",
            message: error.response.data,
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextInput
        label="Item Name"
        placeholder="Popcorn (S)"
        classNames={classes.input}
        error={nameError}
        value={name}
        onChange={(event) => {
          const value = event.target.value;
          setName(value);
        }}
      />

      <NumberInput
        label="Price"
        placeholder="Enter number only"
        classNames={classes.input}
        error={priceError}
        min={0}
        precision={2}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value))
            ? `$ ${(value / 100).toFixed(2)}`.replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ","
              )
            : "$ "
        }
        value={currentPrice}
        onChange={(value) => {
          setCurrentPrice(value);
        }}
      />

      <TextInput
        label="Image URL"
        placeholder="Provide the full link"
        classNames={classes.input}
        error={urlError}
        value={imageURL}
        onChange={(event) => {
          const value = event.target.value;
          setImageURL(value);
        }}
      />

      <Select
        label="Select item type"
        placeholder="Select one"
        data={[
          { value: "food", label: "Food" },
          { value: "beverage", label: "Beverage" },
        ]}
        error={typeError}
        value={type}
        onChange={(event) => {
          const value = event.target.value;
          setType(value);
        }}
      />

      <Group position="right" mt="md">
        <Button
          className={classes.button}
          component={Link}
          to="/CinemaManagerFNB/"
          type="submit"
        >
          Add
        </Button>
        <Button
          className={classes.button}
          component={Link}
          to="/CinemaManagerFNB/"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Group>
    </form>
  );
};

export default CinemaManagerFNBAdd;
