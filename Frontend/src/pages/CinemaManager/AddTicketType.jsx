import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  SimpleGrid,
  Textarea,
} from "@mantine/core";
import axios from "axios";
import "../CinemaManager/Components/ViewMovie/MovieStyle.css";
import { useForm } from "@mantine/form";

function AddTicketType() {
  const [typeName, setTypeName] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [typeNameError, setTypeNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    let isValid = true;

    const fields = [
      { value: typeName, errorSetter: setTypeNameError, fieldName: "Type" },
    ];

    fields.forEach(({ value, errorSetter, fieldName }) => {
      const trimmedValue = value.trim();

      if (trimmedValue === "") {
        errorSetter(`${fieldName} is empty`);
        isValid = false;
      } else if (value !== trimmedValue) {
        errorSetter(`${fieldName} contains trailing/leading whitespace`);
        isValid = false;
      } else {
        errorSetter("");
      }
    });

    if (price < 1) {
      setPriceError("Price must be greater than 0");
      isValid = false;
    } else {
      setPriceError("");
    }

    return isValid;
  }

  const form = useForm({
    initialValues: {
      typeName: "",
      price: 0,
    },

    validate: {
      typeName: (value) => {
        if (value.length === 0) return "Ticket type name is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Ticket type name contains trailing/leading whitespaces";
        return null;
      },
      price: (value) => {
        if (value.length === 0) return "Ticket type price is empty.";
        if (value <= 0) return "Ticket type price is invalid.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Ticket type price contains trailing/leading whitespaces";
      },
    },
  });

  function handleSubmit(values) {
    //event.preventDefault();
    axios
      .post("http://localhost:8080/createtickettype/add", {
        typeName: values.typeName,
        price: values.price * 100,
      })
      .then(() => {
        notifications.show({
          typeName: `Ticket Type`,
          message: "Ticket Type created successfully",
          autoClose: 3000,
        });
        navigateTo("/ViewAllTicketTypes");
      })
      .catch((error) => {
        console.log(error);
        //errorMessage = Name cannot be empty/Password cannot be empty/Email cannot be empty/User Profile cannot be empty
        let errorMessage = `${error.response.data}`;

          setError(errorMessage);
          notifications.show({
            title: `Error creating Ticket Type`,
            message: errorMessage,
            autoClose: 1500,
            color: "red",
          });
        });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/ViewAllTicketTypes");
    }

  return (
    <form className="createTicketTypeForm" onSubmit={form.onSubmit(handleSubmit)}>
      <h1>Add New Ticket Type</h1>
      <div>
        <Container my="md">
          <SimpleGrid col={1}>
            <div>
              <TextInput
                className="ticketTypeField"
                placeholder="Name of the ticket type"
                label="Ticket Type"
                {...form.getInputProps("typeName")}
              />
            </div>
            <div>
              <NumberInput
                className="priceField"
                placeholder="Price of the ticket type"
                label="Price"
                min={0}
                {...form.getInputProps("price")}
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
              />
            </div>

            <div>
              <Button
                type="submit"
                className="updateTicketTypeButton"
                color="blue"
              >
                Add
              </Button>
            </div>
          </SimpleGrid>
        </Container>
      </div>
    </form>
  );
}

export default AddTicketType;
