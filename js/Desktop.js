import Assets from "./Assets.js";
import Path from "./Path.js";

export default class Desktop {

    constructor() {
        if(document.body.contains(document.querySelector('.desktop'))) {

             this.desktop = document.querySelector('.desktop');

        }
    }



    renderDesktop() {

        

        let apps = JSON.parse(localStorage.getItem('apps'));
        let desktop = document.createElement('div');
        desktop.classList.add('desktop');
        document.body.appendChild(desktop);

        // load All Games And Applications

        apps.forEach(app => {
            
            let iApp = document.createElement('div'),
                iAppName = document.createElement('span'),
                iAppNameText = document.createTextNode(app.name),
                iAppIcon = document.createElement('img');

            iApp.classList.add('icon');
            iAppName.classList.add('icon-name');
            iAppName.appendChild(iAppNameText);
            iAppIcon.setAttribute('src', app.icon);

            iApp.setAttribute('draggable', true);

            iApp.addEventListener('dragstart', (e) => {

                e.dataTransfer.setData('text/plain', null);
                Desktop.draggedIcon = iApp;

            });

            desktop.addEventListener('dragover', (e) => {

                e.preventDefault();

            });

        desktop.addEventListener('drop', (e) => {
            e.preventDefault();
            if (Desktop.draggedIcon) {
                // تحديد موقع الماوس عند الإفلات
                let x = e.clientX;
                let y = e.clientY;

                // تحديث موقع الأيقونة
                Desktop.draggedIcon.style.position = 'absolute';
                Desktop.draggedIcon.style.left = x + 'px';
                Desktop.draggedIcon.style.top = y + 'px';

                // إعادة تعيين المتغير
                Desktop.draggedIcon = null;
            }
        });


            iApp.appendChild(iAppIcon);
            iApp.appendChild(iAppName);

            iApp.addEventListener('dblclick', () => {
                open(app.entry);
            });
            iApp.addEventListener('click', () => {
                iApp.classList.toggle('selected');
            });

            document.querySelector('.desktop').appendChild(iApp);

        });

        setTimeout(() => {
              this.renderTaskBar();
        }, 4000);

    }

    renderTaskBar() {
        let taskBar = document.createElement('footer'),
            btnStart = document.createElement('div'),
            btnStartText = document.createTextNode('Start'),
            btnStartImg = document.createElement('img');


        let assets = new Assets();
        taskBar.classList.add('task-bar');
        btnStart.classList.add('btn-start');
        btnStartImg.setAttribute('src', assets.winXP);
        btnStart.appendChild(btnStartImg);
        btnStart.appendChild(btnStartText);
        taskBar.appendChild(btnStart);

        this.onClickOnStart(btnStart);


        document.querySelector('.desktop').appendChild(
            taskBar
        );
    }

    onClickOnStart(button) {

        const startBtnMenu = document.createElement('div');
        const sbmHead = document.createElement('header');
        const sbmHeadAvatar = document.createElement('img');
        const sbmHeadUsername = document.createElement('span');
        const sbmUsernameText = document.createTextNode('Samer Hajara');

        const sbmBody = document.createElement('section');
        const sbmFooter = document.createElement('footer');
        const sbmSecPrograms = document.createElement('div');
        const sbmSecControl = document.createElement('div');
        button.addEventListener('click', () => {

                const ico = new Assets();

                startBtnMenu.classList.add('startMenu');

                sbmHead.classList.add('sbm-Head');
                sbmHeadAvatar.setAttribute('src', ico.winXP);
                sbmHeadUsername.classList.add('sbm-username');
                sbmHeadUsername.appendChild(sbmUsernameText);
                sbmHead.appendChild(sbmHeadAvatar);
                sbmHead.appendChild(sbmHeadUsername);

                sbmBody.classList.add('sbm-body');
                sbmSecPrograms.classList.add('sbm-programs');
                sbmSecControl.classList.add('sbm-control');

                sbmBody.appendChild(sbmSecPrograms);
                sbmBody.appendChild(sbmSecControl);

                startBtnMenu.appendChild(sbmHead);
                startBtnMenu.appendChild(sbmBody);
                startBtnMenu.appendChild(sbmFooter);












           (async () => {
                if (document.body.contains(document.querySelector('.desktop'))) {
                    const apps = await this.getAllApplications();
                    console.log(apps);
                    
                    apps.forEach(app => {
                        const iApp = document.createElement('div');
                        const iAppIcon = document.createElement('img');
                        iAppIcon.setAttribute('src', app.icon)
                        const iAppName = document.createTextNode(app.name);
                        
                        iApp.appendChild(iAppIcon);
                        iApp.appendChild(iAppName);
                        document.querySelector('.sbm-programs').appendChild(iApp);
                    });
                }
                })();
            document.querySelector('.desktop').appendChild(startBtnMenu);

        });


    }

    async getAllApplications() {

    try {

        let response = await fetch('/data/apps.json');

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        let apps = await response.json();
        
        localStorage.setItem('apps', JSON.stringify(apps));

        return apps;

    } catch (error) {
        console.error("Error loading programs:", error);
        return [];
    }

}





}