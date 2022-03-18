import { makeStyles, Theme } from "@material-ui/core";

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
  paper: (props: StyleProps) => ({
    height: "100%",
    backgroundColor: props.isDarkMode ? "#313131" : "#E0E0E0"
  })
}));
