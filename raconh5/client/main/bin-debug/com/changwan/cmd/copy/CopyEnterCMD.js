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
 * 副本进入协议
 * luzhihong
 * create 2017.12.4
 */
var CopyEnterCMD = (function (_super) {
    __extends(CopyEnterCMD, _super);
    function CopyEnterCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.COPY_ENTER;
        return _this;
    }
    CopyEnterCMD.prototype.processOut = function (pkg) {
        pkg.writeInt(this.id);
        pkg.writeShort(this.cell);
    };
    CopyEnterCMD.prototype.receive = function (pi) {
        var id = pi.readInt();
        var cell = pi.readShort();
        Manager.model.getCopy().curID = id;
        var cvo;
        if (id == CopyConst.ID_EXP) {
            Manager.view.show(70 /* CopyExpInfoView */);
            cvo = CopyCVO.getCVO(CopyConst.ID_EXP);
            if (cvo && cvo.cell <= 0)
                Manager.view.show(113 /* DialogView2 */, CopyConst.ID_DIALOG_EXP);
        }
        else if (id == CopyConst.ID_SILVER) {
            Manager.view.show(86 /* CopySilverInfoView */);
            cvo = CopyCVO.getCVO(CopyConst.ID_SILVER);
            if (cvo && cvo.cell <= 0)
                Manager.view.show(113 /* DialogView2 */, CopyConst.ID_DIALOG_COIN);
        }
        else
            Manager.control.getCopy().showInfoView(id);
    };
    return CopyEnterCMD;
}(BaseCMD));
__reflect(CopyEnterCMD.prototype, "CopyEnterCMD");
//# sourceMappingURL=CopyEnterCMD.js.map