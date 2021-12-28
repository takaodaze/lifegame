import styled from "@emotion/styled";
import React, { FC } from "react";

export const GameFrame: FC = ({ children }) => {
  return <Frame displayWidth={window.outerWidth}>{children}</Frame>;
};

const Frame = styled.div((props: { displayWidth: number }) => ({
  display: "inline-block",
  border: "1px solid #31363C",
  padding: "20px",
  borderRadius: "15px",
  position: "relative",
  left: props.displayWidth <= 750 ? "210px" : 0,
}));
