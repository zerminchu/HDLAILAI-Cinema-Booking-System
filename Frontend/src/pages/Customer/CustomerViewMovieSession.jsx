import { NumberInput, Select, Image, Text,Button } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import SeatMap from "../CinemaManager/Components/ViewSeats/SeatMap";
import { notifications } from "@mantine/notifications";
import { useLocation, Link } from "react-router-dom";

function CustomerViewMovieSession() {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [movieSession, setMovieSession] = useState(data.movieSession);
  const [movie, setMovie] = useState(data.movie);
  const [ticketTypeOptions, setTicketOptions] = useState([]);
  const [seats2D, setSeats2D] = useState([[]]);
  const [hall, setHall] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
    async function fetchTicketTypes() {

      //console.log(loadedMovieSession);
      const hallAndSeatResponse = await axios.get(
        `http://localhost:8080/viewmoviesession/hallandseat?moviesessionid=${movieSession.id}&hallid=${movieSession.hallId}`
      );
      const {hall: loadedHall, seats: loadedSeats} = hallAndSeatResponse.data;
      console.log(loadedHall)
      let seatsForMovieSession = [];
      while (loadedSeats.length && loadedHall.totalColumn)
        seatsForMovieSession.push(
          loadedSeats.splice(0, loadedHall.totalColumn)
        );
      setHall(loadedHall);
      setSeats2D(seatsForMovieSession);
      setIsLoading(false);
    }
    fetchTicketTypes();
  }, []);

  useEffect(() => {
    console.log("selectedseats");
    setSelectedSeats(seats2D.reduce((prev, next) => {
      const filteredSeats = next.filter((seat) => seat.selected);
      return prev.concat(filteredSeats);
    }, []));
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

  return (!isLoading &&
    <>
    <Image src={movie.imageURL}/>
    <Text>{movie.title}</Text>
    <Text>{movie.runTime}</Text>
    <Text>{new Date(movieSession.startDateTime).toLocaleString('en-sg')}</Text>
    <Text>{movieSession.hallName}</Text>
      <SeatMap seats={seats2D} handleClick={toggleSelect} />
      <Button component={Link}  to="/ticketcheckout" state={selectedSeats}>Next</Button>
    </>
  );
}

export default CustomerViewMovieSession;
