// import { useEffect, useState } from "react";
import { TextInput, NumberInput, Button, Container, Grid, Textarea } from "@mantine/core";
// import axios from "axios";
import "./ViewHallStyle.css";
import { MdChair } from "react-icons/md";

function CreateMovie() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userProfileId, setUserProfileId] = useState(-1);
  // const [profileOptions, setProfileOptions] = useState([]);
  
  // // Load user profiles
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/createuserprofile/all")
  //     .then(({ data }) => {
  //       if (data) {
  //         const options = data.map((profile) => {
  //           return { value: profile.id, label: profile.profileName };
  //         });
  //         setProfileOptions([...options]);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // function handleSubmit(event) {
  //   // Prevent submit from refreshing the page
  //   event.preventDefault();
  //   console.log(userProfileId);
  //   // handle submit here
  //   axios
  //     .post("http://localhost:8080/login", {
  //       userProfile: { id: userProfileId },
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       alert(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.response.data);
  //     });
  // }

  return (
    <form className="CreateMovieForm">
      <div>
        <Container my="md">
          <Grid>
            <Grid.Col xs={6}>
              <TextInput
              className="movieNameField"
              label="Movie Name"
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <NumberInput
              className="runtimeField"
              label="Runtime"
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <TextInput
              className="genreField"
              label="Genre"
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <Textarea
              placeholder="Movie synopsis here"
              label="Synopsis"
              />
            </Grid.Col>
            <Grid.Col xs={4}></Grid.Col>
            <Grid.Col xs={4}>
              <Button className="createMovieButton" color="blue">Create</Button>
            </Grid.Col>
            <Grid.Col xs={4}></Grid.Col>
          </Grid>
        </Container>
      </div>
    </form>
  );
}

export default CreateMovie;
