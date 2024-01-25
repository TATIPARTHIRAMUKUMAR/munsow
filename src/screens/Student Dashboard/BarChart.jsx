import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { loadUserStats } from "../../redux/action";
import { SentimentDissatisfied } from "@mui/icons-material";
import "./Carousel.css";

const interviewData = [
  {
    "Knowledge/Skills": 18,
    "Mindset/Attitude": 15,
    "Practical Thinking": 10,
    name: "1",
  },
  {
    "Knowledge/Skills": 10,
    "Mindset/Attitude": 30,
    "Practical Thinking": 15,
    name: "2",
  },
  {
    "Knowledge/Skills": 24,
    "Mindset/Attitude": 30,
    "Practical Thinking": 26,
    name: "3",
  },
  {
    "Knowledge/Skills": 44,
    "Mindset/Attitude": 40,
    "Practical Thinking": 16,
    name: "4",
  },
  {
    "Knowledge/Skills": 54,
    "Mindset/Attitude": 40,
    "Practical Thinking": 16,
    name: "5",
  },
  // Add more interview data as needed
];

const LineChartComponent = () => {
  // Add serial numbers to the data

  const { userStats } = useSelector((state) => state.data);

  const [data, setData] = useState([]);
  const [dataWithSerialNumbers, setdataWithSerialNumbers] = useState([]);

  // const dataWithSerialNumbers = data;

  useEffect(() => {
    setData(userStats?.graphs?.length > 0 ? userStats.graphs[0].data : []);
    setdataWithSerialNumbers(
      userStats?.graphs?.length > 0 ? userStats.graphs[0].data : []
    );
  }, [userStats]);

  console.log("data", data, userStats);
  const [sortBy, setSortBy] = useState("serialNumber"); // Initial sort by serialNumber
  const [filterBy, setFilterBy] = useState("");
  const [showLast, setShowLast] = useState(10); // Default to show last 10 data points

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    const sortedData = [...data].sort((a, b) => {
      return newSortBy === "score"
        ? b.score - a.score
        : a.serialNumber - b.serialNumber;
    });
    setData(sortedData);
  };

  // const handleFilterChange = (e) => {
  //   const newFilterBy = e.target.value;
  //   setFilterBy(newFilterBy);
  //   const filteredData = dataWithSerialNumbers.filter((item) =>
  //     item.score.toString().includes(newFilterBy)
  //   );
  //   setData(filteredData);
  // };

  const handleShowLastChange = (e) => {
    const newShowLast = parseInt(e.target.value, 10);
    setShowLast(newShowLast);
    const slicedData = dataWithSerialNumbers.slice(-newShowLast);
    setData(slicedData);
  };

  return (
    <div>
      <div className="flex justify-between filter-sort p-3">
        <div className="text-lg font-semibold">My Interview Score Trend</div>
        <div className="flex">
          {/* <div className='pr-3'>
            <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Sort by: </label>
            <select value={sortBy} onChange={handleSortChange} className='rounded-lg height-10'>
              <option value="serialNumber">S.No</option>
              <option value="score">Score</option>
            </select>
          </div> */}

          {/* <div className='pr-3'>
            <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Filter by Score: </label>
            <input
              type="text"
              placeholder=""
              value={filterBy}
              onChange={handleFilterChange}
              style={{ width: '50px',borderRadius:"8px",height:"35px"  }}
            />
          </div>*/}
          {data.length > 0 && (
            <div>
              <label className="text-gray-600 text-lg font-semibold text-opacity-80">
                Show last :{" "}
              </label>
              <input
                type="number"
                min="1"
                max={dataWithSerialNumbers.length}
                placeholder="Number of data points"
                value={showLast}
                onChange={handleShowLastChange}
                style={{ width: "60px", borderRadius: "8px", height: "35px" }}
              />
            </div>
          )}
        </div>
      </div>
      <Divider style={{ opacity: "0.4", marginBottom: "25px" }} />
      <ResponsiveContainer width="100%" height={300}>
        {data.length === 0 ? (
          <div
            className="font-bold"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
              borderRadius: "10px",
            }}
          >
            <SentimentDissatisfied
              style={{
                fontSize: 50,
                color: "#888",
                animation: "bounce 2s infinite",
              }}
            />
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                lineHeight: "1.5em",
                color: "#555",
              }}
            >
              There's nothing to show here yet. Start attending interviews to
              see your journey
            </div>
          </div>
        ) : (
          // <div className='font-bold' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%', }}>
          //   No data for now, attend interviews to see your progress.
          // </div>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              dataKey="Knowledge/Skills"
              label={{
                value: "Interview Scores",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Knowledge/Skills"
              name="Knowledge/Skills"
              stroke="#e573eb"
            />
            <Line
              type="monotone"
              dataKey="Mindset/Attitude"
              name="Mindset/Attitude"
              stroke="#58cf36"
            />
            <Line
              type="monotone"
              dataKey="Practical Thinking"
              name="Practical Thinking"
              stroke=" #fa8802"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
