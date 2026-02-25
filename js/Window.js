import Assets from "./Assets.js";
import Sounds from "./Sounds.js";

export default class Window {
    constructor() {}

    render({
        width = 300,
        height = 200,
        posX = 400,
        posY = 200,
        title = 'Alert',
        message = 'Default Body Message',
        titleIcon = (new Assets()).btnCancel,
        bodyIcon = (new Assets()).warningIcon,
        btnCancel = false
    } = {}) {
        
        let winElement = document.createElement('div');
        winElement.classList.add('window');
        winElement.style.width = width + 'px';
        winElement.style.height = height + 'px';
        winElement.style.top = posY + 'px';
        winElement.style.left = posX + 'px';
        winElement.style.position = 'absolute';

        let windowTitle = document.createElement('div');
        windowTitle.classList.add('w-title');
        
        let windowTitleText = document.createElement('span');
        windowTitleText.textContent = title;
        
        let closeBtn = document.createElement('img');
        closeBtn.setAttribute('src', titleIcon);
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.addEventListener('click', () => winElement.remove());

        windowTitle.appendChild(windowTitleText);
        windowTitle.appendChild(closeBtn);

        let windowBody = document.createElement('div');
        windowBody.classList.add('w-body');
        
        let windowBodyIcon = document.createElement('img');
        windowBodyIcon.setAttribute('src', bodyIcon);
        
        let windowBodyMsg = document.createElement('div');
        windowBodyMsg.textContent = message;

        windowBody.appendChild(windowBodyIcon);
        windowBody.appendChild(windowBodyMsg);

        let windowFooter = document.createElement('div');
        windowFooter.classList.add('w-footer');

        let windowOk = document.createElement('input');
        windowOk.setAttribute('type', 'button');
        windowOk.setAttribute('value', 'OK');
        windowOk.onclick = () => winElement.remove();
        windowFooter.appendChild(windowOk);

        if (btnCancel) {
            let windowCancel = document.createElement('input');
            windowCancel.setAttribute('type', 'button');
            windowCancel.setAttribute('value', 'Cancel');
            windowCancel.onclick = () => winElement.remove();
            windowFooter.appendChild(windowCancel);
        }

        winElement.appendChild(windowTitle);
        winElement.appendChild(windowBody);
        winElement.appendChild(windowFooter);

        document.body.appendChild(winElement);
    }



    run({
        width = 1100,
        height = 550,
        posX = 10,
        posY = 150,
        title = 'run',
        exe = '',
        titleIcon = (new Assets()).btnCancel,
    } = {}) {

        let winElement = document.createElement('div');
        winElement.classList.add('window');
        winElement.style.width      = width + 'px';
        winElement.style.height     = height + 'px';
        winElement.style.top        = posX + 'px';
        winElement.style.left       = posY + 'px';
        winElement.style.position   = 'absolute';


         let windowTitle = document.createElement('div');
        windowTitle.classList.add('w-title');
        windowTitle.style.height = '7%'; 
        
        let windowTitleText = document.createElement('span');
        windowTitleText.textContent = title;
        
        let closeBtn = document.createElement('img');
        closeBtn.setAttribute('src', titleIcon);
        closeBtn.style.cursor = 'pointer';
        
        closeBtn.addEventListener('click', () => winElement.remove());

        windowTitle.appendChild(windowTitleText);
        windowTitle.appendChild(closeBtn);

        let windowBody = document.createElement('iframe');
        windowBody.classList.add('run-body');
        windowBody.appendChild(windowTitle);
        if(exe) {
            windowBody.src = exe;
            windowBody.sandbox = "allow-scripts allow-same-origin allow-forms";
        }

        windowTitle.appendChild(windowTitleText);
        windowTitle.appendChild(closeBtn);
        winElement.appendChild(windowTitle);
        winElement.appendChild(windowBody);

        document.body.appendChild(winElement);

    }



}