import CinemaManagerHeader from "./Components/ViewHalls/CinemaManagerHeader";
import MoviesTable from "../CinemaManager/Components/ViewMovie/MoviesTable.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextInput,
  Group,
  Space,
  Divider,
  Text,
  Pagination,
} from "@mantine/core";
import "./Components/ViewMovie/SearchMovie.css";

function ViewMovies() {
  // State to store data
  const [movies, setMovies] = useState([]);
  const [isAllMovie, setIsAllMovie] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  function search(event) {
    event.preventDefault();
    console.log(query);
    axios
      .get(`http://localhost:8080/searchmovie?q=${query}`)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
        setIsAllMovie(true);
      })
      .catch((error) => console.log(error));
  }

  useEffect(function loadData() {
    // Load data from backend API
    axios.get("http://localhost:8080/viewmovie/all").then(function (response) {
      // Store data into react state
      console.log(response);
      setMovies(response.data);
    });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastMovie = currentPage * perPage;
  const indexOfFirstMovie = indexOfLastMovie - perPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div>
      <h1>Movies</h1>
      <Space h="lg" />
      <Divider my="sm" size="sm" />
      <form onSubmit={search}>
        <Group>
          <TextInput
            value={query}
            name={"query"}
            placeholder="Search for Movies"
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="search-bar"
          />
          <Button type="submit" variant="light" color="blue">
            Search
          </Button>
        </Group>
      </form>

      <Button
        component={Link}
        to="/AddMovie"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Add New
      </Button>

      {movies.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No movies found
        </Text>
      ) : (
        <>
          <MoviesTable data={currentMovies} setData={setMovies} />
          <Pagination
            style={{ justifyContent: "center", marginTop: 20 }}
            limit={perPage}
            page={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(movies.length / perPage)}
          />
        </>
      )}
    </div>
  );
}

export default ViewMovies;
