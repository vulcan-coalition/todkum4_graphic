import React, { useState, useEffect, useRef } from "react";
import speech from "../../../assets/images/logo_stt.svg";
import { autoSpeak, speak } from "../../../plugins/Speak";
import {
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";

interface Props {
  bookName?: string;
  chapterName?: string;
  totalTime: number;
  autoFocus?: boolean;
  appName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    subheader: {
      height: "80px",
    },
    listPadding: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  })
);

const SubHeader: React.FC<Props> = (props) => {
  const currentReview = JSON.parse(
    localStorage.getItem("currentReview") as string
  );
  const classes = useStyles();
  const subHeaderEl = useRef<HTMLElement | null>(null);

  let minTotalText = "";
  let secTotalText = "";

  if (props.totalTime) {
    let minTotal = Math.floor(props.totalTime / 60);
    let secTotal = Math.floor(props.totalTime - minTotal * 60);
    if (minTotal > 0) {
      minTotalText = `${minTotal}`;
    } else {
      minTotalText = `00`;
    }
    secTotalText = `${secTotal}`;
  }

  useEffect(() => {
    if (currentReview) {
      if (currentReview.isReviewMode) {
        return;
      }
    } else {
      if (props.autoFocus !== false) {
        const refTimeOut = setTimeout(() => {
          var subheader = document.getElementById("subheader") as HTMLElement;
          subheader?.focus();
        }, 500);
        return () => {
          clearTimeout(refTimeOut);
        };
      }
    }
  }, []);

  return (
    <div >
      <Grid
        id="subheader"
        innerRef={subHeaderEl}
        item
        container
        xs={12}
        direction="row"
        alignItems="center"
        tabIndex={5200}
        onFocus={() => {
          if (props.bookName) {
            autoSpeak(
              `${props.appName} ${props.bookName} ?????? ${props.chapterName} ???????????????????????????????????????????????????????????????????????????????????? ${minTotalText} ???????????? ${secTotalText} ??????????????????`
            );
          }
        }}
        onKeyDown={(e) => {
          if (props.bookName) {
            speak(
              e,
              `${props.appName} ${props.bookName} ?????? ${props.chapterName} ???????????????????????????????????????????????????????????????????????????????????? ${minTotalText} ???????????? ${secTotalText} ??????????????????`
            );
          }
        }}
      >
        <Grid
          item
          xs={12}
          onFocus={() => autoSpeak(props.appName)}
          onKeyDown={(e) => speak(e, props.appName)}
          container
          direction="row"
          justify="flex-start"
          style={{ height: "80px" }}
          alignItems="center"
        >
          <List dense={false} className={classes.listPadding}>
            <ListItem className={classes.listPadding}>
              <ListItemAvatar>
                <Avatar
                  className={classes.medium}
                  src={speech}
                  alt={props.appName}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText>
                <h1 className="wh1 my-0" >
                  {props.appName}
                </h1>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          // md={8}
          xs={12}
          onFocus={() =>
            autoSpeak(`????????? ${props.bookName} ??????????????? ${props.chapterName}`)
          }
          onKeyDown={(e) =>
            speak(e, `????????? ${props.bookName} ??????????????? ${props.chapterName}`)
          }
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{ height: "80px" }}
        >

          <Grid
            item
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid >
              <p
                className="wbp my-0"
                style={{ textAlign: "end" }}
                onFocus={() =>
                  autoSpeak(
                    `????????? ${props.bookName} ?????????????????? ${props.chapterName}`
                  )
                }
                onKeyDown={(e) =>
                  speak(
                    e,
                    `????????? ${props.bookName} ?????????????????? ${props.chapterName}`
                  )
                }
              >
                {props.bookName}
              </p>
            </Grid>
            <Grid >
              <p
                className="wbp my-0"
                onFocus={() => autoSpeak(`?????????????????? ${props.chapterName}`)}
                onKeyDown={(e) => speak(e, `?????????????????? ${props.chapterName}`)}
              >
                ??????????????? {props.chapterName} -{" "}
                {minTotalText.length === 1
                  ? `0${minTotalText}`
                  : minTotalText}
                :
                {secTotalText.length === 1
                  ? `0${secTotalText}`
                  : secTotalText}{" "}
                ????????????
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(SubHeader);
