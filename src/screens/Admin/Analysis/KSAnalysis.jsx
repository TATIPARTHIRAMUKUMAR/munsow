import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import _mockChartData from "./EmotionSensing/_mockChartData.json";

const KSAnalysis = () => {
    const hardSkillData = [
        {
          "id": "Hard skill 1",
          "data": [
            { "x": "Department 1", "y": 50 },
            { "x": "Department 2", "y": 48 },
            { "x": "Department 3", "y": 31 },
            { "x": "Department 4", "y": 20 },
            { "x": "Department 5", "y": 0 },
            { "x": "Department 6", "y": 39 },
            { "x": "Department 7", "y": 86 }
          ]
        },
        {
          "id": "Hard skill 2",
          "data": [
            { "x": "Department 1", "y": 64 },
            { "x": "Department 2", "y": 10 },
            { "x": "Department 3", "y": 2 },
            { "x": "Department 4", "y": 11 },
            { "x": "Department 5", "y": 69 },
            { "x": "Department 6", "y": 85 },
            { "x": "Department 7", "y": 78 }
          ]
        },
        {
          "id": "Hard skill 3",
          "data": [
            { "x": "Department 1", "y": 56 },
            { "x": "Department 2", "y": 97 },
            { "x": "Department 3", "y": 36 },
            { "x": "Department 4", "y": 30 },
            { "x": "Department 5", "y": 54 },
            { "x": "Department 6", "y": 50 },
            { "x": "Department 7", "y": 25 }
          ]
        },
        {
          "id": "Hard skill 4",
          "data": [
            { "x": "Department 1", "y": 71 },
            { "x": "Department 2", "y": 90 },
            { "x": "Department 3", "y": 14 },
            { "x": "Department 4", "y": 13 },
            { "x": "Department 5", "y": 53 },
            { "x": "Department 6", "y": 5 },
            { "x": "Department 7", "y": 85 }
          ]
        },
        {
          "id": "Hard skill 5",
          "data": [
            { "x": "Department 1", "y": 24 },
            { "x": "Department 2", "y": 58 },
            { "x": "Department 3", "y": 74 },
            { "x": "Department 4", "y": 66 },
            { "x": "Department 5", "y": 54 },
            { "x": "Department 6", "y": 79 },
            { "x": "Department 7", "y": 83 }
          ]
        },
        {
          "id": "Hard skill 6",
          "data": [
            { "x": "Department 1", "y": 59 },
            { "x": "Department 2", "y": 16 },
            { "x": "Department 3", "y": 77 },
            { "x": "Department 4", "y": 41 },
            { "x": "Department 5", "y": 35 },
            { "x": "Department 6", "y": 54 },
            { "x": "Department 7", "y": 45 }
          ]
        }
      ]
      

    const softSkillData =[
        {
          "id": "Soft skill 1",
          "data": [
            { "x": "Department 1", "y": 50 },
            { "x": "Department 2", "y": 48 },
            { "x": "Department 3", "y": 31 },
            { "x": "Department 4", "y": 20 },
            { "x": "Department 5", "y": 10 },
            { "x": "Department 6", "y": 39 },
            { "x": "Department 7", "y": 86 }
          ]
        },
        {
          "id": "Soft skill 2",
          "data": [
            { "x": "Department 1", "y": 49 },
            { "x": "Department 2", "y": 84 },
            { "x": "Department 3", "y": 73 },
            { "x": "Department 4", "y": 93 },
            { "x": "Department 5", "y": 75 },
            { "x": "Department 6", "y": 10 },
            { "x": "Department 7", "y": 79 }
          ]
        },
        {
          "id": "Soft skill 3",
          "data": [
            { "x": "Department 1", "y": 56 },
            { "x": "Department 2", "y": 37 },
            { "x": "Department 3", "y": 36 },
            { "x": "Department 4", "y": 30 },
            { "x": "Department 5", "y": 54 },
            { "x": "Department 6", "y": 50 },
            { "x": "Department 7", "y": 25 }
          ]
        },
        {
          "id": "Soft skill 4",
          "data": [
            { "x": "Department 1", "y": 73 },
            { "x": "Department 2", "y": 90 },
            { "x": "Department 3", "y": 12 },
            { "x": "Department 4", "y": 13 },
            { "x": "Department 5", "y": 53 },
            { "x": "Department 6", "y": 5 },
            { "x": "Department 7", "y": 85 }
          ]
        },
        {
          "id": "Soft skill 5",
          "data": [
            { "x": "Department 1", "y": 24 },
            { "x": "Department 2", "y": 58 },
            { "x": "Department 3", "y": 74 },
            { "x": "Department 4", "y": 6 },
            { "x": "Department 5", "y": 54 },
            { "x": "Department 6", "y": 79 },
            { "x": "Department 7", "y": 83 }
          ]
        },
        {
          "id": "Soft skill 6",
          "data": [
            { "x": "Department 1", "y": 59 },
            { "x": "Department 2", "y": 16 },
            { "x": "Department 3", "y": 77 },
            { "x": "Department 4", "y": 41 },
            { "x": "Department 5", "y": 35 },
            { "x": "Department 6", "y": 54 },
            { "x": "Department 7", "y": 45 }
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
                  KS Analysis
                </span>
              </div>
              <div className="mt-5 pt-3" style={{ height: 500 }}>
              <span className="text-2xl font-normal text-gray-900">
                 Hard skills
                </span>
                <ResponsiveHeatMap
                  data={hardSkillData}
                  margin={{ top: 70, right: 90, bottom: 60, left: 90 }}
                  valueFormat=">-.2s"
                  axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -90,
                    legend: "",
                    legendOffset: 46,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Hard Skills",
                    legendPosition: "middle",
                    legendOffset: -80,
                  }}
                  colors={{
                    type: "sequential",
                    scheme: "greens",
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
                      title: "Department",
                      titleAlign: "start",
                      titleOffset: 4,
                    },
                  ]}
                />
              </div>
              <div className="mt-5 pt-3" style={{ height: 500 }}>
              <span className="text-2xl font-normal text-gray-900">
                 Soft skills
                </span>
                <ResponsiveHeatMap
                  data={softSkillData}
                  margin={{ top: 80, right: 90, bottom: 60, left: 90 }}
                  valueFormat=">-.2s"
                  axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -90,
                    legend: "",
                    legendOffset: 46,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Soft Skills",
                    legendPosition: "middle",
                    legendOffset: -85,
                  }}
                  colors={{
                    type: 'diverging',
                    scheme: "purples",
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
                      title: "Department",
                      titleAlign: "start",
                      titleOffset: 4,
                      colors: {
                        scheme: "red_yellow_blue",
                        divergeAt: 0.5,
                        minValue: 0,
                        maxValue: 100,
                      }
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

export default KSAnalysis;
