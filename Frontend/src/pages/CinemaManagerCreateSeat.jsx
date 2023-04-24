import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextInput, Button, Group, Box, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { faCouch, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CMCreateSeat() {
  const [rowId, setRows] = useState(0);
  const [columnId, setCols] = useState(0);
  const [seats, setSeats] = useState([]);
  const [halls, setHalls] = useState([]);
  const [currentHallId, setCurrentHallId] = useState(null);
  const theme = useMantineTheme();

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewseat/all")
      .then(({ data }) => {
        if (data) {
          setSeats(data);
        }
      })
      .catch((error) => console.log(error));
  }, []); 

  const handleRowsChange = (event) => {
    setRows(event.target.value);
  };

  const handleColsChange = (event) => {
    setCols(event.target.value);
  };

  const handlePopulateSeats = () => {
    const newSeats = [];
    for (let i = 0; i < rowId; i++) {
      const row = [];
      for (let j = 0; j < columnId; j++) {
        row.push({ row: i + 1, col: j + 1, isBooked: false });
      }
      newSeats.push(row);
      console.log(newSeats)
    }
    setSeats(newSeats);
    handleSaveSeats(JSON.parse(JSON.stringify(newSeats)));

  };

  /*  const handleSaveSeats = () => {
    const seatsToSave = [];
  
    seats.forEach((rowId) => {
      rowId.forEach((seat) => {
        const { rowId: rowNumber, columnId: colNumber, isBooked } = seat;
        const newSeat = {
          rowId: String(rowNumber),
          columnId: colNumber,
          status: isBooked,
          hallId: currentHallId,
        };
        seatsToSave.push(newSeat);
      });
    });
  
    axios
      .post("http://localhost:8080/createseat/add", seatsToSave)
      .then(() => {
        notifications.show({
          title: "Seats saved",
          message: "Seat data saved successfully",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error saving seats",
          autoClose: 3000,
        });
      });
  };  */

  const handleSaveSeats = (seats) => {
    axios
      .post("http://localhost:8080/createseat/add", {
        rowId: rowId,
        columnId: columnId,
        seats: seats,
        hallId: currentHallId,
      })
      .then((response) => {
        notifications.show({
          title: "Seats added",
          message: `New seats added to hall ${currentHallId}`,
          color: theme.colors.green[6],
          icon: <FontAwesomeIcon icon={faCheckSquare} />,
        });
      })
      .catch((error) => {
        notifications.show({
          title: "Error",
          message: "Failed to add seats",
          color: theme.colors.red[6],
          icon: <FontAwesomeIcon icon={faCouch} />,
        });
        console.log(error);
      });
  };
  

  return (
    <div>
      <Box m={theme.spacing.xl}>
        <h1>Seat Map</h1>
        <form>
          <TextInput
            label="Rows"
            value={rowId}
            onChange={handleRowsChange}
            type="number"
            min={0}
          />
          <TextInput
            label="Columns"
            value={columnId}
            onChange={handleColsChange}
            type="number"
            min={0}
          />
          <Group position="right" mt={theme.spacing.md}>
            <Button onClick={handlePopulateSeats}>Populate Seats</Button>
          </Group>
         {<Group position="right" mt={theme.spacing.md}>
            <Button onClick={handleSaveSeats}>Save Seats</Button>
          </Group>}
        </form>
        <Box mt={theme.spacing.md}>
        {seats.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((seat, colIndex) => (
                <FontAwesomeIcon
                  icon={seat.isBooked ? faCheckSquare : faCouch}
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    display: "inline-block",
                    width: 20,
                    height: 20,
                    margin: 2,
                    //backgroundColor: seat.isBooked ? "gray" : "green",
                  }}
                  onClick={() => {
                    const newSeats = [...seats];
                    newSeats[rowIndex][colIndex].isBooked =
                      !newSeats[rowIndex][colIndex].isBooked;
                    setSeats(newSeats);
                  }}
                />
              ))}
            </div>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default CMCreateSeat;
