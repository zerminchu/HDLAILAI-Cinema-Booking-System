import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  SimpleGrid,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

function ViewAccount() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const [accIsUpdating, setAccIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleAccUpdate() {
    const updatedAcc = {
      id: id,
      name: form.values.name,
      email: form.values.email,
      password: form.values.password,
    };

    axios
      .put(
        `http://localhost:8080/updateuseraccount/updatecustomer/${id}`,
        updatedAcc
      )
      .then(() => {
        setAccIsUpdating(!accIsUpdating);
        notifications.show({
          title: "Account updated",
          message: "Account data saved successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          title: "Error updating account",
          autoClose: 3000,
        });
      });
  }

  async function getAccountAndInfo(id) {
    try {
      const userAccountResponse = await axios.get(
        `http://localhost:8080/viewuseraccount/${id}`
      );
      const loadedUserAccount = userAccountResponse.data;
      setName(loadedUserAccount.name);
      setEmail(loadedUserAccount.email);
      setPassword(loadedUserAccount.password);

      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm({
    initialValues: {
      name: name,
      email: email,
      password: password,
    },

    validate: {
      name: (value) => {
        if (value.length === 0) return "Field is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Field contains trailing/leading whitespaces";
        return null;
      },
      email: (value) => {
        if (value.length === 0) return "Field is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Field contains trailing/leading whitespaces";
        return null;
      },
      password: (value) => {
        if (value.length === 0) return "Field is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Field contains trailing/leading whitespaces";
        return null;
      },
    },
  });

  useEffect(() => {
    getAccountAndInfo(id);
  }, []);

  useEffect(() => {
    form.setValues({
      name: name,
      email: email,
      password: password,
    });
  }, [name, email, password]);

  return (
    <div>
      <Container my="md">
        <SimpleGrid cols={1}>
          <div>
            <TextInput
              type="text"
              className="firstNameField"
              label="Name"
              {...form.getInputProps("name")}
              disabled={!accIsUpdating}
            />
          </div>

          <div>
            <TextInput
              type="text"
              className="emailField"
              label="Email"
              {...form.getInputProps("email")}
              disabled={!accIsUpdating}
            />
          </div>

          <div>
            <PasswordInput
              type="text"
              className="passwordField"
              label="Password"
              {...form.getInputProps("password")}
              disabled={!accIsUpdating}
            />
          </div>

          <div>
            {accIsUpdating ? (
              <form onSubmit={form.onSubmit(handleAccUpdate)}>
                <Button className="submitBtn" type="submit">
                  Submit
                </Button>
              </form>
            ) : (
              <Button
                className="updateBtn"
                onClick={() => setAccIsUpdating(!accIsUpdating)}
              >
                Update
              </Button>
            )}
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default ViewAccount;
