import { useEffect, useState } from "react";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Grid,
  Textarea,
} from "@mantine/core";
// import axios from "axios";
import "../CinemaManager/Components/ViewMovie/MovieStyle.css";
function AddMovie() {
  const [title, setTitle] = useState("");
  const [runtime, setRuntime] = useState(0);
  const [genre, setGenre] = useState("");
  const [sypnosis, setSypnosis] = useState("");
  const [imageURL, setImageURL] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
    axios
      .post("http://localhost:8080/createmovie/add", {
        title: title,
        runtime: runtime,
        genre: genre,
        sypnosis: sypnosis,
      })
      .then(() => {
        notifications.show({
          title: `Movie`,
          message: "Movie created successfully",
          autoClose: 3000,
        });
        navigateTo('/ViewMovies');
      })
      .catch((error) => {
        console.log(error);
        //errorMessage = Name cannot be empty/Password cannot be empty/Email cannot be empty/User Profile cannot be empty
        let errorMessage = `${error.response.data}`;

        setError(errorMessage);
        notifications.show({
          title: `Error creating Movie`,
          message: errorMessage,
          autoClose: 1500,
          color: "red",
        });
      });
  }

  return (
    <form className="CreateMovieForm">
      <h1>Add New Movie</h1>
      <div>
        <Container my="md">
          <Grid>
            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
                className="movieTitleField"
                placeholder="Title of the movie"
                label="Movie Title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <NumberInput
                className="runtimeField"
                placeholder="Runtime in minutes"
                label="Runtime"
                min = {0}
                onChange={setRuntime}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
                className="genreField"
                placeholder="Genre of the movie"
                label="Genre"
                onChange={(event) => setGenre(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Textarea
                className="synopsisField"
                placeholder="Synopsis of the movie"
                label="Synopsis"
                onChange={(event) => setSypnosis(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={1}>
              <Button className="createMovieButton" onSubmit={handleSubmit} color="blue">
                Add
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </form>
  );
}

export default AddMovie;
