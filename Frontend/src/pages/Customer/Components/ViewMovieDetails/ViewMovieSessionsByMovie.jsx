import {
  Box,
  Container,
  NumberInput,
  Select,
  SimpleGrid,
  Tabs,
  Text,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewMovieSessionsByMovie({movie = null}) {
  const [movieSessions, setMovieSessions] = useState({
    today: [],
    tomorrow: [],
    dayAfter: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const [activeTab, setActiveTab] = useState(today.toLocaleDateString("en-sg"));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    async function fetchMovieSessions() {
      //console.log(movie.id);
      if (!movie) return;
      const res = await axios.get(
        `http://localhost:8080/viewmoviesession/movie/${movie.id}`
      );
      const todaySessions = res.data.filter(
        (session) =>
          new Date(session.startDateTime).toLocaleDateString("en-sg") ===
          today.toLocaleDateString("en-sg")
      );
      const tomorrowSessions = res.data.filter(
        (session) =>
          new Date(session.startDateTime).toLocaleDateString("en-sg") ===
          tomorrow.toLocaleDateString("en-sg")
      );
      const dayAfterSessions = res.data.filter(
        (session) =>
          new Date(session.startDateTime).toLocaleDateString("en-sg") ===
          dayAfter.toLocaleDateString("en-sg")
      );
      const sessions = {
        today: todaySessions,
        tomorrow: tomorrowSessions,
        dayAfter: dayAfterSessions,
      };
      setMovieSessions(sessions);
      setIsLoading(false);
    }

    fetchMovieSessions();
  }, [movie]);

  function showMovieSessionsListings(daySessions) {
    return daySessions.map((movieSession) => {
      return (
        <Box key={movieSession.id}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            textAlign: "center",
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: "pointer",
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.blue[2],
            },
          })}
        >
          <Link to={`/CustomerViewMovieSession/${movieSession.id}`}  state={{movie, movieSession}}>
            <Text style={{whiteSpace:"nowrap"}}>{new Date(movieSession.startDateTime).toLocaleTimeString("en-sg", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}</Text>
          </Link>
        </Box>
      );
    });
  }

  return (isLoading ? <Loader />: 
    <Tabs
      variant="pills"
      defaultValue={today.toLocaleDateString('en-SG')}
      orientation="vertical"
    >
      <Tabs.List>
        <Tabs.Tab value={today.toLocaleDateString('en-SG')}>
          {today.toLocaleDateString('en-SG', options)}
        </Tabs.Tab>
        <Tabs.Tab value={tomorrow.toLocaleDateString(('en-SG'))}>
          {tomorrow.toLocaleDateString('en-SG', options)}
        </Tabs.Tab>
        <Tabs.Tab value={dayAfter.toLocaleDateString('en-SG')}>
          {dayAfter.toLocaleDateString("en-sg", options)}
        </Tabs.Tab>
      </Tabs.List>

      <Container       w={"100%"}>
        <Tabs.Panel value={today.toLocaleDateString("en-sg")}>
          <Container>
            <SimpleGrid cols={5}>
              {movieSessions.today.length === 0 ? (
                <Text>No sessions</Text>
              ) : (
                showMovieSessionsListings(movieSessions.today)
              )}
            </SimpleGrid>
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value={tomorrow.toLocaleDateString("en-sg")}>
          <Container>
            <SimpleGrid cols={5}>
              {movieSessions.tomorrow.length === 0 ? (
                <Text>No sessions</Text>
              ) : (showMovieSessionsListings(movieSessions.tomorrow))}
            </SimpleGrid>
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value={dayAfter.toLocaleDateString("en-sg")}>
          <Container>
            <SimpleGrid cols={5}>
              {movieSessions.dayAfter.length === 0 ? (
                <Text>No sessions</Text>
              ) : (showMovieSessionsListings(movieSessions.dayAfter))}
            </SimpleGrid>
          </Container>
        </Tabs.Panel>

      </Container>
    </Tabs>
  );
}

export default ViewMovieSessionsByMovie;
