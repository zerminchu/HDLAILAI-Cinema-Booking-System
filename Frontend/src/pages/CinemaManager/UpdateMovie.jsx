import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextInput,
  NumberInput,
  Button,
  Container,
  Grid,
  Textarea,
} from "@mantine/core";
import "../CinemaManager/Components/ViewMovie/MovieStyle.css";

function UpdateMovie() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const [title, setTitle] = useState(data.title);
  const [titleError, setTitleError] = useState("");
  const [runTime, setRuntime] = useState(data.runTime);
  const [runTimeError, setRunTimeError] = useState("");
  const [genre, setGenre] = useState(data.genre);
  const [genreError, setGenreError] = useState("");
  const [synopsis, setSynopsis] = useState(data.synopsis);
  const [synopsisError, setSynopsisError] = useState("");
  const [imageURL, setImageURL] = useState(data.imageURL);
  const [imageURLError, setImageURLError] = useState("");
  const [error, setError] = useState("");

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
        .put(`http://localhost:8080/updatemovie/update/${id}`, {
          id: id,
          title: title,
          runTime: runTime,
          genre: genre,
          synopsis: synopsis,
          imageURL: imageURL,
        })
        .then(() => {
          notifications.show({
            title: `Movie`,
            message: "Movie updated successfully",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.log(error);

          let errorMessage = `${error.response.data}`;

          setError(errorMessage);
          notifications.show({
            title: `Error updating Movie`,
            message: errorMessage,
            autoClose: 1500,
            color: "red",
          });
        });
      navigate("/ViewMovies");
    }
  }

  return (
    <form className="UpdateMovieForm" onSubmit={handleSubmit}>
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
                value={title}
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
                value={runTime}
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
                value={genre}
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
                value={synopsis}
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
                value={imageURL}
                onChange={(event) => setImageURL(event.target.value)}
                error={imageURLError}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={1}>
              <Button type="submit" className="createMovieButton" color="blue">
                Update
              </Button>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </form>
  );
}

export default UpdateMovie;
