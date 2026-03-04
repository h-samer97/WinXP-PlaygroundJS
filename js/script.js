import Boot from "./Boot.js";
import Desktop from "./Desktop.js";
import Errors from "./Errors.js";
import Sounds from "./Sounds.js";

window.onload = () => {

    const sounds    = new Sounds();
    const boot      = new Boot();
    const desktop   = new Desktop();
    const error     = new Errors();

    const startSystem = () => {
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        boot.renderSplashScreenBoot();

        setTimeout(() => boot.welcomeScreen(), 1000);
        setTimeout(() => boot.removeBoot(), 3000);
        setTimeout(() => {
            boot.removeWelcomeAnimate();
            desktop.getAllApplications();
            desktop.renderDesktop();
        }, 5000);
    };

    let soundStatus = localStorage.getItem('soundStatus');

    if (soundStatus === null || soundStatus === 'false') {
        const confirmEnableSounds = window.confirm('لتجربة أفضل، من فضلك قم بتفعيل التشغيل التلقائي للصوتيات للإستمتاع بصوتيات Windows XP :)');
        
        if (confirmEnableSounds) {

            localStorage.setItem('soundStatus', 'true');
            sounds.playTest();

            if(!error.checkProtocol) {

                startSystem();

            } else {
                error.redirectToBlueDie(error.protocolHead, error.protocolBody, error.typeErrorProtocol);
            }

        } else {

            localStorage.setItem('soundStatus', 'false');
            error.redirectToBlueDie(error.headErrorSounds, error.bodyErrorSounds, error.typeErrorSound);

        }
    } else {
        
        if(!error.checkProtocol) {

            error.redirectToBlueDie(error.protocolHead, error.protocolBody, error.typeErrorProtocol);

        } else {
            sounds.playTest();
            startSystem();
        }
    }
};