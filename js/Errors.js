import Assets from "./Assets.js";

export default class Errors {

    constructor() {

        this.assets = new Assets();
        this.notAllowedError = 'NotAllowedSoundsError';
        this.protocolError = 'Error Protocol';

        // ###############################################
        
        this.headErrorSounds       = 'لتجربة أفضل .. يستحسن تفعيل خيار التشغيل التلقائي للصوتيات للإستمتاع بتجربة أفضل .. اذا كنت تصر على عدم تفعيل التشغيل التلقائي . قم بإعادة تحميل الصفحة والضغط على Ok عند ظهور الرسالة مرة أخرى';

        // ###############################################

        this.bodyErrorSounds       = `للوصول الى إعدادات المتصفح بسرعة .. قم بنسخ الروابط أدناه على حسب متصفحك الحالي ولصقها في تاب جديد وفعل خاصية التشغيل التلقائي للصوتيات

             <hr>
             <br>
             Chrome: ${this.assets.chromeSettings} <br>
             Firefox: ${this.assets.firefoxSettings} <br>`;
        
        this.protocolHead = `لا يمكن تشغيل التطبيق عبر بروتوكول file:// .. Live Server يجب تشغيل التطبيق بواسطة سيرفر محلي مثل`;
        this.protocolBody = `خطأ داخلي .. يجب تشغيل التطبيق عبر بروتوكول HTTP لضمان جلب التطبيقات والألغاب المصغرة عبر دالة Fetch`;
        
        this.typeErrorSound  = `
            <p>Technical information:</p>
            <p class="stop-code"> STOP: 0x0000004E (0x00000099, 0x00000000, 0x00000000, 0x00000000)</p>
            <p class="driver-info">*** نوع الخطأ ${this.notAllowedError}</p>`;

        this.typeErrorProtocol  = `
            <p>Technical information:</p>
            <p class="stop-code"> STOP: 0x0000004E (0x00000099, 0x00000000, 0x00000000, 0x00000000)</p>
            <p class="driver-info">*** نوع الخطأ ${this.protocolError}</p>`;

    }


    checkProtocol() {

        const currentProtocol = window.location.protocol;

        if(currentProtocol !== "http:" || currentProtocol === 'file:') {

            return false;

        } else {

            return true;

        }

    }

    redirectToBlueDie(head, body, type) {

        const message  = `<div class="bsod-container">
        
        <p>
            ${head}
        </p>

        <p>
             ${body}
        </p>

        <div class="technical-section">
            ${type}
        </div>
    </div>`;
    


    const errorPage = document.createElement('div');
    errorPage.innerHTML = message;
    document.body.appendChild(errorPage);

    }

}