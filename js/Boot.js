import Path from "./Path.js";
import Sounds from "./Sounds.js";

export default class Boot {

    constructor() {
        this.splash = null;
        this.welcome = null;
        this.path   = new Path();
    }
    
    renderSplashScreenBoot() {
        
        let splash  = document.createElement('div'),
        logo        = document.createElement('img'),
        loading     = document.createElement('div'),
        footer      = document.createElement('footer');
        
        // add Splash Screen    
        splash.classList.add('splash-screen');
        document.body.appendChild(splash);
        
        const path = new Path();
        logo.setAttribute('src', path.logoWindowsXPBoot);
        logo.classList.add('logo-boot');
        splash.appendChild(logo);
        
        for(let k = 0; k < 3; k++) {
            let block = document.createElement('span');
            block.classList.add('loading-block');
            loading.appendChild(block);
        }

        this.splash = splash;

        const sound = new Sounds();
        const audio = new Audio();
        audio.play(sound.startup);

        loading.classList.add('loading');
        splash.appendChild(loading);

        let jsLogo = document.createElement('img');
        jsLogo.setAttribute('src', path.jsLogo);
        
        let footerInfo = document.createElement('div');
        footerInfo.classList.add('f-info');
        
        let footerInfoText = document.createTextNode("Samer Hajara");
        footerInfo.appendChild(footerInfoText);

        footer.classList.add('footer');
        footer.appendChild(footerInfo);
        footer.appendChild(jsLogo);
        splash.appendChild(footer);
        

    }


    removeBoot() {

        if(this.splash) {

            this.splash.classList.add('fade-out');
    
            setTimeout(() => {
                this.splash.remove();
                this.splash = null;
            }, 1000);
    
         }

        }

        welcomeScreen() {

            let welcome = document.createElement("div"),
                img     = document.createElement("img");

            
            welcome.classList.add('welcome');
            img.classList.add('w-img');
            img.setAttribute('src', this.path.jpgWelcome)

            welcome.appendChild(img);
            document.body.appendChild(welcome);
            this.welcome = welcome;
            this.welcomeAnimate();
            

        }

        welcomeAnimate() {

            let welcomeDots = document.createElement('div'),
                welcomeDiv = document.querySelector('.welcome'),
                dots        = 0;

                welcomeDots.classList.add('welcome-animate');
                welcomeDiv.appendChild(welcomeDots);

            setInterval(() => {
                dots = (dots + 1) % 4;
                welcomeDots.textContent = "Welcome " + ".".repeat(dots);
            }, 500);

        }

        removeWelcomeAnimate() {

            if(this.welcome) {

                this.welcome.classList.add('fade-out');

                setTimeout(() => {

                    this.welcome.remove();
                    this.welcome = null;
                }, 5000);

            }

        }

        checkErrorBoot() {
            if (window.location.protocol === 'file:') {
        
            const sound = new Sounds();
            const audio = new Audio(sound.error);

            audio.play().catch(() => {});

            alert('Windows XP Error: ES Modules (import/export) require a Server environment.');

            document.write(`
                <body style="background:#0000aa; color:white; font-family:monospace; padding:5vw;">
                    <h2>STOP: c000021a {Fatal System Error}</h2>
                    <p>The Session Manager initialization system process terminated unexpectedly.</p>
                    <p>REASON: BROWSER_SECURITY_CORS_POLICY</p>
                    <p>ACTION: Open this folder with "Live Server" in VS Code or any Web Server.</p>
                </body>
            `);
            
            window.stop();
    }
        }

}