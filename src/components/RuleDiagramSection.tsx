import styled from "@emotion/styled";
import React from "react";
import { Spacer } from "./utils/Spacer";
import BornImage from "../images/Born.svg";
import AliveImage from "../images/Alive.svg";
import DepopulationImage from "../images/Depopulation.svg";
import OverCrowdingImage from "../images/Overcrowding.svg";

type Props = {
  type: "born" | "alive" | "depopulation" | "overcrowding";
};

export const RuleDiagramSection = (props: Props) => {
  const title = () => {
    switch (props.type) {
      case "born":
        return "誕生";
      case "alive":
        return "生存";
      case "depopulation":
        return "過疎";
      case "overcrowding":
        return "過密";
    }
  };
  const content = () => {
    switch (props.type) {
      case "born":
        return "死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。";
      case "alive":
        return "生きているセルに隣接する生きたセルが2つか3つならば、次の世代でも生存する。";
      case "depopulation":
        return "生きているセルに隣接する生きたセルが1つ以下ならば、過疎により死滅する。";
      case "overcrowding":
        return "生きているセルに隣接する生きたセルが4つ以上ならば、過密により死滅する。";
    }
  };
  const image = () => {
    switch (props.type) {
      case "born":
        return BornImage;
      case "alive":
        return AliveImage;
      case "depopulation":
        return DepopulationImage;
      case "overcrowding":
        return OverCrowdingImage;
    }
  };
  return (
    <Wrapper>
      <Title>{title()}</Title>
      <Spacer height="30px" />
      <img src={image()} />
      <Spacer height="20px" />
      <Content>{content()}</Content>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  opacity: 1,
});

const Title = styled.div({
  fontSize: "18px",
  fontWeight: 700,
  color: "#fff",
});

const Content = styled.div({
  fontSize: "14px",
});
