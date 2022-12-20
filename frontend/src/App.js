import { useState, useEffect, useCallback } from "react";
import "./App.css";
import axios from "axios";
import LineChart from "./components/LineChart";

function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [startDate, setStartDate] = useState("2022-11-30");
  const [endDate, setEndDate] = useState("2022-12-30");

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get("/metric");

      setChartData({
        labels: data.data.map((data) => data.date),
        datasets: [
          {
            data: data.data.map((data) => data.average),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  const getRangeData = async () => {
    try {
      const { data } = await axios.get(
        `/metric?startDate=${startDate}&endDate=${endDate}`
      );

      setChartData({
        labels: data.data.map((data) => data.date),
        datasets: [
          {
            data: data.data.map((data) => data.average),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Inline Chart for Metric Depth Rate per Day</h1>
      <LineChart chartData={chartData} />
      <h3>Please Select 2 Dates</h3>
      <div className="inputs-container">
        <input
          type="date"
          min="2022-11-30"
          max="2022-12-30"
          value={startDate}
          onChange={(e) => handleStartChange(e)}
        />
        <input
          type="date"
          min="2022-11-30"
          max="2022-12-30"
          value={endDate}
          onChange={(e) => handleEndChange(e)}
        />
      </div>
      <button onClick={getRangeData}>Submit</button>
    </div>
  );
}

export default App;
