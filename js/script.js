import Boot from "./Boot.js";
import Desktop from "./Desktop.js";
import Window from "./Window.js";


window.onload = () => {

    let boot = new Boot();
    let desktop = new Desktop();
    let window = new Window();
    boot.renderSplashScreenBoot();
   
            document.addEventListener('contextmenu', (e) => {

                e.preventDefault();

            });
            
    setTimeout(() => {
        boot.removeBoot();
    }, 3000);

    setTimeout(() => {
        boot.welcomeScreen();
    }, 1000);

    setTimeout(() => {
        boot.removeWelcomeAnimate();
    }, 5000);

    setTimeout(() => {
        desktop.getAllApplications();
        desktop.renderDesktop();
    }, 1000);

    // window.render({btnCancel: true, width: 400, height: 300});
    
};