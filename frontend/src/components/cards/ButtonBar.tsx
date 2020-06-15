import React from "react";
import { Button } from "@material-ui/core";
import { ViewName } from "../../App";
import "./ButtonBar.css";

export const ButtonBar = ({ onClick }) => {
  return (
    <div className="button-container">
      <Button
        variant="contained"
        onClick={() => onClick(ViewName.REGIONS)}
        className="button"
      >
        Regions
      </Button>

      <Button
        variant="contained"
        onClick={() => onClick(ViewName.STATES)}
        className="button"
      >
        States
      </Button>
    </div>
  );
};
