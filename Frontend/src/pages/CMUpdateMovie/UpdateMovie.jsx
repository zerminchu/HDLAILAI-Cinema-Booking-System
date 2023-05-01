// import { useEffect, useState } from "react";
import { TextInput, NumberInput, Button, Container, Grid, Textarea } from "@mantine/core";
// import axios from "axios";
import "F:/UOW/Y3/SEM 2/CSIT314/csit314_project/Frontend/src/pages/CMViewMovies/MovieStyle.css";

function UpdateMovie() {
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
    <form className="UpdateMovieForm">
      <h1>Update Movie</h1>
      <div>
        <Container my="md">
          <Grid>
            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
              className="movieTitleField"
              placeholder="Title of the movie"
              label="Movie Title"
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <NumberInput
              className="runtimeField"
              placeholder="Runtime in minutes"
              label="Runtime"
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
              className="genreField"
              placeholder="Genre of the movie"
              label="Genre"
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Textarea
              className="synopsisField"
              placeholder="Synopsis of the movie"
              label="Synopsis"
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={1}>
              <Button className="createMovieButton" color="blue">Update</Button>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </form>
  );
}

export default UpdateMovie;
