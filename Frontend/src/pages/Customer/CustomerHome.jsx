import MoviesTable from "../CinemaManager/Components/ViewMovie/MoviesTable.jsx";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextInput,
  Group,
  Pagination,
  Image,
  SimpleGrid,
  Grid,
  Center,
  Anchor,
  Divider,
} from "@mantine/core";

function CustomerHome() {
  const [movies, setMovies] = useState([]);
  const [isAllMovie, setIsAllMovie] = useState(true);
  const [query, setQuery] = useState("");

  const recordsPerPage = 6;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(movies.slice(0, recordsPerPage));

  useEffect(() => {
    const from = (page - 1) * recordsPerPage;
    const to = from + recordsPerPage;
    setRecords(movies.slice(from, to));
  }, [page, movies]);

  useEffect(function loadData() {
    // Load data from backend API
    axios.get("http://localhost:8080/viewmovie/all").then(function (response) {
      // Store data into react state
      console.log(response);
      setMovies(response.data);
    });
    // [] means the loadData function only runs once when the page first loads
  }, []);

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

  const grid = records.map((movie) => (
    <div key={movie.id}>
      <Anchor
        component={Link}
        to={`/ViewMovieDetails/${movie.id}`}
        state={movie}
      >
        <Image src={movie.imageURL} height={550} />
      </Anchor>
    </div>
  ));

  return (
    <SimpleGrid>
      <h1>NOW SHOWING</h1>
      <Divider my="sm" size="sm" />
      <div>
        <form onSubmit={search}>
          <Group>
            <TextInput
              value={query}
              name={"query"}
              placeholder="Search for Movies"
              onChange={(event) => setQuery(event.currentTarget.value)}
              className="search"
            />
            <Button type="submit" variant="light" color="blue">
              Search
            </Button>
          </Group>
        </form>
      </div>
      <div>
        <SimpleGrid cols={3} spacing="md">
          {grid}
        </SimpleGrid>
      </div>

      <Center maw={400} mx="auto">
        <div>
          <Pagination
            value={page}
            onChange={setPage}
            total={movies.length / recordsPerPage}
          />
        </div>
      </Center>
    </SimpleGrid>
  );
}

export default CustomerHome;
