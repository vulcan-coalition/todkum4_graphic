import { makeStyles, Theme } from "@material-ui/core";

export interface StyleProps {
  isDarkMode: boolean | undefined;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  paper: (props: StyleProps) => ({
    position: "relative",
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0, 1, 0),
    border: `1px solid ${theme.palette.primary.main}`,
  }),
  avatar: {
    backgroundColor: "#F0F0F0",
    color: "#212121",
  },
  closeIcon: {
    position: "absolute",
    right: "0",
    top: "0",
    textAlign: "end",
    margin: theme.spacing(0, 1, 1, 1),
  },
  btnDelete: {
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "4px",
  },
  accordion: (props: StyleProps) => ({
    "&.MuiAccordion-root:before": {
      height: "0px",
    },
    backgroundColor: props.isDarkMode ? "#434343" : "#E0E0E0",
    padding: theme.spacing(1)
  }),
  accordionSum: {
    padding: 0,
  },
  accordionDetail: {
    padding: 0,
    display: "block",
  },
  error: {
    color: "#FE9F9F"
  }
}));
