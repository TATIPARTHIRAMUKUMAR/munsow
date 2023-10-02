import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label
} from "recharts";
import _mockChartData from "./EmotionSensing/_mockChartData.json";

const BehaviourAnalysis = () => {
    const legendFormatter = (value, entry) => {
        return (
            <div className={"flex items-center"}>
                <div className={"h-4 w-4 mr-2"} style={{ backgroundColor: entry.color }} />
                <div>{value}</div>
            </div>
        );
    };

    return (
        <div className="flex-grow p-5">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <div className="bg-white mb-3 p-5 rounded-xl">
                            <div className="bg-white mb-10">
                                <span className="text-2xl font-normal text-gray-900">
                                    Bevaiour Analysis
                                </span>
                                <span className="text-xs uppercase text-gray-600"></span>
                            </div>
                            <div className="mt-5 pt-3">
                                <ResponsiveContainer width="100%" height={480}>
                                    <LineChart
                                        data={_mockChartData}
                                        margin={{
                                            top: 20,
                                            right: 50,
                                            left: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} strokeDasharray="0 0" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            interval={0}
                                            dy={10}
                                            dx={20}
                                        >
                                            <Label
                                                value="TIME"
                                                position="bottom"
                                                dy={20}
                                            />
                                        </XAxis>
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            dx={-5}
                                        >
                                            <Label
                                                value="EMOTIONS"
                                                position="middle"
                                                angle={-90}
                                                dx={-30}
                                            />
                                        </YAxis>
                                        <Tooltip />
                                        <Legend
                                            formatter={(value, entry) =>
                                                legendFormatter(value, entry)
                                            }
                                            layout="horizontal"
                                            iconSize={0}
                                            wrapperStyle={{
                                                width: "95%",
                                                left: '50px',
                                                marginBottom: '20px',
                                                top: '-50px'
                                            }}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="surprise"
                                            stroke="#AFDFEF"
                                            strokeWidth={4}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="disgust"
                                            stroke="#E1885E"
                                            strokeWidth={4}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="contempt"
                                            stroke="#6B2F6B"
                                            strokeWidth={4}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="happiness"
                                            stroke="#9F9A8F"
                                            strokeWidth={4}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="sadnesss"
                                            stroke="#669548"
                                            strokeWidth={4}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="anger"
                                            stroke="#596EF2"
                                            strokeWidth={4}
                                        />
                                        <Line
                                            type="basic"
                                            dataKey="fear"
                                            stroke="#000000"
                                            strokeWidth={4}
                                        />
                                        {/* ...rest of the lines for the LineChart */}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BehaviourAnalysis;
