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
 * 副本退出协议
 * luzhihong
 * create 2017.12.4
 */
var CopyExitCMD = /** @class */ (function (_super) {
    __extends(CopyExitCMD, _super);
    function CopyExitCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_EXTI;
        return _this;
    }
    CopyExitCMD.prototype.processOut = function (pkg) {
        // pkg.writeInt(this.id);
    };
    CopyExitCMD.prototype.receive = function (pi) {
        var id = pi.readInt();
        var isSucc = pi.readByte() == 0;
        Manager.model.getCopy().clean();
        if (id == CopyConst.ID_EXP)
            Manager.view.hide(70 /* CopyExpInfoView */);
        else if (id == CopyConst.ID_SILVER) {
            Manager.view.hide(86 /* CopySilverInfoView */);
            Manager.view.hide(85 /* CopyBuffUnlockView */);
        }
        else
            Manager.view.hide(23 /* CopyInfoView */);
        if (id == CopyConst.ID_MAIN) {
            if (isSucc)
                Manager.model.getTask().setCopyResoult(id);
        }
        if (id == CopyConst.ID_MATERIAL) {
            var type = Manager.model.getMaterialCopy().getCommendItem();
            if (type != 0)
                Manager.view.show(129 /* MaterialSecondView */, type);
        }
        //引导
        if (Manager.model.getGuide().curID == GuideID.PASS_COPY) {
            Manager.control.getTask().showGuide(Manager.model.getLogin().home.getGlobalPos(HomeView2.TASK), 150, 125, this.guideCB, this, false);
        }
    };
    CopyExitCMD.prototype.guideCB = function () {
        Manager.model.getLogin().home.guide(HomeView2.TASK);
        Manager.control.getTask().hideGuide();
    };
    return CopyExitCMD;
}(BaseCMD));
//# sourceMappingURL=CopyExitCMD.js.map