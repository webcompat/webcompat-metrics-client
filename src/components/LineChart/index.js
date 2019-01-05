import React from "react";
import { Line } from "react-chartjs-2";

import {
  propTypes,
  defaultProps,
  hydrateData,
} from "../../propTypes/ChartPropTypes.js";
import { Container } from "../Chart";

const LineChart = props => {
  const data = {
    ...hydrateData(props),
  };

  return (
    <Container title={props.title} subtitle={props.subtitle}>
      <Line data={data} options={props.options} legend={props.legend} />
    </Container>
  );
};

LineChart.propTypes = {
  ...propTypes,
};

LineChart.defaultProps = {
  ...defaultProps,
};

export default LineChart;
