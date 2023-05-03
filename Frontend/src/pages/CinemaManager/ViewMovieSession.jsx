import MovieSessionTable from "../CinemaManager/Components/ViewMovieSession/MovieSessionTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateMSModal from "./CreateMSModal.jsx";

function ViewMovieSession() {
  // State to store data
  const [movieSession, setMovieSession] = useState([]);

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewmoviesession/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setMovieSession(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return (
    <div>
      <h1>View Movie Session</h1>
      {/* <ButtonMenu /> */}
      <CreateMSModal />
      <MovieSessionTable data={movieSession} setData={setMovieSession} />
    </div>
  );
}

export default ViewMovieSession;
