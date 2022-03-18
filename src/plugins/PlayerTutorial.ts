import { Subject } from 'rxjs';

const subject = new Subject();

export class PlayerTutorial {
    audio: HTMLAudioElement = new Audio();

    play = (src: string) => {
        this.audio.onended = () => {
            audioService.sendEnded(true);
        }
        this.audio.src = src;
        this.audio.play();
    }
    pause = () => this.audio.pause();
}
export const playerTutorial = new PlayerTutorial();

export const audioService = {
    sendEnded: (ended: boolean) => subject.next(ended),
    onEnded: () => subject.asObservable(),
    unsubscribe: () => subject.unsubscribe()
};
