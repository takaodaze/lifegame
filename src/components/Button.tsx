import { Button as MuiButton } from "@mui/material";
import React from "react";

type Props = {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export const Button = (props: Props) => {
  return (
    <MuiButton
      variant="outlined"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </MuiButton>
  );
};
