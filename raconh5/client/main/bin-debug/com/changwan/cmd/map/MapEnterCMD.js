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
 *author Anydo
 *create 2017-11-1
 *description 地图进入协议
*/
var MapEnterCMD = (function (_super) {
    __extends(MapEnterCMD, _super);
    function MapEnterCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.MAP_ENTER;
        return _this;
    }
    MapEnterCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.mapID);
    };
    MapEnterCMD.prototype.receive = function (pi) {
        var oldMapID = Manager.model.getMap().getId();
        var newMapID = pi.readInt();
        Manager.model.getMap().enterMapX = pi.readShort();
        Manager.model.getMap().enterMapY = pi.readShort();
        egret.log("进入地图", oldMapID, newMapID, Manager.model.getMap().enterMapX, Manager.model.getMap().enterMapY);
        var mapLongID = pi.readInt64();
        var curIsReConnect = this.socketReConnectHandle();
        Manager.control.getMap().mapEnterReceive(newMapID, mapLongID, curIsReConnect);
        GameDispatcher.getInstance().dispatchEvent(new GlobalEvent(GlobalEvent.ENTER_SCENE, curIsReConnect));
    };
    MapEnterCMD.prototype.socketReConnectHandle = function () {
        if (!Manager.model.getLogin().isSocketReConnect)
            return false;
        Manager.model.getLogin().isSocketReConnect = false;
        if (Manager.model.self.getAliveFlag()) {
            Manager.view.hide(34 /* ReviveCDView */);
            Manager.view.hide(35 /* ReviveChooseView */);
        }
        if (Manager.model.getArena().resultObj != null) {
            Manager.model.getArena().exitArenaHandler();
        }
        return true;
    };
    return MapEnterCMD;
}(BaseCMD));
__reflect(MapEnterCMD.prototype, "MapEnterCMD");
//# sourceMappingURL=MapEnterCMD.js.map