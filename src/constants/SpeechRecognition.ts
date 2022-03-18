declare var webkitSpeechRecognition: any;

class VoiceRecognitionService {
  private recognition: SpeechRecognition;
  isStoppedSpeechRecog = false;
  public text = "";
  tempWords: string = "";

  constructor() {
    this.recognition = new window.SpeechRecognition();
  }

  init() {
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.lang = "th-TH";

    this.recognition.addEventListener("result", (e: any) => {
      console.log(e);
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started");
    this.recognition.addEventListener("end", (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition");
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log("End speech recognition");
  }

  wordConcat() {
    this.text = this.text + " " + this.tempWords + ".";
    console.log(this.text);
    this.tempWords = "";
  }
}
export const voiceRecognitionService = new VoiceRecognitionService();
