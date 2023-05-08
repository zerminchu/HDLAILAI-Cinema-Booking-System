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
  const [runTime, setRuntime] = useState(data.runTime);
  const [genre, setGenre] = useState(data.genre);
  const [sypnosis, setSypnosis] = useState(data.sypnosis);
  const [imageURL, setImageURL] = useState(data.imageURL);
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  function handleSubmit(event) {
    console.log(runTime);
    event.preventDefault();
    axios
      .put(`http://localhost:8080/updatemoviesession/update/${id}`, {
        id: id,
        title: title,
        runTime: runTime,
        genre: genre,
        sypnosis: sypnosis,
        imageURL: imageURL,
      })
      .then(() => {
        notifications.show({
          title: `Movie`,
          message: "Movie updated successfully",
          autoClose: 3000,
        });
        navigateTo("/ViewMovies");
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
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Textarea
                className="synopsisField"
                placeholder="Synopsis of the movie"
                label="Synopsis"
                value={sypnosis}
                onChange={(event) => setSypnosis(event.target.value)}
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
