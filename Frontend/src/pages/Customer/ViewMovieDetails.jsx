import { TextInput, PasswordInput, Button, Container, SimpleGrid, Grid, Spoiler, Text, Center, Image, Box, Loader } from "@mantine/core";
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

    return (isLoading? <Loader/>:
        <div>
            <h1>Movie Details</h1>
            <Container my="md">
                <SimpleGrid cols={2}>
                    <div>
                        <Image src={movie.imageURL} alt="Poster" width={400} height={600}/>
                    </div>
                    <div>
                        <h1>{movie.title}</h1>
                        <Box
                            sx={(theme) => ({
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                                textAlign: 'center',
                                padding: theme.spacing.xl,
                                borderRadius: theme.radius.md,
                        })}
                        >
                        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
                                                    {movie.synopsis}
                                                </Spoiler>
                        </Box>
                    </div>
                </SimpleGrid>
                <SimpleGrid cols={1}>
                    <Center>
                        <div>
                            <Box
                                sx={(theme) => ({
                                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                                    textAlign: 'center',
                                    padding: theme.spacing.xl,
                                    borderRadius: theme.radius.md,
                            })}
                            >
                                <ViewMovieSessionsByMovie movie={movie}/>
                            </Box>
                        </div>
                    </Center>
                </SimpleGrid>
            </Container>
        </div>
    );
}

export default ViewMovieDetails;