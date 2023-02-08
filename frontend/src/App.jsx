import { useEffect, useState } from "react";
import axios from "axios";
var bodyFormData = new FormData();
import superagent from "superagent";

function App() {
  const [name, setName] = useState("zain");
  const [rank, setRank] = useState("5");
  const [country, setCountry] = useState("india");
  const [dob, setDOB] = useState("2023-02-21");
  const [totalrun, setRun] = useState("5000");
  const [cricketers, setCricketers] = useState([]);

  const baseURL = "http://localhost:3010/cricketers";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const x = response.data;
      setCricketers(x);
    });
  }, []);
  function handlesubmit() {
    const data =
      "Name=" +
      name +
      ",Country=" +
      country +
      ",DOB=" +
      dob +
      ",TotalRun=" +
      totalrun +
      ",Rank=" +
      rank;
    const collection1 = {
      Name: name,
      Country: country,
      DOB: dob,
      TotalRun: totalrun,
      Rank: rank,
    };
    const newdata = JSON.stringify(collection1);
    axios.post("http://localhost:3010/cricketers", {
      Name: name,
      Country: country,
      DOB: dob,
      TotalRun: totalrun,
      Rank: rank,
    });
    /*
    fetch(baseURL, {
      method: "POST",
      header: {
        Accept: "application/json",
        ContentType: "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Country: country,
        DOB: dob,
        TotalRun: totalrun,
        Rank: rank,
      }),
    });*/
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
              {i.name}
              {i.country}
              {i.rank}
              {i.dob}
              {i.totalrun}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
