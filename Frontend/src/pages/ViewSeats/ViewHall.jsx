// import { useEffect, useState } from "react";
import { TextInput, NumberInput, Button, Container, Grid } from "@mantine/core";
// import axios from "axios";
import "./ViewHallStyle.css";
import { MdChair } from "react-icons/md";
import SeatMap from "../SeatMap";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
function ViewHall() {

  const { id } = useParams();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userProfileId, setUserProfileId] = useState(-1);
  // const [profileOptions, setProfileOptions] = useState([]);
  const [hall, setHall] = useState(null);
  const [totalRow, setTotalRow] = useState(0);
  const [totalCol, setTotalCol] = useState(0);
  
  const [seats, setSeats] = useState(0);

  //const [seats, setSeats] = useState([]);
  // // Load user profiles
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/createuserprofile/all")
  //     .then(({ data }) => {
  //       if (data) {
  //         const options = data.map((profile) => {
  //           return { value: profile.id, label: profile.profileName };
  //         });
  //         setProfileOptions([...options]);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // function handleSubmit(event) {
  //   // Prevent submit from refreshing the page
  //   event.preventDefault();
  //   console.log(userProfileId);
  //   // handle submit here
  //   axios
  //     .post("http://localhost:8080/login", {
  //       userProfile: { id: userProfileId },
  //       email: email,
  //       password: password,
  //     })
  //     .then((response) => {
  //       alert(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.response.data);
  //     });
  // }


  useEffect(() => {
    async function getHallAndSeats(id) {
      try {
        const hallResponse = await axios.get(`http://localhost:8080/viewhall/${id}`);
        const loadedHall = hallResponse.data;
        console.log(loadedHall);
        const seatResponse = await axios.get(`http://localhost:8080/viewseat/all/${id}`);
        const loadedSeats = seatResponse.data;
        let newSeats = [];
        while (loadedSeats.length)
          newSeats.push(loadedSeats.splice(0, loadedHall.totalRow));
        setHall(loadedHall);
        setSeats(newSeats);
      } catch (error) {
        console.log(error);
      }
    }

    getHallAndSeats(id);
  }, []); 
/*     axios
      .get("http://localhost:8080/viewhall/1")
      .then((response) => {
        console.log(response.data);
        loadedHall = response.data;
        setHall(loadedHall);
        axios
          .get("http://localhost:8080/viewseat/all/1")
          .then((response) => {
            loadedSeats = response.data;
            console.log(response.data);
            newSeats = [];
            while (arr.length) newSeats.push(loadedSeats.splice(0, loadedHall.totalRow));

          })
      })
      .catch((error) => console.log(error));*/
 

  return (
    <form className="loginForm">
      <div>
        <Container my="md">
          <Grid>
            <Grid.Col xs={6}>
              <TextInput className="hallNameField" label="Hall Name" disabled />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Button className="editBtn">Edit</Button>
            </Grid.Col>
            <Grid.Col xs={12}></Grid.Col>
            <Grid.Col xs={6}>
              <NumberInput
                defaultValue={0}
                className="rowsField"
                label="No. of Rows"
                disabled
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <NumberInput
                defaultValue={0}
                label="No. of Columns"
                placeholder=""
                disabled
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Button className="updateBtn">Update</Button>
            </Grid.Col>
            <Grid.Col xs={12}>
              <ul className="showcase">
                <li>
                  <div className="seatSelected">
                    <MdChair style={{ color: "228BE6" }} />
                  </div>
                  <small>Selected</small>
                </li>
                <li>
                  <div className="seatAvailable">
                    <MdChair style={{ color: "868E96" }} />
                  </div>
                  <small>Available</small>
                </li>
                <li>
                  <div className="seatOccupied">
                    <MdChair style={{ color: "F03E3E" }} />
                  </div>
                  <small>Occupied</small>
                </li>
                <li>
                  <div className="seatUnavailable">
                    <MdChair style={{ color: "2C2E33" }} />
                  </div>
                  <small>Unavailable</small>
                </li>
              </ul>
            </Grid.Col>
            <Grid.Col xs={4}></Grid.Col>
            <Grid.Col xs={4}>
              <div className="screen">Screen</div>
            </Grid.Col>
            <Grid.Col xs={4}></Grid.Col>
          </Grid>
        </Container>
      </div>
      <SeatMap seats={seats} />
    </form>
  );
}

export default ViewHall;
