import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    height: "100%"
  },
  btnDelete: {
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "4px",
  },
}));
