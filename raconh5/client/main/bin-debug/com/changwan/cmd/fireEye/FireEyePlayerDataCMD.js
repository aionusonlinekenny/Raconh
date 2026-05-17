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
 * 火眼金睛玩家数据
 * liangyan
 * create 2018-03-26
*/
var FireEyePlayerDataCMD = (function (_super) {
    __extends(FireEyePlayerDataCMD, _super);
    function FireEyePlayerDataCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_PLAYER_DATA;
        return _this;
    }
    FireEyePlayerDataCMD.prototype.receive = function (pi) {
        var count = pi.readShort();
        var player;
        var targetNum;
        while (count > 0) {
            player = new FireEyePlayerData();
            player.id = pi.readInt64();
            player.score = pi.readInt();
            targetNum = pi.readShort();
            while (targetNum > 0) {
                var target = {};
                target.type = pi.readByte();
                target.num = pi.readByte();
                player.targets.push(target);
                targetNum--;
            }
            player.winTimes = pi.readByte();
            if (player.id == Manager.model.self.id)
                Manager.model.getFireEye().myGameInfo = player;
            else
                Manager.model.getFireEye().enemyGameInfo = player;
            count--;
        }
        var myRate = Manager.model.getFireEye().myGameInfo.rate;
        var enemyRate = Manager.model.getFireEye().enemyGameInfo.rate;
        if (myRate == 100 && myRate > enemyRate) {
            if (Manager.control.getFireEye().finishView != null) {
                Manager.control.getFireEye().finishView.dispose();
                Manager.control.getFireEye().finishView = null;
            }
            Manager.control.getFireEye().finishView = new FireEyeFinishView();
            Manager.view.getView(136 /* FireEyePanel */).addChild(Manager.control.getFireEye().finishView);
        }
        Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_PLAYER_DATA));
    };
    return FireEyePlayerDataCMD;
}(BaseCMD));
__reflect(FireEyePlayerDataCMD.prototype, "FireEyePlayerDataCMD");
//# sourceMappingURL=FireEyePlayerDataCMD.js.map