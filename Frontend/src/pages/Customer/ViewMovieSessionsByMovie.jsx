import {
  Box,
  Container,
  NumberInput,
  Select,
  SimpleGrid,
  Tabs,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewMovieSessionsByMovie() {
  const [movieSessions, setMovieSessions] = useState({
    today: [],
    tomorrow: [],
    dayAfter: [],
  });
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const [activeTab, setActiveTab] = useState(today.toLocaleDateString("en-sg"));
  useEffect(() => {
    async function fetchMovieSessions() {
      const res = await axios.get(
        `http://localhost:8080/viewmoviesession/movie/${1}`
      );

      console.log(today.toLocaleDateString("en-sg"));
      console.log(tomorrow.toLocaleDateString("en-sg"));
      console.log(dayAfter.toLocaleDateString("en-sg"));
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
    }

    fetchMovieSessions();
  }, []);

  function showMovieSessionsListings(daySessions) {
    console.log(daySessions);
    return daySessions.map((movieSession) => {
      return (
        <Box
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
                  : theme.colors.gray[1],
            },
          })}
        >
          <Link to="">
            {new Date(movieSession.startDateTime).toLocaleTimeString("en-sg", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Link>
        </Box>
      );
    });
  }

  return (
    <Tabs
      defaultValue={today.toLocaleDateString("en-sg")}
      orientation="vertical"
    >
      <Tabs.List>
        <Tabs.Tab value={today.toLocaleDateString("en-sg")}>
          {today.toLocaleDateString("en-sg")}
        </Tabs.Tab>
        <Tabs.Tab value={tomorrow.toLocaleDateString("en-sg")}>
          {tomorrow.toLocaleDateString("en-sg")}
        </Tabs.Tab>
        <Tabs.Tab value={dayAfter.toLocaleDateString("en-sg")}>
          {dayAfter.toLocaleDateString("en-sg")}
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={today.toLocaleDateString("en-sg")}>
        <Container>
          <SimpleGrid cols={6}>
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
          <SimpleGrid cols={6}>
            {showMovieSessionsListings(movieSessions.tomorrow)}
          </SimpleGrid>
        </Container>
      </Tabs.Panel>
      <Tabs.Panel value={dayAfter.toLocaleDateString("en-sg")}>
        <Container>
          <SimpleGrid cols={6}>
            {showMovieSessionsListings(movieSessions.dayAfter)}
          </SimpleGrid>
        </Container>
      </Tabs.Panel>
    </Tabs>
  );
}

export default ViewMovieSessionsByMovie;
