export default class Sounds {
    constructor() {
        // نستخدم "_" قبل الاسم لتمييز مسار الملف عن الدالة
        this._errorPath   = '/snd/Windows XP Error.wav';
        this._startupPath = '/snd/Windows XP Startup.wav';
        this._chordPath   = '/snd/chord.wav';
    }

    _playSound(path) {
        const audio = new Audio(path);
        
        return audio.play().catch(err => {
            console.warn("تعذر تشغيل الصوت: تأكد من تفاعل المستخدم مع الصفحة أولاً.", err);
        });
    }

    playError() {
        this._playSound(this._errorPath);
    }

    playStartup() {
        this._playSound(this._startupPath);
    }

    playChord() {
        this._playSound(this._chordPath);
    }
}