import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const URL = 'http://localhost:8000/'

function App() {
  const [trials, setTrials] = useState([]);
  const [newTrial, setNewTrial] = useState("");

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await axios.get(URL);
        setTrials(response.data);
      } catch (error) {
        console.error("Error fetching trials:", error.message);
      }
    };
    return () => {
      fetchTrials()
    }
  }, [trials]);

  const addTrial = async () => {
    try {
      const response = await axios.post(URL, {
        text: newTrial,
      });
      setTrials([...trials, response.data]);
      setNewTrial("");
    } catch (error) {
      console.error("Error adding trial:", error.message);
    }
  };

  const deleteTrial = async (id) => {
    try {
      await axios.delete(`${URL}${id}`);
      const filteredTrials = trials.filter((trial) => trial.id !== id);
      setTrials(filteredTrials);
    } catch (error) {
      console.error("Error deleting trial:", error.message);
    }
  };

  return (
    <div className="App">
      <h1>Trials Management App</h1>
      <ul>
        {trials.map((trial, index) => {
          return (
            <li key={trial._id}>
              <p>{trial.text}</p>
              <button onClick={() => {
                deleteTrial(trial._id)
              }}>Delete</button>
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        value={newTrial}
        onChange={(e) => setNewTrial(e.target.value)}
      />
      <button style={{marginLeft: "8px"}} onClick={addTrial}>Add Trial</button>
    </div>
  );
}

export default App;
