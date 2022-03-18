// React API
import React, { useContext } from "react";
// Styling
import { Avatar, FormControl, Input } from "@material-ui/core";
import { useStyles } from "./style";
import { Box } from "../../main/Box";
// Common Utils
import { ThemeContext } from "../../../contexts/theme";

interface Props {
  title: string;
  isActive: boolean;
  parentIndex: number;
  childIndex: number;
  type?: string;
  inputText: string | null;
  color: string;
  isError?: boolean | false;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterTextField: () => void;
}

const SubCategoryItem: React.FC<Props> = (props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const classes = useStyles({
    isActive: props.isActive,
    color: props.color,
    isDarkMode: isDarkMode,
    isError: props.isError,
  });

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.keyCode === 13) {
      props.onEnterTextField();
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div
          className={`${classes.item} ${props.type === "text" ? classes.activeInput : classes.active
            }`}
        >
          <Box display="flex" alignItems="center" style={{ height: "100%" }}>
            <Box p={1}>
              <Avatar alt="Remy Sharp" src="" className={classes.avatar}>
                <span>{props.childIndex + 1}</span>
              </Avatar>
            </Box>
            <Box p={1}>
              <h4 className="wh4 my-0">{props.title}</h4>
            </Box>
          </Box>
          {props.isActive && props.type === "text" && (
            <Box >
              <FormControl fullWidth={true}>
                {props.inputText === "" && (
                  <p className={`wp2 my-0  ${classes.error}`} style={{ marginLeft : "10px" } }>* กรุณาพิมในช่องข้อความ</p>
                )}
              <Input
                id={"input-choiec"}
                style={{ color: "#FFFFFF" ,backgroundColor : "#333333" , height: "10vh" }}
                autoFocus
                aria-describedby="my-helper-text"
                name={props.parentIndex + "," + props.childIndex}
                className={props.inputText === "" ? classes.inputError : classes.input}
                onChange={props.onChangeInput}
                onKeyDown={onKeyDown}
                value={props.inputText ? props.inputText : ""}
              />
            </FormControl>
            </Box>
          )}
      </div>
    </div>
    </>
  );
};

export default SubCategoryItem;
