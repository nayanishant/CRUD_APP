import "./App.css";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowAllUsers from "./Pages/ShowAllUsers/ShowAllUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/showallusers" element={<ShowAllUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
