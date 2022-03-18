// React API
import React, { useContext } from "react";
// Styling
import { Grid, Avatar, Input } from "@material-ui/core";
import { Box } from "../../main/Box";
import { useStyles } from "./style";
// Common Utils
import { ThemeContext } from "../../../contexts/theme";
import { SpeechToTextV3Context } from "../../../contexts/speechToTextV3";
import {
  MarkSoundCategory,
  MarkSoundSubCategory,
} from "../../../models/markSound";

interface Props {
  selected: MarkSoundCategory;
}

const ShowSelectedItem: React.FC<Props> = (props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { soundCategory } = useContext(SpeechToTextV3Context);
  const classes = useStyles({ isDarkMode });

  const findIndexOfSubCategoryChild = (description: string): number => {
    let index = 0;
    if (soundCategory === undefined) return index;

    let category = soundCategory.choices;
    for (let i = 0; i < category.length; i++) {
      if (category[i].choices.length > 0) {
        let subCategory = category[i].choices;
        for (let j = 0; j < subCategory.length; j++) {
          if (subCategory[j].description === description) {
            return  Number(j) + 1;
          }
          let subCategoryChild = subCategory[j].choices;
          for (let k = 0; k < subCategoryChild?.length; k++) {
            if (subCategoryChild[k].description === description) {
              index = Number(k) + 1;
            }
          }
        }
      }
    }

    return index;
  };

  const getSubCategoryChildColor = (description: string): string => {
    
    let color = "";
    if (soundCategory === undefined) return color;
    
    let category = soundCategory.choices;
    for (let i = 0; i < category.length; i++) {
      if (category[i].choices.length > 0) {
        let subCategory = category[i].choices;
        for (let j = 0; j < subCategory.length; j++) {
          if (subCategory[j].description === description) {
            return  subCategory[j].color
          }
          let subCategoryChild = subCategory[j].choices;
          for (let k = 0; k < subCategoryChild?.length; k++) {
            if (subCategoryChild[k].description === description) {
              color = subCategoryChild[k].color;
            }
          }
        }
      }
    }

    return color;
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={props.selected.value.length === 0 ? 12 : 6}
          className={classes.cat}
        >
          <Box
            display="flex"
            alignItems="center"
            style={{ height: "100%" }}
            mb={1}
          >
            <Box p={1}>
              <Avatar alt="Remy Sharp" src="" className={classes.avatar}>
                {props.selected.description[0]}
              </Avatar>
            </Box>
            <Box p={1}>
              <h4 className="wh4 my-0">{props.selected.description}</h4>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            {props.selected.value?.filter((element: any) => element !== undefined).map(
              (subCategory: MarkSoundSubCategory, i: number) => (
                <Grid
                  item
                  xs={12}
                  key={i}
                  style={{
                    backgroundColor: `#${getSubCategoryChildColor(
                      subCategory.value.description
                    )}`,
                  }}
                  className={classes.subCat}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ height: "100%" }}
                    mb={1}
                  >
                    <Box p={1}>
                      <Avatar
                        alt="Remy Sharp"
                        src=""
                        className={classes.avatar}
                      >
                        {findIndexOfSubCategoryChild(
                          subCategory.value.description
                        )}
                      </Avatar>
                    </Box>
                    <Box p={1}>
                      <Box display="flex">
                        <Box>
                          <h4 className="wh4 my-0">
                            {subCategory.description}
                          </h4>
                          <p className="wp4 my-0">
                            {subCategory.value.description}
                            {subCategory.value.value && (
                             <strong style={{"wordBreak":"break-all"}}> { subCategory.value.value } </strong>
                            )}
                          </p>
                        </Box>

                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShowSelectedItem;
