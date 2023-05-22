import { Center, Container, Loader } from "@mantine/core";
import "./App.css";
import { useAuth } from "./AuthContext";
import { HeaderResponsive } from "./components/Navbar";
import PageRoutes from "./routes/PageRoutes";
function App() {
  const { currentUser, loading } = useAuth();
  return loading ? (
    <Center>
      <Loader />
    </Center>
  ) : (
    <div className="App">
      <HeaderResponsive />
      <PageRoutes />
    </div>
  );
}

export default App;
