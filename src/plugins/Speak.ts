import { speakAPI } from "../constants";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { soundEffect } from "./SoundEffect";

interface ISpeak {
  (isSpeaking: boolean): void;
}

class speakText {
  audio: HTMLAudioElement = new Audio();
  isSpeaking: boolean = false;
  subject = new BehaviorSubject(this.audio);
  lastSub : any = null;
  speak = (value: string, lang: string, onSpeak: ISpeak) => {
    var speed = localStorage.getItem("speedVoiceOver");
    var volume = localStorage.getItem("volumeVoiceOver");
    this.audio.volume = volume? Number(volume) : 0.5;
    this.audio.defaultPlaybackRate = speed? Number(speed) : localStorage.getItem("type") === "stt" ? 2 : 1;
    if (!volume) {
      localStorage.setItem("volumeVoiceOver", this.audio.volume.toString())
    }
    if (!speed) {
      localStorage.setItem("speedVoiceOver", this.audio.defaultPlaybackRate.toString())
    }
    this.audio.onplay = () => {
      this.isSpeaking = true;
      onSpeak(this.isSpeaking);
    };
    this.audio.onended = () => {
      this.isSpeaking = false;
      onSpeak(this.isSpeaking);
    };
    lang = lang.length > 0 ? lang : "th";
    this.audio.src = `${speakAPI}?text=${value}&lang=${lang}`;

    if (this.lastSub != null) {
      this.lastSub.unsubscribe();
    }    
    this.subject.next(this.audio);
    this.lastSub = this.subject
      .pipe(
        switchMap((v) => {
          return v.play();
        })
      )
      .subscribe();
  };
  stop = () => {
    if (this.audio.play()) {
      this.audio.play().then(_ => {
        this.isSpeaking = false;
        this.audio.pause();
      })
    }
  };
}

export const speech = new speakText();

export const speak = (
  event: any,
  text: string = "",
  lang: string = "th",
  inputId: string = ""
) => {
  const inputText = document.getElementById(inputId) as HTMLInputElement;
  let selectionStart = inputText?.selectionStart ? inputText.selectionStart : 0;
  let selectionEnd = inputText?.selectionEnd ? inputText.selectionEnd : 0;
  if (event.keyCode === 37) {
    text = inputText?.value?.substring(selectionEnd - 1, selectionEnd);
    if (text) {
      autoSpeak(text, lang);
    }
  }
  if (event.keyCode === 39) {
    text = inputText?.value?.substring(selectionStart, selectionStart + 1);
    if (text) {
      autoSpeak(text, lang);
    }
  }
  if (event.keyCode === 8) {
    soundEffect.eraseText.play();
    if (text[0] !== undefined && text[text.length - 1].length > 0) {
      let textDeleted = inputText?.value?.substring(
        selectionEnd - 1,
        selectionEnd
      );
      autoSpeak(textDeleted, "th");
    }
  }
  if (event.keyCode === 46) {
    soundEffect.eraseText.play();
    if (text[0] !== undefined && text[text.length - 1].length > 0) {
      let textDeleted = inputText?.value?.substring(
        selectionEnd + 1,
        selectionEnd
      );
      autoSpeak(textDeleted, "th");
    }
  }
  if (event.altKey && event.keyCode === 80) {
    const inputSelect = inputText?.value?.substring(
      selectionStart,
      selectionEnd
    );
    text = inputSelect?.length > 0 ? inputSelect : text;
    if (speech.isSpeaking) {
      speech.stop();
    } else {
      if (text.length > 120) {
        let firstText = text.substring(0, 120);
        let secondText = text.substring(120, text.length);
        speech.speak(firstText, lang, (isSpeaking) => {
          if (!isSpeaking) {
            speech.speak(secondText, lang, () => {});
          }
        });
      } else if (text.length !== 0) {
        speech.speak(text, lang, () => {});
      }
    }
    event.preventDefault();
  }
  if (event.altKey && event.keyCode === 79) {
    if (localStorage.getItem("autoSpeaking") === "off") {
      speech.speak("เปิดเสียง", "th", () => {})
      localStorage.setItem("autoSpeaking", "on");
    } else if (localStorage.getItem("autoSpeaking") === "on") {
      speech.speak("ปิดเสียง", "th", () => {})
      setTimeout(()=>{
        speech.stop();
      },2000)
      localStorage.setItem("autoSpeaking", "off");
    }
    event.preventDefault();
  }
};

export const speakWithoutHelper = (
  event: any,
  text: string = "",
  lang: string = "th",
  inputId: string = ""
) => {
  if (event.altKey && event.keyCode === 80) {
    if (speech.isSpeaking) {
      speech.stop();
    } else {
      speech.speak(text, lang, () => {});
    }
    event.preventDefault();
  }
  if (event.altKey && event.keyCode === 79) {
    if (localStorage.getItem("autoSpeaking") === "off") {
      speech.speak("เปิดเสียง", "th", () => {})
      localStorage.setItem("autoSpeaking", "on");
    } else if (localStorage.getItem("autoSpeaking") === "on") {
      speech.speak("ปิดเสียง", "th", () => {})
      setTimeout(()=>{
        speech.stop();
      },2000)
      localStorage.setItem("autoSpeaking", "off");
    }
    event.preventDefault();
  }
};

export const autoSpeak = (text: string, lang: string = "th", isIgnoreAutoSpeak?: boolean) => {
  if (localStorage.getItem("autoSpeaking") === "on" || isIgnoreAutoSpeak) {
    speech.speak(text, lang, () => {});
  }
};
