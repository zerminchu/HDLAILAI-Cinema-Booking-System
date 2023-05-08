import { Box, useMantineTheme, Container, Grid } from "@mantine/core";
import { faCouch, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdChair } from "react-icons/md";
function SeatMap({
  seats = [],
  handleClick = () => {
    console.log("clicked");
  },
}) {
  const theme = useMantineTheme();
  return seats ? (
    <Container my="md">
      <Grid>
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
        {/* <Grid.Col xs={4}></Grid.Col> */}
        <Grid.Col xs={12}>
          <div className="screen">
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Screen</span>
          </div>
        </Grid.Col>
        {/*  <Grid.Col xs={4}></Grid.Col> */}
      </Grid>
      <Box mt={theme.spacing.xl}>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} style={{ textAlign: "center" }}>
            {row.map((seat, colIndex) => {
              return (
                <MdChair
                  key={`${seat.rowId}-${seat.columnId}`}
                  name={`${seat.rowId}-${seat.columnId}`}
                  style={{
                    display: "inline-block",
                    width: 50,
                    height: 50,
                    margin: 2,
                    cursor: "pointer",
                    color: seat.blocked
                      ? "2C2E33"
                      : seat.booked
                      ? "F03E3E"
                      : seat.selected
                      ? "228BE6"
                      : "868E96",
                  }}
                  onClick={() => handleClick(seat)}
                />
              );
            })}
          </div>
        ))}
      </Box>
    </Container>
  ) : (
    <></>
  );
}

export default SeatMap;
