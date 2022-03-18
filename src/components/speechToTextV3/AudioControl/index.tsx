// React API
import React, { useRef, useState, useEffect, useContext } from "react";

// Component
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { autoSpeak, speak } from "../../../plugins/Speak";
import VolumnControl from "../VolumnControl";

// Styling
import { useStyles } from "./style";
import { Box, Grid } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { ChunkData } from "../../../models/audio";

import "../../../assets/scss/custom-audio-sttv3.scss";
import { SpeechToTextV3Context } from "../../../contexts/speechToTextV3";
import SpeedControl from "../SpeedControl";
import { GetCurrentBook, InitialData } from "../../../api/sttv3/SpeechToTextV3Api";
import { Book } from "../../../models/book";
import { LogInButton } from "../../../styles/style";
interface Props {
  action: string; // keyof ActionAudio -> play, pause, skipForward, skipBackward, ...
  url: string;
  srcAudio: any; // MARK waiting API
  setIsAudioLoaded: (isAudioLoaded: boolean) => void
  setIsCompleteAudio: (isCompleteAudio: boolean) => void
  setBookName: (book: Book) => void
  fileName: string | undefined;
}



const AudioControl: React.FC<Props> = (props) => {

  const audioEl = useRef<any>(null);
  const [volume, setVolume] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [speed, setSelectedSpeed] = useState<number>(1);
  const [url, setUrl] = useState<string>();
  const open = Boolean(anchorEl);
  const speedAvailable = [0.5, 1, 1.25, 1.5, 2];
  const volumeAvailable = [0.2, 0.4, 0.6, 0.8, 1];
  const classes = useStyles();
  const requestRef = useRef<any>();
  const timeStep = 3

 
  useEffect(() => {
    if (audioEl.current) {
      audioEl.current.audio.current.addEventListener(
        "loadedmetadata",
        () => {
          props.setIsAudioLoaded(true)
        },
        false
      );
    }
  }, [props]);


  useEffect(() => {
    if (audioEl.current) {
      audioEl.current.audio.current.addEventListener(
        "pause",
        () => {
          if (audioEl.current.audio.current.currentTime >= props.srcAudio.end) {
            props.setIsCompleteAudio(true)
          }
        },
        false
      );
    }
  }, [props]);




  useEffect(() => {
    if (props.srcAudio) {
      audioEl.current.audio.current.currentTime = props.srcAudio.start
    }
  }, [props.srcAudio]);


  useEffect(() => {
    if (props.action === "play" && getCurrentTime() < props.srcAudio.end) {
      onPlay();
    } else if (props.action === "pause" || props.action === "reset") {
      onPause();
    } else if (props.action === "skipForward") {
      onSkipForward();
      if (Number(audioEl.current.audio.current.currentTime).toFixed(5) >= Number(props.srcAudio.end).toFixed(5)) {
        props.setIsCompleteAudio(true)
      }
    } else if (props.action === "skipBackward") {
      onSkipBackward();
    } else if (props.action === "volumeUp") {
      const volumeIndex = volumeAvailable.indexOf(
        volumeAvailable[volumeAvailable.indexOf(volume) + 1]
      );
      if (volumeIndex === -1) {
        autoSpeak(`ความดังของไฟล์เสียงสูงสุดแล้ว`);
      } else {
        const volume = volumeAvailable[volumeIndex];
        setAudioVolume(volume);
        autoSpeak(`ระดับเสียง ${Number(volume.toFixed(1)) * 100} เปอร์เซ็นต์`);
      }
    } else if (props.action === "volumeDown") {
      const volumeIndex = volumeAvailable.indexOf(
        volumeAvailable[volumeAvailable.indexOf(volume) - 1]
      );
      if (volumeIndex === -1) {
        autoSpeak(`ความดังของไฟล์เสียงต่ำสุดแล้ว`);
      } else {
        const volume = volumeAvailable[volumeIndex];
        setAudioVolume(volume);
        autoSpeak(`ระดับเสียง ${Number(volume.toFixed(1)) * 100} เปอร์เซ็นต์`);
      }
    } else if (props.action === "speedUp") {
      const speedIndex = speedAvailable.indexOf(
        speedAvailable[speedAvailable.indexOf(speed) + 1]
      );
      if (speedIndex === -1) {
        autoSpeak(`ความเร็วของไฟล์เสียงสูงสุดแล้ว`);
      } else {
        const speed = speedAvailable[speedIndex];
        setAudioSpeed(speed);
        autoSpeak(`ความเร็วของไฟล์เสียง ${speed} เท่า`);
      }
    } else if (props.action === "speedDown") {
      const speedIndex = speedAvailable.indexOf(
        speedAvailable[speedAvailable.indexOf(speed) - 1]
      );
      if (speedIndex === -1) {
        autoSpeak(`ความเร็วของไฟล์เสียงต่ำสุดแล้ว`);
      } else {
        const speed = speedAvailable[speedIndex];
        setAudioSpeed(speed);
        autoSpeak(`ความเร็วของไฟล์เสียง ${speed} เท่า`);
      }
    }

    const trackCurrentTime = () => {
      if (audioEl.current) {
        let currentTime = getCurrentTime()
        if (currentTime >= props.srcAudio.end) {
          getAudioElement()?.pause();
          requestRef.current = null;
        } else if (props.action === "play" && currentTime <= props.srcAudio.end) {
          getAudioElement()?.play();
          requestRef.current = requestAnimationFrame(trackCurrentTime);
        }
      }
    };

    if (props.action === "play") {
      requestRef.current = requestAnimationFrame(trackCurrentTime);
    }

    return () => {
      cancelAnimationFrame(requestRef.current as number);
    };

  }, [props.action]);

  const getAudioElement = () => {
    return document.querySelector("audio");
  };

  const onPlay = () => {
    audioEl.current.audio.current.play();
  };

  const onPause = () => {
    audioEl.current.audio.current.pause();
  };

  const onSkipForward = () => {
    if (getCurrentTime() + timeStep >= props.srcAudio.end) {
      audioEl.current.audio.current.currentTime = props.srcAudio.end
    } else if (getCurrentTime() + timeStep <= props.srcAudio.start) {
      audioEl.current.audio.current.currentTime = props.srcAudio.start
    } else {
      audioEl.current.handleClickForward();
    }
  };

  const onSkipBackward = () => {
    if (getCurrentTime() - timeStep <= props.srcAudio.start) {
      audioEl.current.audio.current.currentTime = props.srcAudio.start
    } else if (getCurrentTime() - timeStep >= props.srcAudio.end) {
      audioEl.current.audio.current.currentTime = props.srcAudio.end
    } else {
      audioEl.current.handleClickRewind();
    }
  };

  const getCurrentTime = () => {
    if (!audioEl) return 0
    return audioEl.current.audio.current.currentTime
  }

  const setAudioSpeed = (speed: number) => {
    setSelectedSpeed(speed);
    audioEl.current.audio.current.playbackRate = speed;
  };

  const handleClickSpeed = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSpeedMenu = () => {
    setAnchorEl(null);
  };

  const handleSpeedChange = (speed: number) => {
    setAudioSpeed(speed);
  };

  const setAudioVolume = (volume: number) => {
    setVolume(volume);
    audioEl.current.audio.current.volume = volume;
  };



  return (
    <>
      <div className={classes.container}>
        <div id="audio-control" className={classes.fullHeight}>
          <Grid item xs={12} md={12} lg={12} >
            <h2
              aria-label="ไฟล์เสียงย่อย1"
              tabIndex={1000}
              onFocus={() => autoSpeak("ไฟล์เสียงย่อย1")}
              onKeyDown={(e) => speak(e, "ไฟล์เสียงย่อย1")}
              className="wh2 my-0"
            >
              {props.fileName}
            </h2>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <AudioPlayer
                src={props.url}
                ref={(e) => {
                  audioEl.current = e;
                }}
                progressJumpStep={3000}
                showSkipControls={false}
                showJumpControls={false}
                customAdditionalControls={[]}
                customVolumeControls={[]}

                // layout="horizontal-reverse"
                customProgressBarSection={[
                  RHAP_UI.MAIN_CONTROLS,
                  RHAP_UI.PROGRESS_BAR,
                  // <div style={{width: "5%"}}></div>,
                  // RHAP_UI.CURRENT_TIME,

                  // RHAP_UI.DURATION,
                ]}
                customControlsSection={[RHAP_UI.CURRENT_TIME, RHAP_UI.DURATION]}
                customIcons={{
                  play: <PlayArrowIcon fontSize="large" color="primary" />,
                  pause: <PauseIcon fontSize="large" color="primary" />,
                }}
                autoPlayAfterSrcChange={false}
                onListen={(event) => {
                  if (audioEl.current && (audioEl.current.audio.current.currentTime >= props.srcAudio.end || audioEl?.current.audio.current.currentTime <= props.srcAudio.start)) {
                    audioEl.current.audio.current.pause();
                  }
                }}
                listenInterval={250}
              />
            </Grid>



          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} md={6} lg={6} style={{ display: "flex", justifyContent: "flex-start" }} >
              <VolumnControl
                volume={volume}
                handleVolumeChange={setAudioVolume}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} style={{ display: "flex", justifyContent: "flex-end" }}>
              <SpeedControl
                anchorEl={anchorEl}
                handleClickSpeedMenu={handleClickSpeed}
                handleCloseSpeedMenu={handleCloseSpeedMenu}
                handleSpeedChange={handleSpeedChange}
                setAnchorEl={setAnchorEl}
                selectedSpeed={speed}
                open={open}
              />
            </Grid>
          </Grid>

        </div>
      </div>
    </>
  );
};

export default React.memo(AudioControl);
