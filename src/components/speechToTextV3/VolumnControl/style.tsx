import { makeStyles, Theme, createStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginBtn: {
      marginLeft: "5px",
      width: "10px",
      cursor: "pointer",
    }
  })
);
