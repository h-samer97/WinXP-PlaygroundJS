export default class Sounds {
    constructor() {
        this.error = '/snd/Windows XP Error.wav'
    }

    play() {
        let audio = new Audio(this.error);
        audio.play();
    }
}