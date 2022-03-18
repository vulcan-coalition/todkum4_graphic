import { makeStyles, Theme } from "@material-ui/core";

interface PropsStyle {
  isDarkMode: boolean | undefined;
}

export const useStyles = makeStyles<Theme, PropsStyle>((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));
