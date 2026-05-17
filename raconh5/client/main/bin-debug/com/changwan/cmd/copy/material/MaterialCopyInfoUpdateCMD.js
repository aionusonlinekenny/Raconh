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
var MaterialCopyInfoUpdateCMD = (function (_super) {
    __extends(MaterialCopyInfoUpdateCMD, _super);
    function MaterialCopyInfoUpdateCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MATERIAL_COPY_INFO_UPDATE;
        return _this;
    }
    MaterialCopyInfoUpdateCMD.prototype.receive = function (pi) {
        var copyId = pi.readInt();
        var passCell = pi.readShort();
        var enterTime = pi.readByte();
        // let type:number = Math.ceil(passCell / MaterialCopyModel.CELL_MAX_COUNT);
        // let list:Array<number> = Manager.model.getMaterialCopy().passList[type];
        // if(list.indexOf(passCell) == -1)
        //     list.push(passCell);
        // list.sort(Manager.model.getMaterialCopy().sortOnCell);
        // Manager.model.getMaterialCopy().dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_PASS_LIST_UPDATE));
        Manager.model.getMaterialCopy().updatePassCell(passCell);
    };
    return MaterialCopyInfoUpdateCMD;
}(BaseCMD));
__reflect(MaterialCopyInfoUpdateCMD.prototype, "MaterialCopyInfoUpdateCMD");
//# sourceMappingURL=MaterialCopyInfoUpdateCMD.js.map