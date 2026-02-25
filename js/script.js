import Boot from "./Boot.js";
import Desktop from "./Desktop.js";
import Window from "./Window.js";
import Sounds from "./Sounds.js";

// فحص البروتوكول فوراً
if (window.location.protocol === 'file:') {
    let sound = new Sounds();
    alert('Error: Please run this project via a Web Server (Live Server).');
} else {
    window.onload = () => {
        
        const boot = new Boot();
        const desktop = new Desktop();
        const appWindow = new Window();

        // منع القائمة اليمنى
        document.addEventListener('contextmenu', (e) => e.preventDefault());

        // بدء شاشة الإقلاع
        boot.renderSplashScreenBoot();

        // تسلسل زمني منطقي
        setTimeout(() => {
            boot.welcomeScreen();
        }, 1000);

        setTimeout(() => {
            boot.removeBoot();
        }, 3000);

        setTimeout(() => {
            boot.removeWelcomeAnimate();
            
            // تشغيل سطح المكتب بعد انتهاء الأنميشن تماماً
            desktop.getAllApplications();
            desktop.renderDesktop();
        }, 5000);
    };
}