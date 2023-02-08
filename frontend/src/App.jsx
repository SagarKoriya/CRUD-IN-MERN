import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("zain");
  const [rank, setRank] = useState("5");
  const [country, setCountry] = useState("india");
  const [dob, setDOB] = useState("2023-02-21");
  const [totalrun, setRun] = useState(5000);
  const [recall, setRecall] = useState();
  const [cricketers, setCricketers] = useState([]);

  const baseURL = "http://localhost:3010/cricketers";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const x = response.data;
      setCricketers(x);
    });
  }, [recall]);
  function handlesubmit() {
    var today = new Date(),
      time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setRecall(time);
    const collection1 = {
      Name: name,
      Country: country,
      DOB: dob,
      TotalRun: totalrun,
      Rank: rank,
    };
    axios.post("http://localhost:3010/cricketers", collection1);
    console.log(time);
  }

  return (
    <div>
      <label>Cricketer Rank:</label>
      <input
        type="number"
        name="Rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />
      <br />
      <label>Cricketer Name:</label>
      <input
        type="text"
        name="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Cricketer Country:</label>
      <input
        type="text"
        name="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <br />
      <label>Cricketer DOB:</label>
      <input
        type="date"
        name="DOB"
        value={dob}
        onChange={(e) => setDOB(e.target.value)}
      />
      <br />
      <label>Cricketer TotalRun:</label>
      <input
        type="number"
        name="TotalRun"
        value={totalrun}
        onChange={(e) => setRun(e.target.value)}
      />
      <br />
      <button onClick={handlesubmit}>Submit</button>
      <ul>
        {cricketers.map((i) => (
          <li key={i._id}>
            <p>
              {i.name} &nbsp;
              {i.country} &nbsp;
              {i.rank} &nbsp;
              {i.totalRun} &nbsp;
              {i.dob}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
