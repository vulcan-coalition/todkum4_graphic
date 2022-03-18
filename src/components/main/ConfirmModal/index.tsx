import React, { useContext, useState } from "react";
import { Modal, Paper, Box, IconButton, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { autoSpeak } from "../../../plugins/Speak";

import { useStyles } from "./style";

import { ThemeContext } from "../../../contexts/theme";
interface Props {
  isOpen: boolean;
  title: string;
  desc?: string;
  mascot?: string;
  isCheckBox?: boolean;
  handleClose: () => void;
}

const ConfirmModal: React.FC<Props> = (props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const classes = useStyles({ isDarkMode });
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    localStorage.setItem("isClosed", event.target.checked.toString());
  };

  
  return (
    <>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        container={() => document.querySelector("#root") as HTMLElement}
      >
        <Paper className={classes.paperModal}>
          {(
            <IconButton
              className={classes.closeIcon}
              aria-label="ยกเลิก"
              onClick={props.handleClose}
              onFocus={() => {
                autoSpeak("ยกเลิก");
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Box justifyContent="center" display="flex">
            <Box p={4} textAlign="center">
              <Grid container alignItems="center">
                {props.mascot && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      style={{ height: "100%" }}
                      display="flex"
                      alignItems="center"
                    >
                      <img
                        src={props.mascot}
                        alt="mascot"
                        className={classes.mascotImg}
                      />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} sm={props.mascot ? 6 : 12}>
                  <h2 className="wh2" id="modal-title">
                    {props.title}
                  </h2>
                  <p className="wp2" id="modal-description">
                    {props.desc}
                  </p>
                  {props.isCheckBox && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                          onChange={handleChange}
                          checked={isChecked}
                          onFocus={() => {
                            autoSpeak("ไม่แสดงข้อความนี้อีก");
                          }}
                        />
                      }
                      label="ไม่แสดงข้อความนี้อีก"
                      labelPlacement="end"
                    />

                  )}
                  {props.children}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default ConfirmModal;
