import {
  SimpleGrid,
  Divider,
  Space,
  Box,
  Spoiler,
  Container,
  Center,
  Image,
  Text,
  Button,
  Flex,
} from "@mantine/core";
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
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    async function fetchTicketTypes() {
      //console.log(loadedMovieSession);
      const hallAndSeatResponse = await axios.get(
        `http://localhost:8080/viewmoviesession/hallandseat?moviesessionid=${movieSession.id}&hallid=${movieSession.hallId}`
      );
      const { hall: loadedHall, seats: loadedSeats } = hallAndSeatResponse.data;
      console.log(loadedHall);
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
    setSelectedSeats(
      seats2D.reduce((prev, next) => {
        const filteredSeats = next.filter((seat) => seat.selected);
        return prev.concat(filteredSeats);
      }, [])
    );
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
    !isLoading && (
      // <div>
      //   <Text>{movie.title}</Text>
      //   <Text>{movie.runTime}</Text>
      //   <SeatMap seats={seats2D} handleClick={toggleSelect} />
      //   <Button component={Link}  to="/ticketcheckout" state={selectedSeats}>Next</Button>
      // </div>

      <div>
        <h1>Choose Your Seats</h1>
        <Container my="md">
          <Divider my="md" size="sm" />
          <SimpleGrid cols={2}>
            <div>
              <Image
                src={movie.imageURL}
                alt="Poster"
                width={400}
                height={600}
              />
            </div>
            <div>
              <h1>{movie.title}</h1>
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[3],
                  textAlign: "center",
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                })}
              >
                <Spoiler
                  maxHeight={120}
                  showLabel="Show more"
                  hideLabel="Hide"
                  transitionDuration={0}
                >
                  {movie.synopsis}
                </Spoiler>
              </Box>
              <Space h="sm" />
              <SimpleGrid cols={2}>
                <div>
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[5]
                          : theme.colors.blue[3],
                      textAlign: "center",
                      borderRadius: theme.radius.md,
                    })}
                  >
                    Genre:
                    <Space h="s" />
                    <Text weight={600}>{movie.genre}</Text>
                  </Box>
                </div>
                <div>
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[5]
                          : theme.colors.blue[3],
                      textAlign: "center",
                      borderRadius: theme.radius.md,
                    })}
                  >
                    Runtime:
                    <Space h="s" />
                    <Text weight={600}>{movie.runTime} minutes</Text>
                  </Box>
                </div>
              </SimpleGrid>
            </div>
          </SimpleGrid>
          <Space h="sm" />
          <Divider my="sm" size="sm" />
        </Container>

        <Container my="md">
          <SimpleGrid cols={1}>
            <Center>
              <div>
                <Text size="xl" weight={700}>
                  Select your seats for {movie.title}, on{" "}
                  {new Date(movieSession.startDateTime).toLocaleString(
                    "en-sg",
                    options
                  )}
                </Text>
              </div>
            </Center>
            <Center>
              <div>
                <Box
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === ""
                        ? theme.colors.gray[5]
                        : theme.colors.gray[3],
                    textAlign: "center",
                    padding: theme.spacing.xl,
                    borderRadius: theme.radius.md,
                    width: "100%",
                  })}
                >
                  <Text size="xl" weight={700}>
                    {movieSession.hallName}
                  </Text>
                  <SeatMap seats={seats2D} handleClick={toggleSelect} />
                </Box>
              </div>
            </Center>
          </SimpleGrid>
        </Container>
        <Flex justify={{ sm: "right" }}>
          <Button
            component={Link}
            to="/ticketcheckout"
            state={{ movieSession, selectedSeats }}
            disabled={selectedSeats.length === 0}
          >
            Next
          </Button>
        </Flex>
      </div>
    )
  );
}

export default CustomerViewMovieSession;
