import React from "react";
import { Bar, Chart } from "react-chartjs-2";

import {
  propTypes,
  defaultProps,
  hydrateData,
} from "../../propTypes/ChartPropTypes.js";
import { Container } from "../Chart";

class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Chart.pluginService.register({
      afterDraw: (chart, easing) => {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              // Draw the text in black, with the specified font
              ctx.fillStyle = "rgb(0, 0, 0)";
              const fontSize = 16;
              const fontStyle = "normal";
              const fontFamily = "Helvetica Neue";
              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily,
              );
              // Just naively convert to string for now
              const dataString = dataset.data[index].toString();
              // Make sure alignment settings are correct
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              const padding = 5;
              const position = element.tooltipPosition();
              ctx.fillText(
                dataString,
                position.x,
                position.y - fontSize / 2 - padding,
              );
            });
          }
        });
      },
    });
  }

  render() {
    const data = {
      ...hydrateData(this.props),
    };
    return (
      <Container title={this.props.title} subtitle={this.props.subtitle}>
        <Bar
          data={data}
          options={this.props.options}
          legend={this.props.legend}
        />
      </Container>
    );
  }
}

BarChart.propTypes = {
  ...propTypes,
};

BarChart.defaultProps = {
  ...defaultProps,
};

export default BarChart;
