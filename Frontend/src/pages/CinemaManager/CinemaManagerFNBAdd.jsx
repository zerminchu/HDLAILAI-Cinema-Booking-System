import { createStyles, rem, Group, NumberInput } from "@mantine/core";
import { useState } from "react";
import { TextInput, Button, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";

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

  const form = useForm({
    initialValues: {
      name: "",
      currentPrice: 0,
      imageURL: "",
      type: "",
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
    const newItem = {
      name: values.name,
      currentPrice: values.currentPrice * 100,
      imageURL: values.imageURL,
      type: values.type,
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

      form.reset();
  };

  return (
  <form onSubmit={form.onSubmit(handleSubmit)}>
    <div>
      <TextInput
        label="Item Name"
        placeholder="Popcorn (S)"
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
            ? `$ ${value}`.replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ","
              )
            : "$ "
        }
        {...form.getInputProps('currentPrice')}
      />

      <TextInput
        label="ImageURL"
        placeholder="Provide the full link"
        classNames={classes.input}
        {...form.getInputProps('imageURL')}
      />

      <Select
        label="Select item type"
        placeholder="Select one"
        data={[
          { value: "Food", label: "Food" },
          { value: "Beverage", label: "Beverage" },
        ]}
        {...form.getInputProps('type')}
      />

      <Group position="right" mt="md">
        <Button
          type="submit"
          className={classes.button}>
          Add
        </Button>
        <Button
          className={classes.button}
          component={Link}
          to={`/CinemaManagerFNB/`}
        >
          Cancel
        </Button>
      </Group>
    </div>
  </form>
  );
};

export default CinemaManagerFNBAdd;