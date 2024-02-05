import "./ShowAlUsers.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ShowAllUsers = () => {
  const [getAllUsers, setGetAllUsers] = useState([]);

  // set cookies from client side automatically
  axios.defaults.withCredentials = true;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/showallusers`);
      setGetAllUsers(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container_wrapper">
      {getAllUsers.map((data, index) => (
        <div className="card" key={data._id}>
          <div className="username">
            <p>{data.username}</p>
          </div>
          <div className="email">
            <p>{data.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAllUsers;
