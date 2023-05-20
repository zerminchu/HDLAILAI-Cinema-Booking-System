import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  SimpleGrid,
} from "@mantine/core";

function UpdateTicketType() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        if (value < 1) return "Ticket type price is invalid.";
      },
    },
  });
  async function getTicketType(id) {
    try {
      const ticketTypeResponse = await axios.get(
        `http://localhost:8080/viewtickettype/${id}`
      );
      const loadedTicketType = ticketTypeResponse.data;
      form.setFieldValue("typeName", loadedTicketType.typeName);
      form.setFieldValue("price", loadedTicketType.price / 100);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTicketType(id);
  }, []);

  function handleSubmit(values, event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/updatetickettype/update/${id}`, {
        id: id,
        typeName: values.typeName,
        price: values.price * 100,
      })
      .then(() => {
        notifications.show({
          title: `Ticket Type`,
          message: "Ticket Type updated successfully",
          autoClose: 3000,
        });
        navigate("/ViewAllTicketTypes");
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = `${error.response.data}`;
        notifications.show({
          title: `Error updating Ticket Type`,
          message: errorMessage,
          autoClose: 1500,
          color: "red",
        });
      });
  }

  return (
    <form
      className="UpdateTicketTypeForm"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <h1>Update Ticket Type</h1>
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
                placeholder="Enter number only"
                label="Price"
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
                {...form.getInputProps("price")}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="updateTicketTypeButton"
                color="blue"
              >
                Update
              </Button>
            </div>
          </SimpleGrid>
        </Container>
      </div>
    </form>
  );
}

export default UpdateTicketType;
