import React from "react";
import { Bar } from "react-chartjs-2";

import {
  propTypes,
  defaultProps,
  hydrateData,
} from "../../propTypes/ChartPropTypes.js";
import { Container } from "../Chart";

const BarChart = props => {
  const data = {
    ...hydrateData(props),
  };
  return (
    <Container title={props.title} subtitle={props.subtitle}>
      <Bar data={data} options={props.options} legend={props.legend} />
    </Container>
  );
};

BarChart.propTypes = {
  ...propTypes,
};

BarChart.defaultProps = {
  ...defaultProps,
};

export default BarChart;
