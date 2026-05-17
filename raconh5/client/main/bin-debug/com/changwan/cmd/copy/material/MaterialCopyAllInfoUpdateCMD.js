var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
 * 缥缈录信息更新
 * Simon
 * create 2018.3.16
 */
var MaterialCopyAllInfoUpdateCMD = (function (_super) {
    __extends(MaterialCopyAllInfoUpdateCMD, _super);
    function MaterialCopyAllInfoUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MATERIAL_COPY_ALL_INFO_UPDATE;
        return _this;
    }
    MaterialCopyAllInfoUpdateCMD.prototype.receive = function (pi) {
        var copyId = pi.readInt();
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var passCell = pi.readShort();
            var type = Math.ceil(passCell / MaterialCopyModel.CELL_MAX_COUNT);
            var list = Manager.model.getMaterialCopy().passList[type];
            if (list.indexOf(passCell) == -1)
                list.push(passCell);
            list.sort(Manager.model.getMaterialCopy().sortOnCell);
        }
        var enterTime = pi.readByte();
        Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
    };
    return MaterialCopyAllInfoUpdateCMD;
}(BaseCMD));
__reflect(MaterialCopyAllInfoUpdateCMD.prototype, "MaterialCopyAllInfoUpdateCMD");
//# sourceMappingURL=MaterialCopyAllInfoUpdateCMD.js.map