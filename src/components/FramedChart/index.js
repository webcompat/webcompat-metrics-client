import React from "react";
import Proptypes from "prop-types";

// components
import AspectRatio from "../AspectRatio";

const FramedChart = ({ spreadsheetId, spreadsheetBaseUrl, spreadsheetEnd }) => {
  return (
    <AspectRatio>
      <iframe
        frameBorder="0"
        src={`${spreadsheetBaseUrl}${spreadsheetId}${spreadsheetEnd}`}
      />
    </AspectRatio>
  );
};

FramedChart.propTypes = {
  spreadsheetId: Proptypes.string.isRequired,
  spreadsheetBaseUrl: Proptypes.string.isRequired,
  spreadsheetEnd: Proptypes.string.isRequired,
};

export default FramedChart;
