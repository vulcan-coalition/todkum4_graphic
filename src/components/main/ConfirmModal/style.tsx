import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  isDarkMode: boolean | undefined;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "8px",
  },
  paperModal: (props: StyleProps) => ({
    position: "relative",
    maxWidth: 480,
    borderRadius: "24px",
    border: "2px solid",
    borderColor: theme.palette.secondary.main,
    backgroundColor: props.isDarkMode ? "#212121" : "#F0F0F0",
  }),
  closeIcon: {
    position: "absolute",
    right: "0",
    textAlign: "end",
  },
  mascotImg: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    height: "auto",
    maxWidth: "170px",
  },
}));
