import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import "./CMCreateHall.css";
import { useForm } from "@mantine/form";

function CMCreateHall() {
  const [name, setHallName] = useState("");
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => {
        if (value.length === 0) return "Hall name is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Hall name contains trailing/leading whitespaces";
        return null;
      },
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewhall/all")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHallName();
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleSubmit() {
    const createHall = {
      name: form.values.name,
    };

    axios
      .post("http://localhost:8080/createhall/add", createHall)
      .then(() => {
        notifications.show({
          title: `Hall`,
          message: "Hall created successfully",
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      })
      .catch((error) => {
        notifications.show({
          title: "Error creating Hall",
          message: error.response.data,
          autoClose: 3000,
        });
        form.reset();
      });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div>
        <TextInput
          placeholder="Hall 1"
          label="Hall Name:"
          value={form.values.name}
          onChange={(e) => setHallName(e.target.value)}
          {...form.getInputProps("name")}
        />
      </div>
      <div className="CMCreateHall-button-container">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default CMCreateHall;
