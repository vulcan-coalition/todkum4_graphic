// React API
import React, { useState, useContext, useEffect } from "react";
// Styling
import { Avatar } from "@material-ui/core";
import { useStyles } from "./style";
import { Box } from "../../main/Box";
// Common Utils
import { ThemeContext } from "../../../contexts/theme";
interface Props {
  desc?: string;
  abbreviation: string;
  isActive: boolean;
  isError: boolean;
}

const CategoryItem: React.FC<Props> = (props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { isDarkMode } = useContext(ThemeContext);
  const classes = useStyles({
    isActive: props.isActive,
    isDarkMode: isDarkMode!,
    isError: props.isError
  });

  const handlePopoverOpen = () => {
    setIsHover(true);
  };

  const handlePopoverClose = () => {
    setIsHover(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Box
          className={`${classes.item} ${
            props.isActive ? classes.active : null
          }`}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          display="flex"
          alignItems="center"
          style={{ height: "100%" }}
          p={1}
        >
          <Box px={1}>
            <Avatar
              alt="Remy Sharp"
              src=""
              className={isHover ? classes.avatarHover : classes.avatar}
            >
              {props.abbreviation}
            </Avatar>
          </Box>
          <Box px={1}>
            <>
              <h4 className="wh4 my-0">{props.desc}</h4>
            </>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default CategoryItem;
