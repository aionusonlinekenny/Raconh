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
 * drq
 * 升星CMD
 * 2018.4.16
 */
var StarUpCMD = /** @class */ (function (_super) {
    __extends(StarUpCMD, _super);
    function StarUpCMD() {
        var _this = _super.call(this) || this;
        _this._otherIdList = [];
        _this._protocol = Protocol.CMD_UP_STAR;
        return _this;
    }
    StarUpCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this._storageType); //升星的装备所在的背包类型
        pkg.writeInt(this._itemId); //升星装备的id
        pkg.writeShort(this._otherIdList.length);
        for (var i = 0; i < this._otherIdList.length; i++) //副装备列表
         {
            pkg.writeInt(this._otherIdList[i]); //背包装备id
        }
    };
    StarUpCMD.prototype.receive = function (pi) {
        var type = pi.readByte();
        var id = pi.readInt();
        var result = pi.readByte();
        var any = {};
        any.type = type;
        any.id = id;
        any.result = result;
        Manager.model.getStarUp().dispatchEvent(new StarUpEvent(StarUpEvent.STARUP_UPDATE, any));
    };
    return StarUpCMD;
}(BaseCMD));
//# sourceMappingURL=StarUpCMD.js.map