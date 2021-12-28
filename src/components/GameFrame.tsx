import styled from "@emotion/styled";
import React, { FC } from "react";

export const GameFrame: FC = ({ children }) => {
  return <Frame>{children}</Frame>;
};

const Frame = styled.div({
  display: "inline-block",
  border: "1px solid #31363C",
  padding: "20px",
  borderRadius: "15px",
});
