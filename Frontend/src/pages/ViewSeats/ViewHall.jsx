// import { useEffect, useState } from "react";
import { TextInput, NumberInput, Button, Container, Grid } from "@mantine/core";
// import axios from "axios";
import "./ViewHallStyle.css";
import { MdChair } from "react-icons/md";

function ViewHall() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userProfileId, setUserProfileId] = useState(-1);
  // const [profileOptions, setProfileOptions] = useState([]);
  
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

  return (
    <form className="loginForm">
      {/* <div className="formFields">
        <Select
          className="profileField"
          data={profileOptions}
          value={userProfileId}
          placeholder="Login As"
          onChange={setUserProfileId}
        />

        <TextInput
          className="emailField"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />

        <PasswordInput
          className="passwordField"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Button className="loginBtn" type="submit">
          Submit
        </Button>
      </div> */}
      <div>
        <Container my="md">
          <Grid>
            <Grid.Col xs={6}>
              <TextInput
              className="hallNameField"
              label="Hall Name"
              disabled
              />
            </Grid.Col>
            <Grid.Col xs={2}></Grid.Col>
            <Grid.Col xs={8}>
              <Button className="editBtn">
                Edit
              </Button>
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
            <Button className="updateBtn">
              Update
            </Button>
            </Grid.Col>
            <Grid.Col xs={12}>
              <ul className="showcase">
                <li>
                  <div className="seatSelected"><MdChair style={{color: '228BE6'}} /></div>
                  <small>Selected</small>
                </li>
                <li>
                  <div className="seatAvailable"><MdChair style={{color: '868E96'}} /></div>
                  <small>Available</small>
                </li>
                <li>
                  <div className="seatOccupied"><MdChair style={{color: 'F03E3E'}} /></div>
                  <small>Occupied</small>
                </li>
                <li>
                  <div className="seatUnavailable"><MdChair style={{color: '2C2E33'}} /></div>
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
    </form>
  );
}

export default ViewHall;
