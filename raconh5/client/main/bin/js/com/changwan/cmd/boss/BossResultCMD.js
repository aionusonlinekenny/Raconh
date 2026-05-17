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
 * BOSS 结算协议
 * luzhihong
 * create 2018.1.2
 */
var BossResultCMD = /** @class */ (function (_super) {
    __extends(BossResultCMD, _super);
    function BossResultCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.BOSS_RESULT;
        return _this;
    }
    BossResultCMD.prototype.receive = function (pi) {
        var rank = pi.readShort();
        var isSucc = pi.readByte() != 0;
        var infos = [];
        var len0 = pi.readShort();
        var info;
        while (len0--) {
            info = new ItemsModelInfo();
            info.base_id = pi.readInt();
            info.bind = pi.readByte() != 1;
            info.quantity = pi.readInt();
            var len1 = pi.readShort();
            var exarr = void 0;
            while (len1--) {
                exarr = new ExattrItemsinfo();
                exarr.type = pi.readShort();
                exarr.target = pi.readInt();
                exarr.value = pi.readInt();
                exarr.desc = pi.readUTF();
                info.infoList.push(exarr);
            }
            infos.push(info);
        }
        infos.sort(CopyModel.sortResultItems);
        if (isSucc) {
            Manager.render.add(this.showWinFun, this, 3000, 1, null, false, rank, infos); //策划需求延两秒再提示
        }
        else {
            Manager.render.add(this.showFailFun, this, 3000, 1); //策划需求延两秒再提示
        }
    };
    BossResultCMD.prototype.showWinFun = function (interval, rank, infos) {
        Manager.control.getBoss().showWin(rank, infos, 10, Manager.control.getBoss().exit);
    };
    BossResultCMD.prototype.showFailFun = function (interval) {
        Manager.control.getCopy().showFail(10, Manager.control.getBoss().exit);
    };
    return BossResultCMD;
}(BaseCMD));
//# sourceMappingURL=BossResultCMD.js.map