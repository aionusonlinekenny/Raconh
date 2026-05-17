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
 * 18.3.18
 * 游戏公告
 *  */
var UpdNoticCMD = (function (_super) {
    __extends(UpdNoticCMD, _super);
    function UpdNoticCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_UPD_NOTICE;
        return _this;
    }
    UpdNoticCMD.prototype.receive = function (ip) {
        var state = ip.readByte();
        var cvo = UpdNoticCVO.cvo();
        cvo.setReward(state);
        Manager.model.getSysnotice().returnUpdNotice();
        //暂时屏蔽，不须自动弹出界面
        // if(state == 0)
        // {
        //     let cvo:DailyActivityCVO = DailyActivityCVO.getCVO(ActIconID.CASHCOW)
        //     if(cvo.isAllCondSatisfy())
        //     {
        //         let tap:number = 3;
        //         if(Manager.model.getcashCow().sevenDaysModel.checkSevenDaysHide())
        //         {
        //             tap = 2;
        //         }
        //         Manager.view.show(ViewID.CashCowPanel,tap);
        //     }
        // }
    };
    return UpdNoticCMD;
}(BaseCMD));
__reflect(UpdNoticCMD.prototype, "UpdNoticCMD");
//# sourceMappingURL=UpdNoticCMD.js.map