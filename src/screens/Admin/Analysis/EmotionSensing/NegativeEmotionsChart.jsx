import React, {useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import "./EmotionSensing.css";
import { SentimentDissatisfied } from '@mui/icons-material';


const NegativeEmotionsChart = (props) => {
  const {data, name} = props;
    const legendFormatter = (value, entry) => {  

      return (
        <div className={"line-legend-item"}>
          <div
            className={"line-legend-color"}
            style={{ backgroundColor: entry.color }}
          />
          <div className="line-legend-text">{value}</div>
        </div>
      );
    };

    useEffect(() => {
      Highcharts.chart('Negative', {
        chart: {
          type: 'line',
          height: 250,
          backgroundColor: 'transparent', // Set background color to transparent
          margin: [20, 50, 5, 5], // Adjust margins as per requirement
        },
        title: {
          text: null
        },
        xAxis: {
          categories: data?.map(item => item.name),
          title: {
            text: 'TIME'
          },
          labels: {
            align: 'center',
            style: {
              color: 'black', // Adjust X-axis label color if needed
            }
          },
        },
        yAxis: {
          title: {
            text: 'EMOTIONS'
          },
          labels: {
            align: 'center',
            style: {
              color: 'black', // Adjust Y-axis label color if needed
            }
          },
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          itemDistance: 10
        },
        plotOptions: {
          series: {
            stacking: 'normal',
            borderRadius: 5
          }
        },
        series: [{
          name: 'Disgust',
          data: data?.map(item => item.Disgust),
          color: '#F3DCBF',
          lineWidth: 3
        }, {
          name: 'Contempt',
          data: data?.map(item => item.Contempt),
          color: '#C4A6FA',
          lineWidth: 3
        }, {
          name: 'Sadnesss',
          data: data?.map(item => item.Sadnesss),
          color: '#A6A6A6',
          lineWidth: 3
        }, {
          name: 'Anger',
          data: data?.map(item => item.Anger),
          color: '#4FD3C4',
          lineWidth: 3
        }, {
          name: 'Fear',
          data: data?.map(item => item.Fear),
          color: '#FBC046',
          lineWidth: 3
        }]
      });
    }, [data]);
  
    return (
      <div
        className="mt-5 pt-3 pb-3"
        style={{
          background: "#FFF9F2",
          borderRadius: "30px",
          paddingLeft: "10px",
        }}
      >
        <div
          className="fs-5 fw-bold text mb-4 pb-4"
          style={{ left: "30%", position: "relative", color: "#005B82" }}
        >
          {name}
        </div>
        <div id="Negative"></div>
        {/* {data > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 50,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="0 0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text axis-data"
              interval={0}
              dy={10}
              dx={20}
            >
              <Label
                className="text"
                value="TIME"
                position="bottom"
                dy={20} // Adjust the distance from the X-axis
              />
            </XAxis>
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text axis-data"
              dx={-5}
            >
              <Label
                className="text"
                value="EMOTIONS"
                position="middle"
                angle={-90} // Rotate the label for vertical orientation
                dx={-30} // Adjust the distance from the Y-axis
              />
            </YAxis>
            <Tooltip />
            <Legend
              formatter={(value, entry) => legendFormatter(value, entry)}
              layout="horizontal"
              iconSize={0}
              wrapperStyle={{
                width: "95%",
                marginBottom: "20px",
                top: "-50px",
              }}
            />
            <Line
              type="monotone"
              dataKey="Disgust"
              stroke="#F3DCBF"
              strokeWidth={3}
              dot={{
                stroke: "#F3DCBF",
                strokeWidth: 4,
                r: 2,
                strokeDasharray: "",
              }}
            />
            <Line
              type="monotone"
              dataKey="Contempt"
              stroke="#C4A6FA"
              strokeWidth={3}
              dot={{
                stroke: "#C4A6FA",
                strokeWidth: 4,
                r: 2,
                strokeDasharray: "",
              }}
            />
            <Line
              type="monotone"
              dataKey="Sadnesss"
              stroke="#A6A6A6"
              strokeWidth={3}
              dot={{
                stroke: "#A6A6A6",
                strokeWidth: 4,
                r: 2,
                strokeDasharray: "",
              }}
            />
            <Line
              type="monotone"
              dataKey="Anger"
              stroke="#4FD3C4"
              strokeWidth={3}
              dot={{
                stroke: "#4FD3C4",
                strokeWidth: 4,
                r: 2,
                strokeDasharray: "",
              }}
            />
            <Line
              type="monotone"
              dataKey="Fear"
              stroke="#FBC046"
              strokeWidth={3}
              dot={{
                stroke: "#FBC046",
                strokeWidth: 4,
                r: 2,
                strokeDasharray: "",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
        ) : (
          <div className='font-bold' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%', borderRadius: '10px' }}>
              <SentimentDissatisfied style={{ fontSize: 50, color: '#888', animation: 'bounce 2s infinite' }} />
              <div style={{ marginTop: '20px', textAlign: 'center', lineHeight: '1.5em', color: '#555' }}>
                There's no data to show here yet.
              </div>
            </div>
        )} */}
      </div>
    );
  };
  export default NegativeEmotionsChart