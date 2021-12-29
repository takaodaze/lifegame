import styled from "@emotion/styled";
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { GREEN } from "../color";
import { CellStatus } from "../types";
import { Button } from "./Button";
import { Cell } from "./Cell";
import { Spacer } from "./utils/Spacer";
import {
  ExpandMore,
  PlayArrowOutlined,
  PauseOutlined,
  RestartAltOutlined,
  SkipNextOutlined,
} from "@mui/icons-material";

type PresetType =
  | ""
  | "glider"
  | "galaxy"
  | "5*5"
  | "glider-gun"
  | "donguri"
  | "online";

const FIELD_SIZE = 55;

export const Game = () => {
  const [generation, setGeneration] = useState(1);
  const [intervalId, setIntervalId] = useState(0);
  const [openPresetMenu, setOpenPresetMenu] = useState(false);

  const [sizeY] = useState(FIELD_SIZE);
  const [sizeX] = useState(FIELD_SIZE);
  const [statusTable, setStatusTable] = useState<CellStatus[]>(
    [...Array(sizeX * sizeY)].map(() => "dead")
  );

  const detectAround = useCallback(
    (point: number, table: CellStatus[]) => {
      let aroundLife: CellStatus[] = [];
      if (point % sizeX === 0) {
        aroundLife = [
          table[point - sizeX],
          table[point - sizeX + 1],
          table[point + 1],
          table[point + sizeX],
          table[point + sizeX + 1],
        ];
      } else if (point % sizeX === sizeX - 1) {
        aroundLife = [
          table[point - sizeX - 1],
          table[point - sizeX],
          table[point - 1],
          table[point + sizeX - 1],
          table[point + sizeX],
        ];
      } else {
        aroundLife = [
          table[point - sizeX - 1],
          table[point - sizeX],
          table[point - sizeX + 1],
          table[point - 1],
          table[point + 1],
          table[point + sizeX - 1],
          table[point + sizeX],
          table[point + sizeX + 1],
        ];
      }

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

  const setPreset = useCallback(
    (presetType: PresetType) => {
      killAll();
      let points: number[] = [];
      switch (presetType) {
        case "galaxy":
          points = [
            1399, 1400, 1402, 1403, 1404, 1405, 1406, 1407, 1454, 1455, 1457,
            1458, 1459, 1460, 1461, 1462, 1509, 1510, 1564, 1565, 1571, 1572,
            1619, 1620, 1626, 1627, 1674, 1675, 1681, 1682, 1736, 1737, 1784,
            1785, 1786, 1787, 1788, 1789, 1791, 1792, 1839, 1840, 1841, 1842,
            1843, 1844, 1846, 1847,
          ];
          break;
        case "glider":
          points = [
            282, 338, 391, 392, 393, 593, 647, 702, 703, 704, 1512, 1566, 1621,
            1622, 1623, 2046, 2102, 2155, 2156, 2157,
          ];
          break;
        case "5*5":
          points = [
            1400, 1401, 1402, 1404, 1455, 1513, 1514, 1566, 1567, 1569, 1620,
            1622, 1624,
          ];
          break;
        case "glider-gun":
          points = [
            254, 307, 309, 352, 353, 360, 361, 374, 375, 406, 410, 415, 416,
            429, 430, 450, 451, 460, 466, 470, 471, 505, 506, 515, 519, 521,
            522, 527, 529, 570, 576, 584, 626, 630, 682, 683,
          ];
          break;
        case "donguri":
          points = [
            505, 562, 614, 615, 618, 619, 620, 806, 863, 915, 916, 919, 920,
            921, 1389, 1446, 1498, 1499, 1502, 1503, 1504, 2124, 2125, 2128,
            2129, 2130, 2182, 2235, 2592, 2649, 2701, 2702, 2705, 2706, 2707,
          ];
          break;
        case "online":
          points = [
            1382, 1383, 1384, 1385, 1386, 1387, 1388, 1389, 1391, 1392, 1393,
            1394, 1395, 1399, 1400, 1401, 1408, 1409, 1410, 1411, 1412, 1413,
            1414, 1416, 1417, 1418, 1419, 1420,
          ];
      }
      setStatusTable((table) =>
        table.map((_, i) => (points.includes(i) ? "live" : "dead"))
      );
    },
    [killAll]
  );

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
  const isPlaying = () => (intervalId === 0 ? false : true);
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
        <MuiButton
          onClick={() => (isPlaying() ? pause() : play())}
          startIcon={isPlaying() ? <PauseOutlined /> : <PlayArrowOutlined />}
          variant="outlined"
          sx={{ minWidth: "120px" }}
        >
          {isPlaying() ? "ストップ" : "プレイ"}
        </MuiButton>
        <MuiButton
          onClick={nextGeneration}
          startIcon={<SkipNextOutlined />}
          variant="outlined"
          sx={{ minWidth: "120px" }}
        >
          ステップ
        </MuiButton>
        <MuiButton
          onClick={reset}
          startIcon={<RestartAltOutlined />}
          variant="outlined"
          sx={{ minWidth: "120px" }}
        >
          リセット
        </MuiButton>
      </ButtonWrapper>
      <Spacer height="20px" />
      <div style={{ width: "100%" }}>
        <Accordion
          expanded={openPresetMenu}
          onChange={(event, isExpanded) => setOpenPresetMenu(isExpanded)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>プリセット</Typography>
          </AccordionSummary>
          <AccordionActions>
            <Button onClick={() => setPreset("galaxy")}>銀河</Button>
            <Button onClick={() => setPreset("glider")}>グライダー</Button>
            <Button onClick={() => setPreset("5*5")}>繁殖型1</Button>
            <Button onClick={() => setPreset("online")}>繁殖型2</Button>
            <Button onClick={() => setPreset("donguri")}>ドングリ</Button>
            <Button onClick={() => setPreset("glider-gun")}>
              グライダーガン
            </Button>
          </AccordionActions>
        </Accordion>
      </div>
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
  display: "flex",
  gap: "15px",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const Generation = styled.span({
  fontWeight: 700,
  letterSpacing: "-.08rem",
  color: GREEN,
});
