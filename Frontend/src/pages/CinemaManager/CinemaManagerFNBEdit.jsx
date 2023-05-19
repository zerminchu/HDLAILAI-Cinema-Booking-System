import { createStyles, rem, Group, NumberInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { TextInput, Button, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
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
  const navigate = useNavigate();

  const [name, setName] = useState(data.name);
  const [currentPrice, setCurrentPrice] = useState(data.currentPrice);
  const [imageURL, setImageURL] = useState(data.imageURL);
  const [type, setType] = useState(data.type);

  const form = useForm({
    initialValues: {
      name: name,
      currentPrice: currentPrice / 100,
      imageURL: imageURL,
      type: type,
    },

    validate: {
      name: (value) => {
        if (value.length === 0) return "Item name is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Item name contains trailing/leading whitespaces";
        return null;
      },
      currentPrice: (value) => {
        if (value.length === 0) return "Item price is empty.";
        if (value <= 0) return "Item price must be greater than 0.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Item price contains trailing/leading whitespaces";
        return null;
      },
      imageURL: (value) => {
        if (value.length === 0) return "Item imageURL is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Item imageURL contains trailing/leading whitespaces";
        return null;
      },
      type: (value) => {
        if (value.length === 0) return "Item type is empty.";
        return null;
      },
    },
  });

    const handleSubmit = (values) => {
    console.log(values);

    const updatedItem = {id: id, 
      name: values.name, 
      currentPrice: values.currentPrice * 100, 
      imageURL: values.imageURL, 
      type: values.type};
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

        navigate(`/CinemaManagerFNB/`);
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
  <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Item Name"
        classNames={classes.input}
        {...form.getInputProps('name')}
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
            ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            : "$ "
        } 
        {...form.getInputProps('currentPrice')}
      />
      <TextInput
        label="ImageURL"
        classNames={classes.input}
        {...form.getInputProps('imageURL')}
      />

      <Select
        label="Item Type"
        data={["Food", "Beverage"]}
        {...form.getInputProps('type')}
      />

      <Group position="right" mt="md">
        <Button
          type="submit"
          className={classes.button}
        >
          Confirm
        </Button>
        <Button
          className={classes.button}
          component={Link}
          to={`/CinemaManagerFNB/`}
        >
          Cancel
        </Button>
      </Group>
  </form>
  );
};

export default CinemaManagerFNBEdit;