import React from "react";
import { Wrapper, ProgressBar } from "./LineCharts.styles";

function LineCharts({ title, percentage, color }) {
  return (
    <Wrapper>
      <span>{title}</span>
      <ProgressBar color={color} percentage={percentage} />
    </Wrapper>
  )
};

export default LineCharts;
