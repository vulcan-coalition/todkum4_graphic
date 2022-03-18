// React Core
import React, { useContext } from "react";
// Component

// Styling
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "./style";
import { Box } from "../../main/Box";
// Common Utils
import { ThemeContext } from "../../../contexts/theme";
import { MarkSoundCategory } from "../../../models/markSound";
import CategorizableSoundList from "../CategorizableSoundList";

interface Props {
  markSound: MarkSoundCategory[];
  isAudioLoaded: boolean;
  setMarkSound: (markSound: MarkSoundCategory[]) => void;
  onEditMarkSound: (index: number, selected: MarkSoundCategory) => void;
  onAddMarkSound: () => void;
  onDeleteMarkSound: (index: number) => void;
}

const CategorizableBox: React.FC<Props> = (props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const classes = useStyles({ isDarkMode });

  return (
    <>
      <div className={classes.root}>
        <Box display="flex" alignItems="center" height="100%" mb={2}>
          <Box>
            <h2 className="wh2 my-0">เลือกประเภทของเสียง</h2>
            <p className="wp4 my-0">ระบุประเภทเสียงภายในเสียงย่อย</p>
          </Box>
          <Box mx={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={props.onAddMarkSound}
              disabled={!props.isAudioLoaded}
            >
              เพิ่มเสียง <AddIcon />
            </Button>
          </Box>
        </Box>

        <CategorizableSoundList
          markItems={props.markSound}
          onEdit={props.onEditMarkSound}
          onDelete={props.onDeleteMarkSound}
        />
      </div>
    </>
  );
};

export default CategorizableBox;
