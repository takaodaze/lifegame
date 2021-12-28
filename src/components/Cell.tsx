import styled from "@emotion/styled";
import React from "react";
import { CellStatus } from "../types";

const CELL_SIZE = "10px";

type Props = {
  index: number;
  status: CellStatus;
  changeStatus: (index: number, status: CellStatus) => void;
};
export const Cell = (props: Props) => {
  return (
    <CellComponent
      status={props.status}
      onClick={() =>
        props.changeStatus(
          props.index,
          props.status === "live" ? "dead" : "live"
        )
      }
    />
  );
};

const CellComponent = styled.div((props: { status: CellStatus }) => ({
  background: props.status === "live" ? "#52A44E" : "#171B21",
  width: CELL_SIZE,
  height: CELL_SIZE,
}));
