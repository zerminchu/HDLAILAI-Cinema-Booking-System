import { NumberInput, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import SeatMap from "../CinemaManager/Components/ViewSeats/SeatMap";
import { notifications } from "@mantine/notifications";

function TestPurchaseForm(id = 1) {
  const [movieSession, setMovieSession] = useState(null);
  const [ticketTypeOptions, setTicketOptions] = useState([]);
  const [seats2D, setSeats2D] = useState([[]]);
  const [hall, setHall] = useState(null);

  useEffect(() => {
    async function fetchTicketTypes() {
      const movieSessionResponse = await axios.get(
        `http://localhost:8080/viewmoviesession/${1}`
      );
      const loadedMovieSession = movieSessionResponse.data;

      console.log(loadedMovieSession);
      const hallResponse = await axios.get(
        `http://localhost:8080/viewhall/${loadedMovieSession.hallId}`
      );
      console.log(hallResponse.data);

      const loadedHall = hallResponse.data;

      const seatsForMovieSessionResponse = await axios.get(
        `http://localhost:8080/viewseat/moviesession/${loadedMovieSession.id}`
      );
      const loadedSeats = seatsForMovieSessionResponse.data;
      let seatsForMovieSession = [];
      while (loadedSeats.length && loadedHall.totalColumn)
        seatsForMovieSession.push(
          loadedSeats.splice(0, loadedHall.totalColumn)
        );
      setMovieSession(movieSession);
      setHall(loadedHall);
      setSeats2D(seatsForMovieSession);
      console.log(seatsForMovieSession);
    }
    fetchTicketTypes();
  }, []);

  useEffect(() => {
    const selectedSeats = seats2D.reduce((prev, next) => {
      const filteredSeats = next.filter((seat) => seat.selected);
      return prev.concat(filteredSeats);
    }, []);
    console.log("selectedseats");
    console.log(selectedSeats);
  }, [seats2D]);

  function toggleSelect(seat) {
    console.log(seat);
    const seatId = seat.id;
    if (seat.booked)
      return notifications.show({
        title: `Seat is already booked`,
        message: "Please choose another seat",
        autoClose: 1500,
        color: "red",
      });
    if (seat.blocked)
      return notifications.show({
        title: `Seat is blocked`,
        message: "Please choose another seat",
        autoClose: 1500,
        color: "red",
      });
    setSeats2D(
      seats2D.map((seats1D) => {
        return seats1D.map((seat) =>
          seat.id === seatId ? { ...seat, selected: !seat.selected } : seat
        );
      })
    );
  }

  return (
    <>
      <SeatMap seats={seats2D} handleClick={toggleSelect} />
    </>
  );
}

export default TestPurchaseForm;
