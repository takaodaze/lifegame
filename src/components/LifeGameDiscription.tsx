import styled from "@emotion/styled";
import React from "react";
import { RuleDiagramSection } from "./RuleDiagramSection";
import { Spacer } from "./utils/Spacer";

export const LifeGameDiscription = () => {
  return (
    <Wrapper>
      <Title>{"Conway's Game of Life"}</Title>
      <Spacer height="50px" />
      <SubTitle>{"ライフゲーム"}</SubTitle>
      <Spacer height="20px" />
      <Content>
        {
          "1970年にイギリスの数学者ジョン・ホートン・コンウェイ (John Horton Conway) が考案した\n生命の誕生、進化、淘汰などのプロセスを簡易的なモデルで再現したシミュレーションゲームである。\n単純なルールでその模様の変化を楽しめるため、パズルの要素を持っている。"
        }
      </Content>
      <Spacer height="15px" />
      <Annotation>{"※ wikipediaより引用"}</Annotation>
      <Spacer height="50px" />
      <SubTitle>{"ルール"}</SubTitle>
      <Content>
        {
          "各セルには「生」と「死」の2つの状態がある。\nあるセルの次のステップ（世代）の状態は周囲の8つのセルの今の世代における状態により決定される。"
        }
      </Content>
      <Spacer height="30px" />
      {/* {window.outerWidth >= 1350 && ( */}
      <RuleDiaglamCard displayWidth={window.outerWidth}>
        <RuleDiagramSection type="born" />
        <RuleDiagramSection type="alive" />
        <RuleDiagramSection type="depopulation" />
        <RuleDiagramSection type="overcrowding" />
      </RuleDiaglamCard>
      {/* )} */}
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
});
const Title = styled.div({
  fontWeight: 700,
  fontFamily: "Helvetica",
  fontSize: "44px",
});

const SubTitle = styled.div({
  fontWeight: 700,
  fontSize: "24px",
});

const Content = styled.div({
  fontSize: "14px",
  lineHeight: "170%",
  whiteSpace: "pre-wrap",
});

const Annotation = styled.div({
  color: "#ccc",
  fontSize: "12px",
});

const RuleDiaglamCard = styled.div((props: { displayWidth: number }) => ({
  padding: "50px",
  background: "#26282d",
  borderRadius: "15px",
  display: "grid",
  gap: "50px",
  gridTemplateRows: `repeat(${props.displayWidth >= 1350 ? 2 : 1}, 1fr)`,
  gridTemplateColumns: `repeat(${props.displayWidth >= 1350 ? 2 : 1}, 1fr)`,
}));
