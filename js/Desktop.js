import Assets from "./Assets.js";
import Path from "./Path.js";
import Sounds from "./Sounds.js";
import Window from "./Window.js";

export default class Desktop {
    static draggedIcon = null;

    constructor() {
        this.desktop = document.querySelector('.desktop');
        this.showMsg();
    }

    async renderDesktop() {
        
        const apps = await this.getAllApplications();

        let w = new Window();
        w.render({ title: "Welcome", message: "System Loaded Successfully" });
        (new Sounds()).playStartup();

        let desktop = document.createElement('div');
        desktop.classList.add('desktop');
        document.body.appendChild(desktop);

        desktop.addEventListener('click', (e) => {
            if (e.target.classList.contains('desktop')) {
                const startMenu = document.querySelector('.startMenu');
                if (startMenu) startMenu.remove();
            }
        });

        desktop.addEventListener('dragover', (e) => e.preventDefault());
        desktop.addEventListener('drop', (e) => {
            e.preventDefault();
            if (Desktop.draggedIcon) {
                Desktop.draggedIcon.style.position = 'absolute';
                Desktop.draggedIcon.style.left = e.clientX + 'px';
                Desktop.draggedIcon.style.top = e.clientY + 'px';
                Desktop.draggedIcon = null;
            }
        });

        apps.forEach(app => {
            let iApp = document.createElement('div'),
                iAppName = document.createElement('span'),
                iAppIcon = document.createElement('img');

            iApp.classList.add('icon');
            iAppName.classList.add('icon-name');
            iAppName.textContent = app.name;
            iAppIcon.setAttribute('src', app.icon);
            iApp.setAttribute('draggable', true);

            iApp.addEventListener('dragstart', (e) => {
                Desktop.draggedIcon = iApp;
            });

            iApp.appendChild(iAppIcon);
            iApp.appendChild(iAppName);

            iApp.addEventListener('dblclick', () => {


                const w = new Window();
                
                w.run({
                    title: app.title,
                    exe: app.entry
                })


            });




            iApp.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.icon').forEach(i => i.classList.remove('selected'));
                iApp.classList.add('selected');
            });

            desktop.appendChild(iApp);
        });

        this.renderTaskBar();
    }

    renderTaskBar() {
        let taskBar = document.createElement('footer'),
            btnStart = document.createElement('div'),
            btnStartImg = document.createElement('img'),
            btnStartText = document.createTextNode('Start');

        let assets = new Assets();
        taskBar.classList.add('task-bar');
        btnStart.classList.add('btn-start');
        btnStartImg.setAttribute('src', assets.winXP);


        
        
        btnStart.appendChild(btnStartImg);
        btnStart.appendChild(btnStartText);
        taskBar.appendChild(btnStart);
        
        this.onClickOnStart(btnStart);
        document.querySelector('.desktop').appendChild(taskBar);
        this.renderClock();
    }

    updateClock() {

        let date = new Date();
        return {
            'seconds': date.getSeconds().toString(),
            'minutes': date.getMinutes().toString(),
            'hours'  : date.getHours().toString(),
            'AM_PM'  : date.getHours() >= 12 ? 'PM' : 'AM',
        };


    }

    renderClock() {

        const clockContainer = document.createElement('div');
        clockContainer.classList.add('clock');
        
        
        
       const updateUI = () => {

        const time = this.updateClock();
        clockContainer.innerHTML = `${time.hours} <span class='blink'> : </span> ${time.minutes} - ${time.AM_PM}`;

       }

       updateUI();
       setInterval(updateUI, 999);
        document.querySelector('.task-bar').appendChild(clockContainer);

    }

    onClickOnStart(button) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (document.querySelector('.startMenu')) {
                document.querySelector('.startMenu').remove();
                return;
            }

            const startBtnMenu = document.createElement('div');
            startBtnMenu.classList.add('startMenu');
            
            startBtnMenu.innerHTML = `
                <header class="sbm-Head">
                    <img src="${(new Assets()).winXP}">
                    <span class="sbm-username">h.samer97</span>
                </header>
                <section class="sbm-body">
                    <div class="sbm-programs"></div>
                </section>
                <footer class="sbm-footer"></footer>
            `;

            document.querySelector('.desktop').appendChild(startBtnMenu);
            this.loadStartMenuApps();
        });
    }

    async loadStartMenuApps() {
        const apps = JSON.parse(localStorage.getItem('apps')) || [];
        const programsContainer = document.querySelector('.sbm-programs');
        if (!programsContainer) return;

        apps.forEach(app => {
            const iApp = document.createElement('div');
            iApp.innerHTML = `<img src="${app.icon}"> <a href="${app.entry}">${app.name}</a>`;
            programsContainer.appendChild(iApp);
        });
    }

    async getAllApplications() {
        try {
            let response = await fetch('/data/apps.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            let apps = await response.json();
            localStorage.setItem('apps', JSON.stringify(apps));
            return apps;
        } catch (error) {
            console.error("Error loading programs:", error);
            return JSON.parse(localStorage.getItem('apps')) || [];
        }
    }

    showMsg() {

        setTimeout(() => {

            if(navigator.onLine == true) {
                const w = new Window();
                (new Sounds()).playError();
                w.render({
                    width: 200,
                    height: 160,
                    posX: 100,
                    posY: 200,
                    title: 'انت متصل بالإنترنت',
                    message: 'انت الآن متصل بالإنترنت'
                });
            }

        }, 12000);

    }

}