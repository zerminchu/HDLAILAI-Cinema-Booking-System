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
  Anchor,
  Divider,
  Text,
} from "@mantine/core";
import { useAuth } from "../../AuthContext.jsx";

function CustomerHome() {
  const [movies, setMovies] = useState([]);
  const [isAllMovie, setIsAllMovie] = useState(true);
  const [query, setQuery] = useState("");
  const { currentUser } = useAuth();
  const recordsPerPage = 6;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(movies.slice(0, recordsPerPage));
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const from = (page - 1) * recordsPerPage;
    const to = from + recordsPerPage;
    setRecords(movies.slice(from, to));
    setTotalPages(
      Math.ceil(
        movies.filter((movie) => !movie.suspended).length / recordsPerPage
      )
    );
  }, [page, movies]);

  useEffect(function loadData() {
    // Load data from backend API
    axios.get("http://localhost:8080/viewmovie/all").then(function (response) {
      // Store data into react state
      console.log(response);
      setMovies(response.data);
    });
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

  const grid = records.map((movie) => {
    if (movie.suspended) {
      return null;
    }
    return (
      <div key={movie.id}>
        <Anchor
          component={Link}
          to={`/ViewMovieDetails/${movie.id}`}
          state={movie}
          {...(currentUser?.role !== "Customer"
            ? {
                onClick: (event) => {
                  event.preventDefault();
                },
                style: { cursor: "not-allowed" },
              }
            : null)}
        >
          <Image src={movie.imageURL} height={550} />
        </Anchor>
      </div>
    );
  });

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
              className="search-bar"
            />
            <Button type="submit" variant="light" color="blue">
              Search
            </Button>
          </Group>
        </form>
      </div>
      {movies.length === 0 ? (
        <Text fw={400} style={{ textAlign: "center" }}>
          No movies found
        </Text>
      ) : (
        <div>
          <SimpleGrid cols={3} spacing="md">
            {grid}
          </SimpleGrid>
        </div>
      )}
      <Pagination
        position="center"
        value={page}
        onChange={setPage}
        total={totalPages}
      />
    </SimpleGrid>
  );
}

export default CustomerHome;
