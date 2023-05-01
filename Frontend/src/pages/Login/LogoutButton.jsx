import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useAuth } from "../../AuthContext";

function LogoutButton() {
  const { setCurrentUser } = useAuth();
  async function handleLogout(event) {
    // Clear the connection to the server
    const response = await axios.post("http://localhost:8080/logout");
    // Clear the token on the client side
    localStorage.clear();
    setCurrentUser(null);
    notifications.show({
      title: response.data,
      message: "See you again soon!",
    });
    return;
  }
  return <Button onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
