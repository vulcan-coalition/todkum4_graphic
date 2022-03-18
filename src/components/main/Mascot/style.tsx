import { makeStyles, createStyles, Theme } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      overflowWrap: "break-word",
      wordWrap: "break-word",
      hyphens: "auto",
      content: `''`,
      position: "relative",
      color: "black",
      width: "250px !important",
      height: "auto",
      minHeight: "50px",
      textAlign: "center",
      lineHeight: "45px",
      backgroundColor: "#fff",
      WebkitBorderRadius: "30px",
      MozBorderRadius: "30px",
      borderRadius: "60px",
      border: "15px solid #fff",
      "&::before": {
        content: `''`,
        position: "absolute",
        width: 0,
        height: 0,
        right: 0,
        top: "90%",
        transform: "rotate(90deg)",
        border: "20px solid",
        borderColor: " #fff transparent transparent #fff",
      },
    },
  })
);
