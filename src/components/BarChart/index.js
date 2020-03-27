import React from "react";
import { Bar, Chart } from "react-chartjs-2";

import {
  propTypes,
  defaultProps,
  hydrateData,
} from "../../propTypes/ChartPropTypes.js";
import { Container } from "../Chart";

const pluginLabel = {
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach((element, index) => {
          // Draw the text in black, with the specified font
          ctx.fillStyle = "rgb(0, 0, 0)";
          const fontSize = "16";
          const fontStyle = "normal";
          const fontFamily =
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', sans-serif";
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          // Just naively convert to string for now
          const dataString = dataset.data[index].toString();
          // Make sure alignment settings are correct
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const padding = 15;
          const position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y + padding);
        });
      }
    });
  },
};

const BarChart = (props) => {
  const data = {
    ...hydrateData(props),
  };

  return (
    <Container title={props.title} subtitle={props.subtitle}>
      <Bar
        data={data}
        options={props.options}
        legend={props.legend}
        plugins={[pluginLabel]}
      />
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
