import {
  Space,
  Container,
  SimpleGrid,
  Divider,
  Spoiler,
  Text,
  Center,
  Image,
  Box,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import ViewMovieSessionsByMovie from "./Components/ViewMovieDetails/ViewMovieSessionsByMovie";

function ViewMovieDetails() {
  const location = useLocation();
  // const movie = location.state;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [showSession, setShowSession] = useState(false);

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get(`http://localhost:8080/viewmovie/${id}`)
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setMovie(response.data);
        setIsLoading(false);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Movie Details</h1>
      <Container my="md">
        <Divider my="sm" size="sm" />
        <Space h="sm" />
        <SimpleGrid cols={2}>
          <div>
            <Image src={movie.imageURL} alt="Poster" width={400} height={600} />
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
          <div>
            <Text size="xl" weight={700}>
              Select a time slot for {movie.title}
            </Text>
          </div>
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
                })}
              >
                <Button onClick = {setShowSession(true)}>
                  Movie Sessions
                </Button>
                {showSession && <ViewMovieSessionsByMovie movie={movie}/>}
              </Box>
            </div>
          </Center>
        </SimpleGrid>
      </Container>
    </div>
  );
}

export default ViewMovieDetails;
