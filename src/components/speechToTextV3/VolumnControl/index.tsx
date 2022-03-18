// React API
import React from "react";
// Styling
import { Grid, useTheme, Box } from "@material-ui/core";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import IconVolume from "../IconVolume";
import { useStyles } from "./style";
// Common Utils
import { autoSpeak, speak } from "../../../plugins/Speak";

interface Props {
  volume: number;
  handleVolumeChange: (level: number) => void;
}

const VolumeControl: React.FC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const unSelected = theme.palette.primary.main;
  const selected = theme.palette.primary.contrastText;
  const volumeList = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <>
      <div
        id="volume"
        tabIndex={6005}
        onFocus={() =>
          autoSpeak(
            `ระดับเสียง ${Number(props.volume.toFixed(1)) * 100} เปอร์เซ็นต์`
          )
        }
        onKeyDown={(e) =>
          speak(
            e,
            `ระดับเสียง ${Number(props.volume.toFixed(1)) * 100} เปอร์เซ็นต์`
          )
        }
      >
        <Grid container direction="row" alignItems="center">
          <VolumeUpOutlinedIcon
            aria-hidden={true}
          ></VolumeUpOutlinedIcon>
          {volumeList.map((val, i) => {
            return (
              <div
                key={i}
                className={classes.marginBtn}
                onClick={() => props.handleVolumeChange(val)}
                onKeyPress={() => props.handleVolumeChange(val)}
                onFocus={() => autoSpeak(`ระดับเสียง ${val.toString()}`)}
                onKeyDown={(e) => speak(e, `ระดับเสียง ${val.toString()}`)}
              >
                <IconVolume
                  aria-hidden={true}
                  color={props.volume >= val ? unSelected : selected}
                  height={(10 + 5 * (i + 1 - 1)).toString()}
                ></IconVolume>
              </div>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default React.memo(VolumeControl);
