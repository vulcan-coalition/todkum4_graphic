import { speech } from "../plugins/Speak";
export const handleKeyDescription = (event: any, username: string) => {
  if (event.altKey && event.keyCode === 80) {
    if (speech.isSpeaking) {
      speech.stop();
    } else {
      speech.speak("Vulcan Coalition", "en", (isSpeaking: boolean) => {
        if (!isSpeaking) {
          speech.speak(`ร่วมมือกับ${username}`, "th", (isSpeaking) => {
            if (!isSpeaking) {
              speech.speak("", "th", () => {});
            }
          });
        }
      });
    }
    event.preventDefault();
  }
  if (event.altKey && event.keyCode === 79) {
    if (localStorage.getItem("autoSpeaking") === "off") {
      speech.speak("เปิดเสียง", "th", () => {});
      localStorage.setItem("autoSpeaking", "on");
    } else if (localStorage.getItem("autoSpeaking") === "on") {
      speech.speak("ปิดเสียง", "th", () => {});
      setTimeout(() => {
        speech.stop();
      }, 2000);
      localStorage.setItem("autoSpeaking", "off");
    }
    event.preventDefault();
  }
};

export const handleAutoSpeakDescription = (username: string) => {
  if (localStorage.getItem("autoSpeaking") === "on") {
    speech.speak("Vulcan Coalition", "en", (isSpeaking: boolean) => {
      if (!isSpeaking) {
        speech.speak(`ร่วมมือกับ${username}`, "th", (isSpeaking) => {
          if (!isSpeaking) {
            speech.speak("", "th", () => {});
          }
        });
      }
    });
  }
};
