import UsersRolesTable from "./components/UserRolesTable";
import { useEffect, useState } from "react";
import axios from "axios";

import ButtonMenu from "./components/ButtonMenu";

function HourTicketSales() {
  // State to store data
  const [Ticket, setUsers] = useState([]);

  useEffect(function loadData() {
    // Load data from backend API
    axios
      .get("http://localhost:8080/viewuseraccount/all")
      .then(function (response) {
        // Store data into react state
        console.log(response);
        setUsers(response.data);
      });
    // [] means the loadData function only runs once when the page first loads
  }, []);

  return (
    <div>
      <h1>HDLAILAI</h1>
      <h2>Ticket Summary Report</h2>
      
    </div>
  );
}

export default HourTicketSales;
