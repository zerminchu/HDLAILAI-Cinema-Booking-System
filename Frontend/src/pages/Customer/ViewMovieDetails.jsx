import { TextInput, PasswordInput, Button, Container, SimpleGrid, Grid, Spoiler, Text, Center, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

function ViewMovieDetails() {
    const location = useLocation();
    // const movie = location.state;
    const [movie, setMovie] = useState([]);
    const { id } = useParams();

    useEffect(function loadData() {
        // Load data from backend API
        axios
          .get(`http://localhost:8080/viewmovie/${id}`)
          .then(function (response) {
            // Store data into react state
            console.log(response);
            setMovie({...response.data, synopsis: movie.sypnosis });
          });
        // [] means the loadData function only runs once when the page first loads
      }, []);

    return (
        <div>
            <h1>Movie Details</h1>
            <Container my="md">
                <SimpleGrid cols={2}>
                    <div>
                        <Image src={movie.imageURL} alt="Poster" width={400} height={600}/>
                    </div>
                    <div>
                        <Text fz="xl" ta="center">{movie.title}</Text>
                        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide" transitionDuration={0}>
                            {movie.synopsis}
                        </Spoiler>
                    </div>

                </SimpleGrid>
            </Container>
        </div>
    );
}

export default ViewMovieDetails;