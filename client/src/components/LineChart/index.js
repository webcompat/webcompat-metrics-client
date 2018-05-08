import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const LineChart = props => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        fill: props.fill,
        lineTension: props.lineTension,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderCapStyle: props.borderCapStyle,
        borderDash: props.borderDash,
        borderDashOffset: props.borderDashOffset,
        borderJoinStyle: props.borderJoinStyle,
        pointBorderColor: props.pointBorderColor,
        pointBackgroundColor: props.pointBackgroundColor,
        pointBorderWidth: props.pointBorderWidth,
        pointHoverRadius: props.pointHoverRadius,
        pointHoverBackgroundColor: props.pointHoverBackgroundColor,
        pointHoverBorderColor: props.pointHoverBorderColor,
        pointHoverBorderWidth: props.pointHoverBorderWidth,
        pointRadius: props.pointRadius,
        pointHitRadius: props.pointHitRadius,
        data: props.data,
      },
    ],
  };
  return <Line data={data} />;
};

LineChart.propTypes = {
  labels: PropTypes.array.isRequired,
  label: PropTypes.string,
  fill: PropTypes.bool,
  lineTension: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderCapStyle: PropTypes.string,
  borderDash: PropTypes.array,
  borderDashOffset: PropTypes.number,
  borderJoinStyle: PropTypes.string,
  pointBorderColor: PropTypes.string,
  pointBackgroundColor: PropTypes.string,
  pointBorderWidth: PropTypes.number,
  pointHoverRadius: PropTypes.number,
  pointHoverBackgroundColor: PropTypes.string,
  pointHoverBorderColor: PropTypes.string,
  pointHoverBorderWidth: PropTypes.number,
  pointRadius: PropTypes.number,
  pointHitRadius: PropTypes.number,
  data: PropTypes.array.isRequired,
};

LineChart.defaultProps = {
  label: "issues: ",
  fill: false,
  lineTension: 0.1,
  backgroundColor: "rgba(75,192,192,0.4)",
  borderColor: "rgba(75,192,192,1)",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

export default LineChart;
