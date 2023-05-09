import { createStyles, rem, Group, NumberInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { TextInput, Button, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

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

const CinemaManagerFNBEdit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const [name, setName] = useState(data.name);
  const [currentPrice, setCurrentPrice] = useState(data.currentPrice);
  const [imageURL, setImageURL] = useState(data.imageURL);
  const [type, setType] = useState(data.type);
  const [realPrice, setRealPrice] = useState(data.currentPrice / 100);

  const handleCancel = () => {
    setName("");
    setCurrentPrice("");
    setImageURL("");
    setType("");
  };

  const handleEditClick = () => {
    console.log(realPrice);
    console.log(currentPrice);

    const updatedItem = {
      id: id,
      name: name,
      currentPrice: currentPrice,
      imageURL: imageURL,
      type: type,
    };
    console.log(updatedItem);

    axios
      .put(`http://localhost:8080/updatefnb/update/${id}`, updatedItem)
      .then((response) => {
        console.log(response.data);

        notifications.show({
          title: `F&B Item`,
          message: "Item Updated successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error Updating New F&B Item",
          message: error.response.data,
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <TextInput
        label="Item Name"
        classNames={classes.input}
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
        min={0}
        precision={2}
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value))
            ? `$ ${value / 100}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            : "$ "
        }
        value={currentPrice}
        onChange={(value) => {
          setCurrentPrice(value * 100);
        }}
      />
      <TextInput
        label="ImageURL"
        classNames={classes.input}
        value={imageURL}
        onChange={(event) => {
          const value = event.target.value;
          console.log(value);
          setImageURL(value);
        }}
      />

      <Select
        label="Item Type"
        defaultValue={type}
        data={["Food", "Beverage"]}
        onSelect={(event) => {
          setType(event.target.value);
        }}
      />

      <Group position="right" mt="md">
        <Button
          className={classes.button}
          component={Link}
          to={`/CinemaManagerFNB/`}
          onClick={handleEditClick}
        >
          Confirm
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

export default CinemaManagerFNBEdit;
