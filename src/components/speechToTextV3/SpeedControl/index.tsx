import React from "react";
import { Button, Menu, MenuItem, Fade, Box } from "@material-ui/core";
import { autoSpeak, speak } from "../../../plugins/Speak";

interface Props {
  anchorEl: HTMLElement | null;
  handleClickSpeedMenu: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleCloseSpeedMenu: () => void;
  handleSpeedChange: (value: number) => void;
  setAnchorEl: (event: any) => void;
  selectedSpeed: number;
  open: boolean;
}

const SpeedControl: React.FC<Props> = (props) => {
  const speedList = [
    { speed: 0.5, display: "0.50x" },
    { speed: 1.0, display: "1.00x" },
    { speed: 1.25, display: "1.25x" },
    { speed: 1.5, display: "1.50x" },
    { speed: 2.0, display: "2.00x" },
    { speed: 2.5, display: "2.50x" },
    { speed: 3.0, display: "3.00x" },
  ];

  return (
    <>
      <Box tabIndex={-1}>
        <Button
          id="speed-btn"
          tabIndex={6003}
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={props.handleClickSpeedMenu}
          aria-label={`ความเร็วของไฟล์เสียง ${props.selectedSpeed}`}
          onFocus={() =>
            autoSpeak(`ความเร็วของไฟล์เสียง ${props.selectedSpeed}`)
          }
          onKeyDown={(e) => {
            speak(e, `ความเร็วของไฟล์เสียง ${props.selectedSpeed}`);
            e.keyCode === 13
              ? props.setAnchorEl(e.currentTarget)
              : props.setAnchorEl(null);
          }}
        >
          ความเร็วในการเล่นไฟล์เสียง
          <span
            aria-hidden={true}
            style={{ marginLeft: "20px", color: "#27AE60" }}
          >
            X{props.selectedSpeed}
          </span>
        </Button>
        <Menu
          tabIndex={-1}
          id="fade-menu"
          anchorEl={props.anchorEl}
          keepMounted
          open={props.open}
          onClose={props.handleCloseSpeedMenu}
          TransitionComponent={Fade}
        >
          {speedList.map((val, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => {
                  props.handleSpeedChange(val.speed);
                }}
                selected={props.selectedSpeed === val.speed ? true : false}
                onFocus={() => autoSpeak(val.speed.toString())}
                onKeyDown={(e) => {
                  speak(e, val.speed.toString());
                }}
              >
                {val.display}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </>
  );
};

export default SpeedControl;
