import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import MoviesTable from "../CinemaManager/Components/ViewMovie/MoviesTable.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, TextInput, Group } from "@mantine/core";
import "./Components/ViewMovie/SearchMovie.css";

function ViewMovies() {
  // State to store data
  const [movies, setMovies] = useState([]);
  const [isAllMovie, setIsAllMovie] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/searchmovie?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
        setIsAllMovie(true);
      })
      .catch((error) => console.log(error));
  }, [query]);

  useEffect(function loadData() {
    // Load data from backend API
    axios.get("http://localhost:8080/viewmovie/all").then(function (response) {
      // Store data into react state
      console.log(response);
      setMovies(response.data);
    });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return (
    <div>
      <Group>
        <TextInput
          value={query}
          name={"query"}
          placeholder="Search for Movies"
          onChange={(event) => setQuery(event.currentTarget.value)}
          className="search-bar"
        />
      </Group>

      <Button component={Link} to="/AddMovie">
        Add New
      </Button>
      <MoviesTable data={movies} setData={setMovies} />
    </div>
  );
}

export default ViewMovies;
