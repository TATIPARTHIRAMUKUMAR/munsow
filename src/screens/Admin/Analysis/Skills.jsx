import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";

const Skills = () => {
  const data = [
    {
        "id": "0",
        "data": [
            { "x": "surprise", "y": 50 },
            { "x": "disgust", "y": 48 },
            { "x": "contempt", "y": 31 },
            { "x": "happiness", "y": 20 },
            { "x": "sadnesss", "y": 0 },
            { "x": "anger", "y": 39 },
            { "x": "fear", "y": 86 }
        ]
    },
    {
        "id": "1",
        "data": [
            { "x": "surprise", "y": 64 },
            { "x": "disgust", "y": 10 },
            { "x": "contempt", "y": 2 },
            { "x": "happiness", "y": 11 },
            { "x": "sadnesss", "y": 69 },
            { "x": "anger", "y": 85 },
            { "x": "fear", "y": 78 }
        ]
    },
    {
        "id": "2",
        "data": [
            { "x": "surprise", "y": 49 },
            { "x": "disgust", "y": 84 },
            { "x": "contempt", "y": 73 },
            { "x": "happiness", "y": 93 },
            { "x": "sadnesss", "y": 75 },
            { "x": "anger", "y": 30 },
            { "x": "fear", "y": 79 }
        ]
    },
    {
        "id": "3",
        "data": [
            { "x": "surprise", "y": 56 },
            { "x": "disgust", "y": 97 },
            { "x": "contempt", "y": 36 },
            { "x": "happiness", "y": 30 },
            { "x": "sadnesss", "y": 54 },
            { "x": "anger", "y": 50 },
            { "x": "fear", "y": 25 }
        ]
    },
    {
        "id": "4",
        "data": [
            { "x": "surprise", "y": 71 },
            { "x": "disgust", "y": 90 },
            { "x": "contempt", "y": 14 },
            { "x": "happiness", "y": 13 },
            { "x": "sadnesss", "y": 53 },
            { "x": "anger", "y": 5 },
            { "x": "fear", "y": 85 }
        ]
    },
    {
        "id": "5",
        "data": [
            { "x": "surprise", "y": 24 },
            { "x": "disgust", "y": 58 },
            { "x": "contempt", "y": 74 },
            { "x": "happiness", "y": 66 },
            { "x": "sadnesss", "y": 54 },
            { "x": "anger", "y": 79 },
            { "x": "fear", "y": 83 }
        ]
    },
    {
        "id": "6",
        "data": [
            { "x": "surprise", "y": 59 },
            { "x": "disgust", "y": 16 },
            { "x": "contempt", "y": 77 },
            { "x": "happiness", "y": 41 },
            { "x": "sadnesss", "y": 35 },
            { "x": "anger", "y": 54 },
            { "x": "fear", "y": 45 }
        ]
    }
]


  return (
    <div className="flex-grow p-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-white mb-3 p-5 rounded-xl">
              <div className="bg-white mb-10">
                <span className="text-2xl font-normal text-gray-900">
                  Hard Skills vs Soft Skills
                </span>
                <span className="text-xs uppercase text-gray-600"></span>
              </div>
              <div className="mt-5 pt-3" style={{ height: 500 }}>
                <ResponsiveHeatMap
                  data={data}
                  margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
                  valueFormat=">-.2s"
                  axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -90,
                    legend: "",
                    legendOffset: 46,
                  }}
                  axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Time",
                    legendPosition: "middle",
                    legendOffset: 70,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Time",
                    legendPosition: "middle",
                    legendOffset: -72,
                  }}
                  colors={{
                    type: "diverging",
                    scheme: "red_yellow_green",
                    divergeAt: 0.5,
                    minValue: 0,
                    maxValue: 100,
                  }}
                  emptyColor="#555555"
                  legends={[
                    {
                      anchor: "bottom",
                      translateX: 0,
                      translateY: 30,
                      length: 400,
                      thickness: 8,
                      direction: "row",
                      tickPosition: "after",
                      tickSize: 3,
                      tickSpacing: 4,
                      tickOverlap: false,
                      tickFormat: ">-.2s",
                      title: "Value →",
                      titleAlign: "start",
                      titleOffset: 4,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
