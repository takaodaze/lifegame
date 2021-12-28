import styled from "@emotion/styled";
import React from "react";

type Props = {
  height?: string;
  width?: string;
};
export const Spacer = (props: Props) => {
  return <SpacerDiv height={props.height} width={props.width} />;
};

const SpacerDiv = styled.div((props: { height?: string; width?: string }) => ({
  height: props.height ?? 0,
  width: props.width ?? 0,
}));
