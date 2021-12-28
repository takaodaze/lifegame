import styled from "@emotion/styled";
import React from "react";

export const LifeGameDiscription = () => {
  const discription = `
  ライフゲーム

  ライフゲーム (Conway's Game of Life) は

  1970年にイギリスの数学者ジョン・ホートン・コンウェイ (John Horton Conway) が

  考案した生命の誕生、進化、淘汰などのプロセスを
  
  簡易的なモデルで再現したシミュレーションゲームである。
  
  単純なルールでその模様の変化を楽しめるため、パズルの要素を持っている。
  
  ( wikipedia より引用 )
  `;

  const ruleText = `
  ライフゲームのルール

  各セルには「生」と「死」の2つの状態があり、
  あるセルの次のステップ（世代）の状態は周囲の8つのセルの今の世代における状態により決定される。

  誕生
  死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
  生存
  生きているセルに隣接する生きたセルが2つか3つならば、次の世代でも生存する。
  過疎
  生きているセルに隣接する生きたセルが1つ以下ならば、過疎により死滅する。
  過密
  生きているセルに隣接する生きたセルが4つ以上ならば、過密により死滅する。 
  `;
  return (
    <Wrapper>
      <Description>{discription}</Description>
      <Description>{ruleText}</Description>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
});
const Description = styled.div({ fontSize: 16, whiteSpace: "pre-line" });
