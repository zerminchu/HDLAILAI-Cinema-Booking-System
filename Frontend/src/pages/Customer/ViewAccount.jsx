import { TextInput, PasswordInput, Button, Container, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

function ViewAccount() {
    const [accIsUpdating, setAccIsUpdating] = useState(false);

    const handleAccUpdate = () => {
        const updatedAcc = {
          id: id,
          firstName: form.values.firstName,
          lastName: form.values.lastName,
          email: form.values.email,
          password: form.values.password,
        };
        console.log(updatedAcc);
        axios
          .put(`http://localhost:8080/updateacc/update/${id}`, updatedAcc)
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
    };

    return (
        <div>
            <Container my="md">
                <SimpleGrid cols={1}>
                    <div>
                        <TextInput
                        type="text"
                        className="firstNameField"
                        label="First Name"
                        {...form.getInputProps("firstName")}

                        disabled={!accIsUpdating}
                        />
                    </div>

                    <div>
                        <TextInput
                        type="text"
                        className="lastNameField"
                        label="Last Name"
                        {...form.getInputProps("lastName")}

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