import { useEffect, useState } from "react";
import { TextInput, PasswordInput, Button, SimpleGrid } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

function CreateAccountForm() {
  // const [name, setHallName] = useState("");
  // const [error, setError] = useState("");

  // const form = useForm({
  //   initialValues: {
  //     name: "",
  //   },

  //   validate: {
  //     name: (value) => {
  //       if (value.length === 0) return "Hall name is empty.";
  //       if (/^\s*$|^\s+.*|.*\s+$/.test(value))
  //         return "Hall name contains trailing/leading whitespaces";
  //       return null;
  //     },
  //   },
  // });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/viewhall/all")
  //     .then(({ data }) => {
  //       if (data && data.length > 0) {
  //         setHallName();
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // function handleSubmit() {
  //   const createHall = {
  //     name: form.values.name,
  //   };

  //   axios
  //     .post("http://localhost:8080/createhall/add", createHall)
  //     .then(() => {
  //       notifications.show({
  //         title: `Hall`,
  //         message: "Hall created successfully",
  //         autoClose: 3000,
  //       });

  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 500); 
  //     })
  //     .catch((error) => {
  //       notifications.show({
  //         title: "Error creating Hall",
  //         message: error.response.data,
  //         autoClose: 3000,
  //       });
  //       form.reset();
  //     });
  // }

  return (
    // <form onSubmit={form.onSubmit(handleSubmit)}>
    <form>
      <SimpleGrid cols={1} spacing="md">
        <div>
          <TextInput
            placeholder="First Name"
            label="First Name:"
            withAsterisk
          />
        </div>

        <div>
          <TextInput
            placeholder="Last Name"
            label="Last Name:"
            withAsterisk
          />
        </div>

        <div>
          <TextInput
            placeholder="Email Address"
            label="Email Address:"
            withAsterisk
          />
        </div>

        <div>
          <PasswordInput
            placeholder="Password"
            label="Password:"
            description="Make sure to create a strong password!"
            withAsterisk
          />
        </div>

        <div className="createAccSubmitBtn">
          <Button type="submit">Submit</Button>
        </div>
      </SimpleGrid>
    </form>
  );
}

export default CreateAccountForm;
