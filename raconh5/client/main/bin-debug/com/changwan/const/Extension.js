var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Extension = (function () {
    function Extension() {
    }
    Extension.PNG = "png";
    Extension.JPG = "jpg";
    Extension.MP3 = "mp3";
    Extension.TXT = "txt";
    return Extension;
}());
__reflect(Extension.prototype, "Extension");
//# sourceMappingURL=Extension.js.map