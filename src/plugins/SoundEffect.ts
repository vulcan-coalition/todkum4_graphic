// import Audio from 'uifx';

const successEffectPath = require('../assets/effects/success.mp3');
const failEffectPath = require('../assets/effects/fail.wav');
const back3SecEffectPath = require('../assets/effects/sf_back_3_sec.wav');
const backMarkEffectPath = require('../assets/effects/sf_back_mark.wav');
const beepPath = require('../assets/effects/beep.wav')
const next3SecEffectPath = require('../assets/effects/sf_next_3_sec.wav');
const nextMarkEffectPath = require('../assets/effects/sf_next_mark.wav');
const shortSuccessPath = require('../assets/effects/short_success.mp3');
const eraseTextPath = require('../assets/effects/erase_text.wav');
const confirmationDownwardPath = require('../assets/effects/confirmation_downward.wav');
const confirmationUpwardPath = require('../assets/effects/confirmation_upward.wav');
const raceStartPath = require('../assets/effects/race_start.wav');
const levelUpPath = require('../assets/effects/level_up.mp3');
const itemJinglePath = require('../assets/effects/item_jingle.mp3');
const lostFocusPath = require('../assets/effects/lost_focus.mp3');
const mouseClickPath = require('../assets/effects/mouse_click.mp3');
const helloMascotPath = require('../assets/effects/hello_mascot.wav');
const byeMascotPath = require('../assets/effects/bye_mascot.wav');
const congratMascotPath = require('../assets/effects/congrat_mascot.wav');
const congrat2MascotPath = require('../assets/effects/congrat2_mascot.wav');
const interruptErrorMascotPath = require('../assets/effects/interrupt_error_mascot.wav');
const notificationMascotPath = require('../assets/effects/notification_mascot.wav');
const notification2MascotPath = require('../assets/effects/notification2_mascot.wav');

const volume = localStorage.getItem("volumeSoundEffect");
const configVolume = volume? Number(volume) : 0.3;
class SoundEffect {
    successEffect: HTMLAudioElement;
    failEffect: HTMLAudioElement;
    back3SecEffect: HTMLAudioElement;
    backMarkEffect: HTMLAudioElement;
    beepEffect: HTMLAudioElement;
    next3SecEffect: HTMLAudioElement;
    nextMarkEffect: HTMLAudioElement;
    shortSuccess: HTMLAudioElement;
    eraseText: HTMLAudioElement;
    confirmationDownward: HTMLAudioElement;
    confirmationUpward: HTMLAudioElement;
    raceStart: HTMLAudioElement;
    levelUp: HTMLAudioElement;
    itemJingle: HTMLAudioElement;
    lostFocus: HTMLAudioElement;
    mouseClick: HTMLAudioElement;
    helloMascot: HTMLAudioElement;
    byeMascot: HTMLAudioElement;
    congratMascot: HTMLAudioElement;
    congrat2Mascot: HTMLAudioElement;
    interruptErrorMascot: HTMLAudioElement;
    notificationMascot: HTMLAudioElement;
    notification2Mascot: HTMLAudioElement;

    constructor() {
        this.successEffect = new Audio(successEffectPath);
        this.failEffect = new Audio(failEffectPath);
        this.back3SecEffect = new Audio(back3SecEffectPath);
        this.backMarkEffect = new Audio(backMarkEffectPath);
        this.beepEffect = new Audio(beepPath);
        this.next3SecEffect = new Audio(next3SecEffectPath);
        this.nextMarkEffect = new Audio(nextMarkEffectPath);
        this.shortSuccess = new Audio(shortSuccessPath);
        this.eraseText = new Audio(eraseTextPath);
        this.confirmationDownward = new Audio(confirmationDownwardPath);
        this.confirmationUpward = new Audio(confirmationUpwardPath);
        this.raceStart = new Audio(raceStartPath);
        this.levelUp = new Audio(levelUpPath);
        this.itemJingle = new Audio(itemJinglePath);
        this.lostFocus = new Audio(lostFocusPath);
        this.mouseClick = new Audio(mouseClickPath);
        this.helloMascot = new Audio(helloMascotPath);
        this.byeMascot = new Audio(byeMascotPath);
        this.congratMascot = new Audio(congratMascotPath);
        this.congrat2Mascot = new Audio(congrat2MascotPath);
        this.interruptErrorMascot = new Audio(interruptErrorMascotPath);
        this.notificationMascot = new Audio(notificationMascotPath);
        this.notification2Mascot = new Audio(notification2MascotPath);
        /// set volum
        this.successEffect.volume = configVolume;
        this.failEffect.volume = configVolume;
        this.back3SecEffect.volume = configVolume;
        this.backMarkEffect.volume = configVolume;
        this.beepEffect.volume = configVolume;
        this.next3SecEffect.volume = configVolume;
        this.nextMarkEffect.volume = configVolume;
        this.shortSuccess.volume = configVolume;
        this.eraseText.volume = configVolume;
        this.confirmationDownward.volume = configVolume;
        this.confirmationUpward.volume = configVolume;
        this.raceStart.volume = configVolume;
        this.levelUp.volume = configVolume;
        this.itemJingle.volume = configVolume;
        this.lostFocus.volume = configVolume;
        this.mouseClick.volume = configVolume;
        this.helloMascot.volume = configVolume;
        this.byeMascot.volume = configVolume;
        this.congratMascot.volume = configVolume;
        this.congrat2Mascot.volume = configVolume;
        this.interruptErrorMascot.volume = configVolume;
        this.notificationMascot.volume = configVolume;
        this.notification2Mascot.volume = configVolume;
    }
}
export const soundEffect = new SoundEffect();
