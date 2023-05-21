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
import { useForm } from "@mantine/form";

function UpdateMovie() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state;

  const [title, setTitle] = useState(data.title);
  const [runTime, setRuntime] = useState(data.runTime);
  const [genre, setGenre] = useState(data.genre);
  const [synopsis, setSynopsis] = useState(data.synopsis);
  const [imageURL, setImageURL] = useState(data.imageURL);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: title,
      runTime: runTime,
      genre: genre,
      synopsis: synopsis,
      imageURL: imageURL,
    },

    validate: {
      title: (value) => {
        if (value.length === 0) return "Movie title is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Movie title contains trailing/leading whitespaces";
        return null;
      },
      runTime: (value) => {
        if (value.length === 0) return "Movie runtime is empty.";
        if (value <= 0) return "Movie runtime must be greater than 0.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Item price contains trailing/leading whitespaces";
        return null;
      },
      genre: (value) => {
        if (value.length === 0) return "Movie imageURL is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Movie imageURL contains trailing/leading whitespaces";
        return null;
      },
      synopsis: (value) => {
        if (value.length === 0) return "Movie imageURL is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Movie imageURL contains trailing/leading whitespaces";
        return null;
      },
      imageURL: (value) => {
        if (value.length === 0) return "Movie imageURL is empty.";
        if (/^\s*$|^\s+.*|.*\s+$/.test(value))
          return "Movie imageURL contains trailing/leading whitespaces";
        return null;
      },
    },
  });

  function handleSubmit(values) {
    console.log(runTime);
    //event.preventDefault();
    axios
      .put(`http://localhost:8080/updatemovie/update/${id}`, {
        id: id,
        title: values.title,
        runTime: values.runTime,
        genre: values.genre,
        synopsis: values.synopsis,
        imageURL: values.imageURL,
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
      navigate("/ViewMovies");
    }

  return (
    <form className="UpdateMovieForm" onSubmit={form.onSubmit(handleSubmit)}>
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
                //value={title}
                //onChange={(event) => setTitle(event.target.value)}
                {...form.getInputProps('title')}
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
                //value={runTime}
                //onChange={setRuntime}
                {...form.getInputProps('runTime')}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
                className="genreField"
                placeholder="Genre of the movie"
                label="Genre"
                /* value={genre}
                onChange={(event) => setGenre(event.target.value)} */
                {...form.getInputProps('genre')}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Textarea
                className="synopsisField"
                placeholder="Synopsis of the movie"
                label="Synopsis"
               /*  value={synopsis}
                onChange={(event) => setSynopsis(event.target.value)} */
                {...form.getInputProps('synopsis')}
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>

            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <TextInput
                className="movieImageField"
                placeholder="Movie image URL"
                label="Movie Image"
          /*       value={imageURL}
                onChange={(event) => setImageURL(event.target.value)} */
                {...form.getInputProps('imageURL')}
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
