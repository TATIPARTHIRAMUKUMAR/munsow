import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'; // Import the export module
import { useSelector } from 'react-redux';


// Initialize the export module
HC_exporting(Highcharts);

const LineChart = () => {

    const { userStats } = useSelector((state) => state.data);

    const [data, setData] = useState([]);

    console.log("data222", data, userStats)

    useEffect(() => {
        Highcharts.chart('container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'My Interview Score Trend'
            },
            subtitle: {
                text: 'Source: ' +
                    '<a href="https://www.munsow.com/" ' +
                    'target="_blank">Munsow.com</a>'
            },
            xAxis: {
                // min: 1,
                // startsWith: 1, 
                // categories: ["1","2","3","4","5"], // Use categories from series
                accessibility: {
                    description: 'Number of Interviews'
                },
                title: {
                    text: 'Number of Interviews'
                }
            },
            yAxis: {
                title: {
                    text: 'Interview Scores'
                },
                labels: {
                    format: '{value}'
                },               
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                },
                series: {
                    pointStart: 1,
                }
            },
            series: [{
                name: 'Mindset/Attitude',
                color: "#d1a5d3",
                marker: {
                    symbol: 'circle'
                },
                data: [2, 5, 7, 7, 8]
        
            }, {
                name: 'Knowledge/Skills',
                color: "#97e97d",
                marker: {
                    symbol: 'circle'
                },
                data: [4, 6, 8, 4, 6]
            }, {
                name: 'Practical Thinking',
                color: "#fbbd74",
                marker: {
                    symbol: 'circle'
                },
                data: [3, 4, 6, 8, 10]
            }]
        });
    }, []);

    return (
        <figure className="highcharts-figure">
            <div id="container"></div>
            <p className="highcharts-description p-5 text-center font-bold">
                This chart illustrates the trend of your interview scores across your interviews.
            </p>
        </figure>
    );

};
export default LineChart;