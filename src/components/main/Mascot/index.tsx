import React, { useState, useEffect } from "react";

import hello from "../../../assets/images/mascot/hello.png";
import bye from "../../../assets/images/mascot/bye.png";
import congrats from "../../../assets/images/mascot/congrats.png";
import notification from "../../../assets/images/mascot/notification.png";

import {
  Grid,
  Slide,
} from "@material-ui/core";
import { soundEffect } from "../../../plugins/SoundEffect";

import { MascotMessage } from "../../../constants/mascotMessage";

import { useStyles } from "../Mascot/style";
interface Props {
  status: string;
  type: string;
}

const Mascot: React.FC<Props> = ({ status, type }) => {
  const classes = useStyles();
  const [image, setImage] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    switch (status) {
      case "hello": {
        const random = Math.floor(Math.random() * MascotMessage.hello.length);
        setImage(hello);
        setText(MascotMessage.hello[random]);
        if (localStorage.getItem("autoSpeaking") === "on") {
          const playsound =  soundEffect.helloMascot.play();
          playsound.then(_ => {("ตอนนี้อยู่หน้าหลัก");}).catch(error => {});
        }
        break;
      }
      case "bye": {
        const random = Math.floor(Math.random() * MascotMessage.bye.length);
        setImage(bye);
        setText(MascotMessage.bye[random]);
        if (localStorage.getItem("autoSpeaking") === "on") {
          soundEffect.byeMascot.play();
        }
        break;
      }
      case "congrats": {
        const random = Math.floor(
          Math.random() * MascotMessage.congrats.length
        );
        setImage(congrats);
        setText(MascotMessage.congrats[random]);
        if (localStorage.getItem("autoSpeaking") === "on") {
          soundEffect.congratMascot.play();
        }
        break;
      }
      case "interrupt": {
        const random = Math.floor(
          Math.random() * MascotMessage.interrupt.length
        );
        setImage(congrats);
        setText(MascotMessage.interrupt[random]);
        if (localStorage.getItem("autoSpeaking") === "on") {
          soundEffect.interruptErrorMascot.play();
        }
        break;
      }
      case "error": {
        const random = Math.floor(Math.random() * MascotMessage.error.length);
        setImage(congrats);
        setText(MascotMessage.error[random]);
        if (localStorage.getItem("autoSpeaking") === "on") {
          soundEffect.interruptErrorMascot.play();
        }
        break;
      }
      case "notification": {
        const random = Math.floor(
          Math.random() * MascotMessage.notification.length
        );
        setImage(notification);
        setText(MascotMessage.notification[random]);
        if (localStorage.getItem("autoSpeaking") === "on") {
          soundEffect.notification2Mascot.play();
        }
        break;
      }
    }
    setTimeout(() => {
      if (type !== "modal") {
        setShow(false);
      }
    }, 5000);
  }, [status]);

  return (
    <>
      {status && (
        <Slide direction="left" in={show} mountOnEnter unmountOnExit>
          <Grid container direction="column" justify="center">
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <p className={classes.message}>{text}</p>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              <img src={image} alt="mascots" width="110px" height="110px"></img>
            </Grid>
          </Grid>
        </Slide>
      )}
    </>
  );
};

export default Mascot;
