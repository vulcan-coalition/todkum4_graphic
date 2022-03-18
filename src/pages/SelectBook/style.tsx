import { makeStyles, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

interface StyleProps {
  isDarkMode: boolean | undefined;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  container: {
    padding: theme.spacing(2, 0, 2, 0),
  },
  categorizableBox: {
    height: "auto",
    minHeight: "70vh",
    marginTop: "20px",
    padding: theme.spacing(2, 0, 2, 0),
  },
  audioControl: {
    height: "10%",
    padding: theme.spacing(2, 0, 2, 0),
  },
  item: (props: StyleProps) => ({
    backgroundColor: props.isDarkMode ? "#212121" : "#F0F0F0",
    borderStyle: "solid",
    borderColor: props.isDarkMode ? "#F0F0F0" : "#868787",
    borderWidth: "1px",
    borderRadius: 4,
    cursor: "pointer",
  }),
  root: (props: StyleProps) => ({
    height: "10%",
    padding: theme.spacing(2, 0, 2, 0),
  }),
  paper: (props: StyleProps) => ({
    height: "100%",
    width: "100%",
    backgroundColor: props.isDarkMode ? "#313131" : "#E0E0E0"
  })

}));
