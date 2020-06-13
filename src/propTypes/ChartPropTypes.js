import PropTypes from "prop-types";

export const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
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
  legend: PropTypes.object,
  options: PropTypes.object,
  multiple: PropTypes.bool,
};

export const defaultProps = {
  label: "issues: ",
  fill: false,
  lineTension: 0.1,
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  borderColor: "#71B37C",
  backgroundColor: "#71B37C",
  pointBorderColor: "#71B37C",
  pointBackgroundColor: "#71B37C",
  pointHoverBackgroundColor: "#71B37C",
  pointHoverBorderColor: "#71B37C",
  pointHoverBorderWidth: 2,
  pointRadius: 0,
  pointHitRadius: 10,
  options: {},
  multiple: false,
};

export const hydrateData = (props) => {
  return {
    labels: props.labels,
    datasets: props.multiple
      ? props.data.map((dataset) => {
          return {
            ...dataset,
            ...getHydrateOptionList({ ...props, ...dataset }),
          };
        })
      : [
          {
            label: props.label,
            data: props.data,
            ...getHydrateOptionList(props),
          },
        ],
  };
};

const getHydrateOptionList = (props) => {
  return {
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
  };
};
