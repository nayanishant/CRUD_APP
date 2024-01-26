import "./App.css";
import axios from "axios";
import { useState } from "react";

const URL = "http://localhost:8080/api/data";

function App() {
  const [formData, setFormData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   try {
  //     getData()
  //   } catch (error) {
  //     console.log('Error getting data:', error.message)
  //   }
  // }, [])

  const getData = async () => {
    try {
      const response = await axios.get(URL);
      setFormData(response.data);
    } catch (error) {
      console.log(`Error getting data: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFirstName('')
    setLastName('')
    setEmail('')

    try {
      const postData = await axios.post(URL, {
        firstName,
        lastName,
        email,
      });
      console.log(`Server response: ${postData.data}`);
    } catch (error) {
      console.log(`Error posting data: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}${id}`)
      const filteredData = formData.filter((data) => data.id !== id)
      setFirstName(filteredData)
    } catch (error) {
      console.log(`Error deleting data: ${error.message}`)
    }
  }

  return (
    <div>
      <div>
        <input
          placeholder="Please enter first name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          placeholder="Please enter lat name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          placeholder="Please enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {formData.map((data, index) => {
        return (
          <div className="card_wrapper" key={data._id}>
            <p>First Name: {data.firstName}</p>
            <p>Last Name: {data.lastName}</p>
            <p>Email: {data.email}</p>
            <button onClick={handleDelete}>Delete</button>
          </div>
        );
      })}
      <button onClick={getData}>Fetch</button>
    </div>
  );
}

export default App;
