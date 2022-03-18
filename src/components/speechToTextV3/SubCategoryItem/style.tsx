import { makeStyles, Theme } from "@material-ui/core";
interface StyleProps {
  isActive: boolean;
  color: string;
  isDarkMode?: boolean;
  isError?: boolean;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: (props: StyleProps) => ({
    maxWidth: "auto",
    border: props.isError ? "1px solid #FE9F9F" : ""
  }),
  item: (props: StyleProps) => ({
    borderRadius: 4,
    cursor: "pointer",
    color: props.isActive ? "#212121" : theme.palette.text.primary,
    backgroundColor: props.isDarkMode ? "#212121" : "#F0F0F0",
  }),
  active: (props: StyleProps) => ({
    backgroundColor: props.isActive ? props.color : "",
  }),
  activeInput: (props: StyleProps) => ({
    backgroundColor: props.isActive ? props.color : "",
  }),
  avatar: (props: StyleProps) => ({
    backgroundColor: props.isActive
      ? theme.palette.background.default
      : props.color,
    color: props.isActive ? theme.palette.text.primary : "#212121",
  }),
  input: {
    backgroundColor: "#FFFFFF",
    color: "#434343",
  },
  inputError: {
    color: "#B44949",
    border: "1px solid #B44949"
  },
  error: {
    color: "#B44949"
  }
}));
