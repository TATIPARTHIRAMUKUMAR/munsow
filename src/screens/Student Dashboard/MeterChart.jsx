import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);

const MeterChart = (props) => {
    const { title, score, container, color } = props;

  useEffect(() => {
    const initializeChart = () => {
      Highcharts.chart(container, {
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
        // the value axis
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
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: score,
              color: color,
              thickness: 50,
            },
            {
              from: score,
              to: 10,
              color: "#e5e5e5",
              thickness: 50,
            },
          ],
        },
        series: [
          {
            name: title,
            data: [score],
            color: color,
            tooltip: {
              valueSuffix: " /10",
            },
            dataLabels: {
              format: "{y} /10",
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
    };

    initializeChart();

    // // Add some life
    // setInterval(() => {
    //   const chart = Highcharts.charts[0];
    //   if (chart && !chart.renderer.forExport) {
    //     const point = chart.series[0].points[0];
    //     const inc = Math.round((Math.random() - 0.5) * 2);

    //     let newVal = point.y + inc;
    //     if (newVal < 0 || newVal > 10) {
    //       newVal = point.y - inc;
    //     }

    //     point.update(newVal);
    //   }
    // }, 3000);

    // return () => clearInterval();
  }, [score]);

  return (
    <div className="meterchart">
      <figure className="highcharts-figure">
        <div id={`${container}`}></div>
      </figure>
    </div>
  );
};

export default MeterChart;
