import MovieSessionTable from "../CinemaManager/Components/ViewMovieSession/MovieSessionTable.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mantine/core";

function ViewMovieSession() {
  // State to store data
  const [movieSession, setMovieSession] = useState([]);

  /*useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewmovie/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setMovies(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []); */

  return (
    <div>
      <h1>View Movie Session</h1>
      {/* <ButtonMenu /> */}
      <Button component={Link} to="/CreateMS">
        Add New
      </Button>
      <MovieSessionTable data={movieSession} setData={setMovieSession} />
    </div>
  );
}

export default ViewMovieSession;
