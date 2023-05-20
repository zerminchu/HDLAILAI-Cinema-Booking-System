import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Grid,
  Textarea,
} from "@mantine/core";
import axios from "axios";
import "../CinemaManager/Components/ViewMovie/MovieStyle.css";
function AddMovie() {
  const [title, setTitle] = useState("");
  const [runTime, setRuntime] = useState(0);
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [runTimeError, setRunTimeError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [synopsisError, setSynopsisError] = useState("");
  const [imageURLError, setImageURLError] = useState("");

  const navigate = useNavigate();

  function validateForm() {
    let isValid = true;

    const fields = [
      { value: title, errorSetter: setTitleError, fieldName: "Title" },
      { value: genre, errorSetter: setGenreError, fieldName: "Genre" },
      { value: synopsis, errorSetter: setSynopsisError, fieldName: "Synopsis" },
      {
        value: imageURL,
        errorSetter: setImageURLError,
        fieldName: "Image URL",
      },
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

    if (runTime < 60) {
      setRunTimeError("Runtime must be more than 60 minutes");
      isValid = false;
    } else {
      setRunTimeError("");
    }

    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:8080/createmovie/add", {
          title: title,
          runTime: runTime,
          genre: genre,
          synopsis: synopsis,
          imageURL: imageURL,
        })
        .then(() => {
          notifications.show({
            title: `Movie`,
            message: "Movie created successfully",
            autoClose: 3000,
          });
          navigateTo("/ViewMovies");
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

      navigate("/ViewMovies");
    }
  }
  return (
    <form className="CreateMovieForm" onSubmit={handleSubmit}>
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
                error={titleError}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <NumberInput
                className="runtimeField"
                placeholder="Runtime in minutes"
                label="Runtime"
                min={0}
                onChange={setRuntime}
                error={runTimeError}
                withAsterisk
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
                error={genreError}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Textarea
                className="synopsisField"
                placeholder="Synopsis of the movie"
                label="Synopsis"
                onChange={(event) => setSynopsis(event.target.value)}
                error={synopsisError}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
                className="movieImageField"
                placeholder="Movie image URL"
                label="Movie Image"
                onChange={(event) => setImageURL(event.target.value)}
                error={imageURLError}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={1}>
              <Button type="submit" className="createMovieButton" color="blue">
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
