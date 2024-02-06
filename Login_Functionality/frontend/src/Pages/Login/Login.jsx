import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // set cookies from client side automatically
  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };

    try {
      await axios.post("http://localhost:5000/login", data);
      navigate("/showallusers");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="card_wrapper">
        <div className="cardHeader">
          <h1>Welcome</h1>
          <p>Please login into your account</p>
        </div>
        <div className="cardBody">
          <div>
            <input
              type="text"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="cardFooter">
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
