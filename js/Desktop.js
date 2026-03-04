import Assets from "./Assets.js";
import Network from "./Network.js";
import Path from "./Path.js";
import Sounds from "./Sounds.js";
import Window from "./Window.js";

export default class Desktop {
    static draggedIcon = null;

    constructor() {
        this.desktop = document.querySelector('.desktop');
        this.Network = new Network();
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
                });
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
            btnStartText = document.createTextNode('Start'),
            btnNewtworkInfo = document.createElement('img');

        let assets = new Assets();
        taskBar.classList.add('task-bar');
        btnStart.classList.add('btn-start');
        btnStartImg.setAttribute('src', assets.winXP);

        btnNewtworkInfo.src = assets.winNetwork;
        btnNewtworkInfo.classList.add('network');
        
        btnNewtworkInfo.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (document.querySelector('.network-window')) return;

            const data = await (new Network()).getNetworkInformations();

            const networkInfo = document.createElement('div');
            networkInfo.classList.add('network-window');

            const title = document.createElement('h2');
            title.innerHTML = 'Network Connections - IP Configuration';
            networkInfo.appendChild(title);

            const importantKeys = {
                'ip': 'IP Address',
                'city': 'City',
                'region': 'Region',
                'country_name': 'Country',
                'org': 'ISP (Provider)',
                'version': 'IP Version'
            };

            Object.keys(importantKeys).forEach(key => {
                if (data && data[key]) {

                    const row = document.createElement('div');
                    row.style.padding = "2px 10px";
                    
                    const label = document.createElement('span');
                    label.innerHTML = `<b>${importantKeys[key]}:</b> `;
                    label.style.fontSize = "12px";
                    
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = data[key];
                    input.disabled = true;

                    row.appendChild(label);
                    row.appendChild(input);
                    networkInfo.appendChild(row);


                    console.log(data)

                }
            });

            const btnOk = document.createElement('button');
            btnOk.innerText = "OK";
            btnOk.style.margin = "10px auto";
            btnOk.style.display = "block";
            btnOk.style.width = "75px";
            btnOk.onclick = () => networkInfo.remove();
            networkInfo.appendChild(btnOk);

            document.body.appendChild(networkInfo);
        });

        btnStart.appendChild(btnStartImg);
        btnStart.appendChild(btnStartText);
        taskBar.appendChild(btnStart);
        taskBar.appendChild(btnNewtworkInfo);
        
        this.onClickOnStart(btnStart);
        document.querySelector('.desktop').appendChild(taskBar);
        this.renderClock();
    }

    updateClock() {
        let date = new Date();
        return {
            'seconds': date.getSeconds().toString(),
            'minutes': date.getMinutes().toString().padStart(2, '0'),
            'hours': date.getHours().toString(),
            'AM_PM': date.getHours() >= 12 ? 'PM' : 'AM',
        };
    }

    renderClock() {
        const clockContainer = document.createElement('div');
        clockContainer.classList.add('clock');
        const updateUI = () => {
            const time = this.updateClock();
            clockContainer.innerHTML = `${time.hours}<span class='blink'>:</span>${time.minutes} ${time.AM_PM}`;
        }
        updateUI();
        setInterval(updateUI, 1000);
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
            return JSON.parse(localStorage.getItem('apps')) || [];
        }
    }

    showMsg() {
        setTimeout(() => {
            if(navigator.onLine) {
                const w = new Window();
                (new Sounds()).playError();
                w.render({
                    width: 300,
                    height: 200,
                    posX: 100,
                    posY: 200,
                    title: 'انت متصل بالإنترنت',
                    message: 'انت الآن متصل بالإنترنت'
                });
            }
        }, 12000);

       setTimeout(async () => {
                const data = await this.Network.getNetworkInformations();
                const w = new Window();
                
                const sounds = new Sounds();
                sounds.playInfo();

                w.render({
                    width: 300,
                    height: 160,
                    posX: window.innerWidth - 320,
                    posY: window.innerHeight - 200,
                    title: 'Network Location',
                    message: `عنوانك الحالي هو: ${data.country_name === 'Offline Mode' ? 'Localhost' : `${data.country_name} - ${data.city}`}`,
                });
                
            }, 16000);

    }
}