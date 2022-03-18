import play from "../assets/images/play.png";
import stop from "../assets/images/pause.png";
import backwardMark from "../assets/images/backward_mark.png";
import forwardMark from "../assets/images/forward_mark.png";
import skipBackward from "../assets/images/skip_backward.png"
import skipForward from "../assets/images/skip_forward.png";
import backwardMarkActive from "../assets/images/backward_mark_active.png";
import forwardMarkActive from "../assets/images/forward_mark_active.png";

export const setPlayStopControl = (action: string) => {
    const elm = document.getElementById("play-stop") as HTMLImageElement;
    if (action === 'play') {
        elm.src = play;
    } else {
        elm.src = stop;
    }
};

export const setBackwardControl = (action: string) => {
    const elm = document.getElementById("skip-backward") as HTMLImageElement;
    if (action === 'backward') {
        elm.src = skipBackward;
        setTimeout(() => {
            elm.src = backwardMark;
        }, 400);
    } else {
        elm.src = backwardMarkActive;
        setTimeout(() => {
            elm.src = backwardMark;
        }, 400);
    }
};

export const setForwardControl = (action: string) => {
    const elm = document.getElementById("skip-forward") as HTMLImageElement;
    if (action === 'forward') {
        elm.src = skipForward;
        setTimeout(() => {
            elm.src = forwardMark;
        }, 400);
    } else {
        elm.src = forwardMarkActive;
        setTimeout(() => {
            elm.src = forwardMark;
        }, 400);
    }
};

export const getCurrentTime = () => {
    const audioPlayer = document.getElementsByTagName("audio");
    if (!audioPlayer) {
      throw new Error("audio doesn't exist");
    }
    let { currentTime } = audioPlayer[0];
    return currentTime
  }