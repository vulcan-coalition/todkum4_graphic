import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  isActive: boolean;
  isDarkMode: boolean;
  isError: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: (props: StyleProps) => ({
    maxWidth: "auto",
    margin: theme.spacing(1, 0, 0, 0),
    border: props.isError ? "1px solid #FE9F9F" : ""
  }),
  item: (props: StyleProps) => ({
    backgroundColor: props.isDarkMode ? "#212121" : "#F0F0F0",
    borderStyle: props.isActive ? "solid" : "",
    borderColor: props.isDarkMode ? "#F0F0F0" : "#868787",
    borderWidth: "1px",
    borderRadius: 4,
    cursor: "pointer",
  }),
  avatar: {
    backgroundColor: "#C4C4C4",
    color: "#212121",
  },
  avatarHover: {
    backgroundColor: theme.palette.primary.main,
  },
  active: (props: StyleProps) => ({
    backgroundColor: props.isDarkMode ? "#434343" : "#D5D5D5",
  }),
}));
