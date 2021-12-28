import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { CellStatus } from "../types";
import { Button } from "./Button";
import { Cell } from "./Cell";

const FIELD_SIZE = 60;

export const Game = () => {
  const [generation, setGeneration] = useState(1);
  const [intervalId, setIntervalId] = useState(0);

  const [sizeY] = useState(FIELD_SIZE);
  const [sizeX] = useState(FIELD_SIZE);
  const [statusTable, setStatusTable] = useState<CellStatus[]>(
    [...Array(sizeX * sizeY)].map(() => "dead")
  );

  const detectAround = useCallback(
    (point: number, table: CellStatus[]) => {
      const aroundLife = [
        table[point - sizeX - 1],
        table[point - sizeX],
        table[point - sizeX + 1],
        table[point - 1],
        table[point + 1],
        table[point + sizeX - 1],
        table[point + sizeX],
        table[point + sizeX + 1],
      ];
      const detectLive = aroundLife.reduce(
        (prev, curr) => prev + (curr === "live" ? 1 : 0),
        0
      );
      return detectLive;
    },
    [sizeX]
  );

  const changeStatus = useCallback((index: number, status: CellStatus) => {
    setStatusTable((state) => state.map((s, i) => (i === index ? status : s)));
  }, []);

  const killAll = useCallback(() => {
    setStatusTable([...Array(sizeX * sizeY)].map(() => "dead"));
  }, [sizeX, sizeY]);

  const nextGeneration = useCallback(() => {
    setGeneration((g) => g + 1);
    setStatusTable((table) => {
      return table.map((s, i) => {
        const detectedLive = detectAround(i, table);
        if (s === "dead" && detectedLive === 3) {
          return "live";
        } else if (s === "live" && (detectedLive === 2 || detectedLive === 3)) {
          return "live";
        } else {
          return "dead";
        }
      });
    });
  }, [detectAround]);

  const setPreset = useCallback(() => {
    killAll();
    const basePoint = sizeX / 2 + (sizeY / 2) * sizeX;
    changeStatus(basePoint - sizeX, "live");
    changeStatus(basePoint - 1, "live");
    changeStatus(basePoint + sizeX - 1, "live");
    changeStatus(basePoint + sizeX, "live");
    changeStatus(basePoint + sizeX + 1, "live");
  }, [changeStatus, killAll, sizeX, sizeY]);

  const play = () => {
    if (intervalId === 0) {
      const intervalId = window.setInterval(() => {
        window.setTimeout(nextGeneration, 0);
      }, 100);
      setIntervalId(intervalId);
    }
  };
  const pause = () => {
    window.clearInterval(intervalId);
    setIntervalId(0);
  };

  useEffect(() => {
    return () => {
      window.clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <GameWrapper>
      <CellWrapper x={sizeX} y={sizeX}>
        {[...Array(sizeY * sizeX)].map((_, i) => {
          return (
            <Cell
              index={i}
              status={statusTable[i]}
              key={`cell_${i}`}
              changeStatus={changeStatus}
            />
          );
        })}
      </CellWrapper>

      <Generation>第 {generation} 世代</Generation>

      <ButtonWrapper>
        <Button onClick={play}>Start</Button>
        <Button onClick={pause}>pause</Button>
        <Button onClick={killAll}>reset</Button>
        <Button onClick={() => nextGeneration()}>next generation</Button>
        <Button onClick={() => setPreset()}>preset</Button>
      </ButtonWrapper>
    </GameWrapper>
  );
};

const GameWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const CellWrapper = styled.div((props: { x: number; y: number }) => ({
  display: "grid",
  gridTemplateRows: `repeat(${props.y}, 1fr)`,
  gridTemplateColumns: `repeat(${props.x}, 1fr)`,
  gap: "2px",
}));

const ButtonWrapper = styled.div({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
});

const Generation = styled.p({});
