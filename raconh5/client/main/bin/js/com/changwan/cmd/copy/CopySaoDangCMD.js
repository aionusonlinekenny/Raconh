var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 副本扫荡协议
 * luzhihong
 * create 2017.12.26
 */
var CopySaoDangCMD = /** @class */ (function (_super) {
    __extends(CopySaoDangCMD, _super);
    function CopySaoDangCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_SAO_DANG;
        return _this;
    }
    CopySaoDangCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.id);
    };
    CopySaoDangCMD.prototype.receive = function (pi) {
        var copyID = pi.readInt();
        var len = pi.readShort();
        var goodsID;
        var isBind;
        var count;
        var infos = [];
        var info;
        while (len > 0) {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() == 1;
            info.quantity = pi.readInt();
            infos.push(info);
            len--;
        }
        Manager.view.show(26 /* CopyResultWin */, infos, 5);
    };
    return CopySaoDangCMD;
}(BaseCMD));
//# sourceMappingURL=CopySaoDangCMD.js.map