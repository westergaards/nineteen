import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { ViewName } from "../../App";
import "./ButtonBar.css";

export const ButtonBar = ({ onClick }) => {
  const [selected, setSelected] = useState("regions");

  const handleClick = (view) => {
    setSelected(view.toLowerCase());
    onClick(view);
  };

  return (
    <div className="button-container">
      <Button
        id="regions"
        variant="contained"
        onClick={() => handleClick(ViewName.REGIONS)}
        className={`button ${selected === "regions" ? "active" : null}`}
      >
        Regions
      </Button>

      <Button
        id="states"
        variant="contained"
        onClick={() => handleClick(ViewName.STATES)}
        className={`button ${selected === "states" ? "active" : null}`}
      >
        States
      </Button>

      <Button
        id="hospital"
        variant="contained"
        onClick={() => handleClick(ViewName.HOSPITAL)}
        className={`button ${selected === "hospital" ? "active" : null}`}
      >
        Hospitalization
      </Button>
    </div>
  );
};
