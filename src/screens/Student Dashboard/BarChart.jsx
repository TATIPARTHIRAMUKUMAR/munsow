// import { Divider } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import { SentimentDissatisfied } from '@mui/icons-material';
// import "./Carousel.css";

// const LineChartComponent = () => {
//   const { userStats } = useSelector((state) => state.data);

//   const [data, setData] = useState([]);
//   const [dataWithSerialNumbers, setDataWithSerialNumbers] = useState([]);
//   const [showLast, setShowLast] = useState(10); // Default to show last 10 data points

//   useEffect(() => {
//     const initialData = userStats?.graphs?.length > 0 ? userStats.graphs[0].data : [];
//     setData(initialData);
//     setDataWithSerialNumbers(initialData);
//   }, [userStats]);

//   const handleShowLastChange = (e) => {
//     const newShowLast = parseInt(e.target.value, 10);
//     setShowLast(newShowLast);
//     const slicedData = dataWithSerialNumbers.slice(-newShowLast);
//     setData(slicedData);
//   };

//   const noDataComponent = (
//     <div className='font-bold' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%', borderRadius: '10px' }}>
//       <SentimentDissatisfied style={{ fontSize: 50, color: '#888', animation: 'bounce 2s infinite' }} />
//       <div style={{ marginTop: '20px', textAlign: 'center', lineHeight: '1.5em', color: '#555' }}>
//         There's not enough data to present any insights. Start attending interviews to see your journey.
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <div className="flex justify-between filter-sort p-3">
//         <div className='text-lg font-semibold'>My Readiness Score Trend</div>
//         {console.log("data", data)}
//         <div className='flex'>
//           {data.length > 0 && (
//             <div>
//               <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Show last : </label>
//               <input
//                 type="number"
//                 min="1"
//                 max={dataWithSerialNumbers.length}
//                 placeholder="Number of data points"
//                 value={showLast}
//                 onChange={handleShowLastChange}
//                 style={{ width: '60px', borderRadius: "8px", height: "35px" }}
//               />
//             </div>)}
//         </div>
//       </div>
//       <Divider style={{ opacity: "0.4", marginBottom: "25px" }} />
//       <ResponsiveContainer width="100%" height={300}>
//         {data.length === 0 ? noDataComponent : (
//           <LineChart
//             data={data}
//             margin={{ top: 0, right: 30, left: 20, bottom: 20 }}
//             padding={{ top: 50 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" label={{ value: 'Number of Interviews', angle: 0, position: 'middle', dy: 20 }} />
//             <YAxis dataKey="readiness_score" label={{ value: 'Readiness Score', angle: -90, position: 'middle', dx: -10 }} />
//             <Tooltip />
//             <Legend verticalAlign="top" height={36}/>
//             <Line type="monotone" dataKey="readiness_score" name="Readiness Score" stroke="#8884d8" />
//           </LineChart>
//         )}
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineChartComponent;

import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SentimentDissatisfied } from '@mui/icons-material';
import "./Carousel.css";

const LineChartComponent = () => {
  const { userStats } = useSelector((state) => state.data);

  const [data, setData] = useState([]);
  const [dataWithSerialNumbers, setDataWithSerialNumbers] = useState([]);
  const [showLast, setShowLast] = useState(10); // Default to show last 10 data points

  useEffect(() => {
    const initialData = userStats?.graphs?.length > 0 ? userStats.graphs[0].data : [];

    const formatScore = (score) => {
      if (score > 10) {
        return (Math.floor(score / 10) + (score % 10) / 10).toFixed(2);
      }
      return score;
    };

    const formattedData = initialData.map(item => ({
      ...item,
      readiness_score: parseFloat(formatScore(item.readiness_score))
    }));

    setData(formattedData);
    setDataWithSerialNumbers(formattedData);
  }, [userStats]);

  const handleShowLastChange = (e) => {
    const newShowLast = parseInt(e.target.value, 10);
    setShowLast(newShowLast);
    const slicedData = dataWithSerialNumbers.slice(-newShowLast);
    setData(slicedData);
  };

  const noDataComponent = (
    <div className='font-bold' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%', borderRadius: '10px' }}>
      <SentimentDissatisfied style={{ fontSize: 50, color: '#888', animation: 'bounce 2s infinite' }} />
      <div style={{ marginTop: '20px', textAlign: 'center', lineHeight: '1.5em', color: '#555' }}>
        There's not enough data to present any insights. Start attending interviews to see your journey.
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between filter-sort p-3">
        <div className='text-lg font-semibold'>My Readiness Score Trend</div>
        <div className='flex'>
          {data.length > 0 && (
            <div>
              <label className='text-gray-600 text-lg font-semibold text-opacity-80'>Show last : </label>
              <input
                type="number"
                min="1"
                max={dataWithSerialNumbers.length}
                placeholder="Number of data points"
                value={showLast}
                onChange={handleShowLastChange}
                style={{ width: '60px', borderRadius: "8px", height: "35px" }}
              />
            </div>
          )}
        </div>
      </div>
      <Divider style={{ opacity: "0.4", marginBottom: "25px" }} />
      <ResponsiveContainer width="100%" height={300}>
        {data.length === 0 ? noDataComponent : (
          <LineChart
            data={data}
            margin={{ top: 0, right: 30, left: 20, bottom: 20 }}
            padding={{ top: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: 'Number of Interviews', angle: 0, position: 'middle', dy: 20 }} />
            <YAxis dataKey="readiness_score" label={{ value: 'Readiness Score', angle: -90, position: 'middle', dx: -10 }} />
            <Tooltip />
            <Legend verticalAlign="top" height={36}/>
            <Line type="monotone" dataKey="readiness_score" name="Readiness Score" stroke="#8884d8" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
