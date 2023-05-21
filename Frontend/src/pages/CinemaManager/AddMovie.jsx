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
import { useForm } from "@mantine/form";
function AddMovie() {
/*   const [title, setTitle] = useState("");
  const [runTime, setRuntime] = useState(0);
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [imageURL, setImageURL] = useState("");*/
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      runTime: 0,
      genre: "",
      synopsis: "",
      imageURL: "",
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
    //event.preventDefault();
    axios
      .post("http://localhost:8080/createmovie/add", {
        title: values.title,
        runTime: values.runTime,
        genre: values.genre,
        synopsis: values.synopsis,
        imageURL: values.imageURL,
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
  }

  return (
    <form className="CreateMovieForm" onSubmit={form.onSubmit(handleSubmit)}>
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
                //onChange={(event) => setGenre(event.target.value)}
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
                //onChange={(event) => setSynopsis(event.target.value)}
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
                //onChange={(event) => setImageURL(event.target.value)}
                {...form.getInputProps('imageURL')}
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
