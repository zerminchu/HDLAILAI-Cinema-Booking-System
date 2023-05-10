import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

function EditUserProfile({ id, data }) {
  /* const { id } = useParams();
  const location = useLocation(); */
  //const data = location.state;
  //const navigate = useNavigate(); // Access the history object

  const form = useForm({
    initialValues: {
      profileName: data.profileName,
    },

    validate: {
      profileName: (value) => {
        if (value.length === 0) return "Profile name is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Profile name contains trailing/leading whitespaces";
        return null;
      },
    },
  });

  function handleSubmit() {
    const updateProfile = {
      id: id,
      profileName: form.values.profileName,
    };

    axios
      .put(
        `http://localhost:8080/updateuserprofile/update/${id}`,
        updateProfile
      )
      .then(() => {
        notifications.show({
          title: `User Profile`,
          message: "Profile name updated successfully",
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })

      .catch((error) => {
        notifications.show({
          title: "Error updating profile name",
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
          label="Profile Name:"
          {...form.getInputProps("profileName")}
        />
      </div>
      <div className="CMCreateHall-button-container">
        <Button type="submit">Update Profile Name</Button>
      </div>
    </form>
  );
}

export default EditUserProfile;
