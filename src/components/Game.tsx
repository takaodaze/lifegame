import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { GREEN } from "../color";
import { CellStatus } from "../types";
import { Button } from "./Button";
import { Cell } from "./Cell";
import { Spacer } from "./utils/Spacer";

const FIELD_SIZE = 55;

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
        } else if (s === "live" && detectedLive <= 1) {
          return "dead";
        } else if (s === "live" && detectedLive >= 4) {
          return "dead";
        } else {
          return "dead";
        }
      });
    });
  }, [detectAround]);

  const setPreset = useCallback(() => {
    killAll();
    const points = [
      1399, 1400, 1402, 1403, 1404, 1405, 1406, 1407, 1454, 1455, 1457, 1458,
      1459, 1460, 1461, 1462, 1509, 1510, 1564, 1565, 1571, 1572, 1619, 1620,
      1626, 1627, 1674, 1675, 1681, 1682, 1736, 1737, 1784, 1785, 1786, 1787,
      1788, 1789, 1791, 1792, 1839, 1840, 1841, 1842, 1843, 1844, 1846, 1847,
    ];
    setStatusTable((table) =>
      table.map((_, i) => (points.includes(i) ? "live" : "dead"))
    );
  }, [killAll]);

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

  const reset = () => {
    killAll();
    setGeneration(1);
  };

  useEffect(() => {
    return () => {
      window.clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <GameWrapper>
      <Generation>第 {generation} 世代</Generation>
      <Spacer height="5px" />
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

      <Spacer height="15px" />
      <ButtonWrapper>
        <Button onClick={play}>Start</Button>
        <Button onClick={pause}>pause</Button>
        <Button onClick={reset}>reset</Button>
        <Button onClick={() => nextGeneration()}>next generation</Button>
        <Button onClick={() => setPreset()}>preset</Button>
      </ButtonWrapper>
    </GameWrapper>
  );
};

const GameWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});

const CellWrapper = styled.div((props: { x: number; y: number }) => ({
  display: "grid",
  gridTemplateRows: `repeat(${props.y}, 1fr)`,
  gridTemplateColumns: `repeat(${props.x}, 1fr)`,
  gap: "2px",
}));

const ButtonWrapper = styled.div({
  width: "100%",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
});

const Generation = styled.span({
  fontWeight: 700,
  letterSpacing: "-.08rem",
  color: GREEN,
});
