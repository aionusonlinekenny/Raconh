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
 * pzx
 * 17.12.27
 * 命格分解
 *  */
var LifeGridSeparateCMD = (function (_super) {
    __extends(LifeGridSeparateCMD, _super);
    function LifeGridSeparateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LIFEGRID_SEPARATE;
        return _this;
    }
    LifeGridSeparateCMD.prototype.processOut = function (pkg) {
        pkg.writeShort(this.array.length);
        for (var i = 0; i < this.array.length; i++) {
            pkg.writeInt(this.array[i]);
        }
    };
    LifeGridSeparateCMD.prototype.receive = function (ip) {
        var ln = ip.readShort();
        var arr = [];
        for (var i = 0; i < ln; i++) {
            var info = new ItemsModelInfo();
            info.base_id = ip.readInt();
            info.bind = ip.readByte() == 1;
            info.quantity = ip.readInt();
            arr.push(info);
        }
        Manager.model.getLifeGrid().returnSeparate(arr);
    };
    return LifeGridSeparateCMD;
}(BaseCMD));
__reflect(LifeGridSeparateCMD.prototype, "LifeGridSeparateCMD");
//# sourceMappingURL=LifeGridSeparateCMD.js.map