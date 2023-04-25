import {  Box, useMantineTheme } from "@mantine/core";
import { faCouch, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdChair } from "react-icons/md";
function SeatMap({ seats=null, unsuspend, updateSeats }) {
    const theme = useMantineTheme();
    console.log(seats);
  return seats ? (
    <Box mt={theme.spacing.md}>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((seat, colIndex) => (
            <MdChair
              key={`${seat.rowId}-${seat.columnId}`}
              name={`${seat.rowId}-${seat.columnId}`}
              style={{
                display: "inline-block",
                width: 20,
                height: 20,
                margin: 2,
                color: seat.blocked ? "black" : "grey",
              }}
              onClick={() => seat.blocked ? unsuspend(seat.id) : updateSeats(seat.id)}
            />
          ))}
        </div>
      ))}
    </Box>
  ) : (
    <></>
  );
}

export default SeatMap;
