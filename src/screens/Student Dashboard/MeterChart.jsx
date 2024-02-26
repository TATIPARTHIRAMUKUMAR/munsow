import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import "./MeterChart.css";

highchartsMore(Highcharts);

const MeterChart = () => {
  useEffect(() => {
    const initializeChart = (containerId, title, data) => {
      Highcharts.chart(containerId, {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: "80%",
        },
        title: {
          text: title,
        },
        pane: {
          startAngle: -90,
          endAngle: 90,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },
        yAxis: {
          min: 0,
          max: 10,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            format: "",
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: data,
              color: "#2BE2D0",
              thickness: 50,
            },
            {
              from: data,
              to: 10,
              color: "#CCCCCC",
              thickness: 50,
            },
          ],
        },
        series: [
          {
            name: title,
            data: [data],
            tooltip: {
              valueSuffix: "/10",
            },
            dataLabels: {
              format: "{y}/10",
              borderWidth: 0,
              color:
                (Highcharts.defaultOptions.title &&
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "#333333",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
            },
          },
        ],
      });

      setInterval(() => {
        const chart = Highcharts.charts.find(
          (chart) => chart.renderTo.id === containerId
        );
        if (chart && !chart.renderer.forExport) {
          const point = chart.series[0].points[0];
          const inc = Math.round((Math.random() - 0.5) * 2);

          let newVal = point.y + inc;
          if (newVal < 0 || newVal > 10) {
            newVal = point.y - inc;
          }

          point.update(newVal);
        }
      }, 3000);
    };

    initializeChart("mindsetContainer", "Mindset/Attitude", 9);
    initializeChart("domainContainer", "Domain", 6);
    initializeChart("practicalThinkingContainer", "Practical Thinking", 8);

    return () => clearInterval();
  }, []);

  return (
    // <figure class="highcharts-figure ">
    <div className="meterchart" id="container">
      <div id="mindsetContainer" className="meter"></div>
      <div id="domainContainer" className="meter"></div>
      <div id="practicalThinkingContainer" className="meter"></div>
    </div>
    // </figure>
  );
};

export default MeterChart;
