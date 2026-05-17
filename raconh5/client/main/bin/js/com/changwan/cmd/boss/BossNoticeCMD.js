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
 * BOSS刷新提示协议
 * luzhihong
 * create 2018.1.2
 */
var BossNoticeCMD = /** @class */ (function (_super) {
    __extends(BossNoticeCMD, _super);
    function BossNoticeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_NOTICE;
        return _this;
    }
    BossNoticeCMD.prototype.receive = function (pi) {
        var type = pi.readByte(); //1 刷新前 2 刷新
        var id = pi.readByte();
        if (type == 2) {
            if (Manager.model.getBoss().challengeNum <= 0)
                return;
            if (!OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS))
                return;
            if (!Manager.model.getBoss().isAttention(id))
                return;
            if (!Manager.model.self.canJoinActive())
                return;
            // let cvo:DailyActivityCVO = DailyActivityCVO.getCVO(ActIconID.BOSS);
            // if(!cvo.isAllCondSatisfy()) return;
            if (!BossCVO.getCVO(id).condVo.isSatisfy())
                return;
            Manager.view.show(31 /* BossReviveView */, id);
        }
    };
    return BossNoticeCMD;
}(BaseCMD));
//# sourceMappingURL=BossNoticeCMD.js.map