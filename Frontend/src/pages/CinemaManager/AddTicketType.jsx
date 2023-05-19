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

function AddTicketType() {
  const [typeName, setTypeName] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/createtickettype/add", {
        typeName: typeName,
        price: price * 100,
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
        let errorMessage = `${error.response.data}`;

        setError(errorMessage);
        notifications.show({
          title: `Error creating Ticket Type`,
          message: errorMessage,
          autoClose: 1500,
          color: "red",
        });
      });
  }

  return (
    <form className="createTicketTypeForm" onSubmit={handleSubmit}>
      <h1>Add New Ticket Type</h1>
      <div>
        <Container my="md">
          <SimpleGrid col={1}>
            <div>
              <TextInput
                className="ticketTypeField"
                placeholder="Name of the ticket type"
                label="Ticket Type"
                value={typeName}
                onChange={(event) => setTypeName(event.target.value)}
              />
            </div>
            <div>
              <NumberInput
                className="priceField"
                placeholder="Enter number only"
                label="Price"
                min={0}
                value={price}
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
                onChange={setPrice}
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
