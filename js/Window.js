import Assets from "./Assets.js";
import Sounds from "./Sounds.js";

export default class Window {

    constructor() {

    }

    // render({width = 300, height = 200, posX = 400, posY = 200, title = 'Alert', message = 'body',
    //      titleIcon = (new Assets()).btnCancel,
    //     bodyIcon = (new Assets()).warningIcon,
    //     btnCancel = false}) {

    //     let window = document.createElement('div');
    //     let assets = new Assets();

    //     window.classList.add('window');
    //     window.style.width = width + 'px';
    //     window.style.height = height + 'px';
    //     window.style.top = posY + 'px';
    //     window.style.left = posX + 'px';

    //     let windowTitle = document.createElement('div');
    //     let windowTitleIcon = document.createElement('img');
    //     let windowTitleText = document.createTextNode(title);

    //     windowTitle.classList.add('w-title');
    //     windowTitleIcon.setAttribute('src', titleIcon);
    //     windowTitle.appendChild(windowTitleText);
    //     windowTitle.appendChild(windowTitleIcon);
        

    //     let windowBody = document.createElement('div');
    //     let windowBodyIcon = document.createElement('img');
    //     let windowBodyMsg = document.createElement('div');
    //     let windowBodyText = document.createTextNode(title);

    //     windowTitleIcon.addEventListener('click', () => {
    //         document.querySelector('.window').remove();
    //     });

    //     windowBody.classList.add('w-body');
    //     windowBodyIcon.setAttribute('src', bodyIcon);
    //     windowBody.appendChild(windowBodyIcon);
    //     windowBodyMsg.appendChild(windowBodyText);
    //     windowBody.appendChild(windowBodyMsg);

    //     let windowFooter = document.createElement('div');
    //     windowFooter.classList.add('w-footer');

    //     let windowOk = document.createElement('input');
    //     windowOk.setAttribute('type', 'button');
    //     windowOk.setAttribute('value', 'OK');

    //     windowFooter.appendChild(windowOk);

    //     if(btnCancel) {
    //         let windowCancel = document.createElement('input');
    //         windowCancel.setAttribute('type', 'button');
    //         windowCancel.setAttribute('value', 'Cancel');

    //         windowFooter.appendChild(windowCancel);
    //     }
        
        
        
        
    //     window.appendChild(windowTitle);
    //     window.appendChild(windowBody);
    //     window.appendChild(windowFooter);
    //     let sounds = new Sounds();
    //     sounds.play();

    //     document.body.appendChild(window);

    // }

}