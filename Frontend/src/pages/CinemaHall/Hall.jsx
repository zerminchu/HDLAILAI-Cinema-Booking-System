import React, { useState } from "react";

function SeatMap() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [seats, setSeats] = useState([]);

  const handleRowsChange = (event) => {
    setRows(event.target.value);
  };

  const handleColsChange = (event) => {
    setCols(event.target.value);
  };

  const handlePopulateSeats = () => {
    const newSeats = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ row: i + 1, col: j + 1, isBooked: false });
      }
      newSeats.push(row);
    }
    setSeats(newSeats);
  };

  return (
    <div>
      <label>
        Rows:
        <input type="number" value={rows} onChange={handleRowsChange} />
      </label>
      <br />
      <label>
        Columns:
        <input type="number" value={cols} onChange={handleColsChange} />
      </label>
      <br />
      <button onClick={handlePopulateSeats}>Populate Seats</button>
      <br />
      {seats.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((seat, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`}>
              {seat.isBooked ? "X" : `${seat.row}-${seat.col}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatMap;


// CONTROLLER 
@Autowired
private SeatRepository seatRepository;

@PostMapping("/reserve-seats")
public ResponseEntity<?> reserveSeats(@RequestBody List<String> seatNumbers) {
    for (String seatNumber : seatNumbers) {
        Optional<Seat> optionalSeat = seatRepository.findBySeatNumber(seatNumber);
        if (optionalSeat.isPresent()) {
            Seat seat = optionalSeat.get();
            seat.setStatus("Reserved");
            seatRepository.save(seat);
        }
        else {
            // Handle case where seat is not found in database
            return ResponseEntity.badRequest().body("Seat not found: " + seatNumber);
        }
    }
    return ResponseEntity.ok().build();
}