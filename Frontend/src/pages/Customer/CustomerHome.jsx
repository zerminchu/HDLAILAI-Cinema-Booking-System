import MoviesTable from "../CinemaManager/Components/ViewMovie/MoviesTable.jsx";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, TextInput, Group, Pagination, Image, SimpleGrid, Grid } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import logo from './Components/cicakman_poster.jpg';

function CustomerHome() {
  // State to store data
  const [movies, setMovies] = useState([]);
  // const [isAllMovie, setIsAllMovie] = useState(true);
  // const [query, setQuery] = useState("");


  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/searchmovie?q=${query}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setMovies(response.data);
  //       setIsAllMovie(true);
  //     })
  //     .catch((error) => console.log(error));
  // }, [query]);

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewmovie/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setMovies(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  const images = ["https://cdn.shopify.com/s/files/1/0057/3728/3618/products/mandalorian.12.11_480x.progressive.jpg?v=1607720303",
                  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/mandalorian.53990f.pw_480x.progressive.jpg?v=1599582245",
                  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/mandalorian_480x.progressive.jpg?v=1614199582",
                  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/mando.rep_480x.progressive.jpg?v=1627669751",
                  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/monstersinc24_480x.progressive.jpg?v=1617303583",
                  "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ratatouille.24x36_480x.progressive.jpg?v=1658171975"]

  const slides = movies.map((movie) => (
    <Carousel.Slide key={movie.id}>
      <Image src={movie.imageURL} height={600}/>
    </Carousel.Slide>
  ))

  return (
    <SimpleGrid>
      <div>
        <h1>Popular Movies</h1>
        <Carousel 
        mx="auto" 
        withIndicators 
        height="auto"
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
        >
          {slides}
        </Carousel>
      </div>

      <div>
        <Grid>
          <Grid.Col span="">

          </Grid.Col>
        </Grid>
      </div>

      <div>
        <Pagination total={10} />
      </div>
    </SimpleGrid>
  );
}

export default CustomerHome;