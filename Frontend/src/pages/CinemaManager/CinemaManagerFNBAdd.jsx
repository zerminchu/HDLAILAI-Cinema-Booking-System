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
  //const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [type, setType] = useState("");

  const handleCancel = () => {
    setName("");
    setCurrentPrice("");
    setImageURL("");
    setType("");
  };

  const handleAddClick = () => {
    const newItem = {
      name: name,
      currentPrice: currentPrice,
      imageURL: imageURL,
      type: type,
    };

    axios
      .post("http://localhost:8080/createfnb/add", newItem)
      .then((response) => {
        console.log(response.data);

        notifications.show({
          title: `F&B Item`,
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
  };

  return (
    <div>
      <TextInput
        label="Item Name"
        placeholder="Popcorn (S)"
        classNames={classes.input}
        onChange={(event) => {
          const value = event.target.value;
          console.log(value);
          setName(value);
        }}
      />

      <NumberInput
        label="Price"
        placeholder="Enter number only"
        classNames={classes.input}
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
          setCurrentPrice(value * 100);
        }}
      />

      <TextInput
        label="ImageURL"
        placeholder="Provide the full link"
        classNames={classes.input}
        onChange={(event) => {
          const value = event.target.value;
          console.log(value);
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
        onSelect={(event) => {
          const value = event.target.value;
          console.log(value);
          setType(value);
        }}
      />

      <Group position="right" mt="md">
        <Button
          className={classes.button}
          component={Link}
          to={`/CinemaManagerFNB/`}
          onClick={handleAddClick}
        >
          Add
        </Button>
        <Button
          className={classes.button}
          component={Link}
          to={`/CinemaManagerFNB/`}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Group>
    </div>
  );
};

export default CinemaManagerFNBAdd;
