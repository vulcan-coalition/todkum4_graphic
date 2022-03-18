import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  isDarkMode: boolean | undefined;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    border: "1px solid #FFF"
  },
  cat: (props: StyleProps) => ({
    backgroundColor: props.isDarkMode ? "#434343" : "#D5D5D5",
  }),
  subCat: {
    color: "#212121",
  },
  avatar: (props: StyleProps) => ({
    backgroundColor: props.isDarkMode ? "#ffffff" : "#434343",
    color: props.isDarkMode ? "#434343" : "#ffffff",
  }),
  input: {
    backgroundColor: "white !important",
    opacity: "1 !important",
    color: "#434343",
  },
}));
