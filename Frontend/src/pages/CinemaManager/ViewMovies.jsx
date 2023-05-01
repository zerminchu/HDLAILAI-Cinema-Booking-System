import MoviesTable from "../CinemaManager/Components/ViewMovie/MoviesTable.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

function ViewMovies() {
  // State to store data
  const [movies, setMovies] = useState([]);

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewmovie/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setMovies(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return (
    <div>
      <h1>View Movies</h1>
      {/* <ButtonMenu /> */}
      <Button component={Link} to="/AddMovie">
        Add New
      </Button>
      <MoviesTable data={movies} setData={setMovies} />
    </div>
  );
}

export default ViewMovies;
