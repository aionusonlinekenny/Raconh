var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExitBtn = (function () {
    function ExitBtn(imageContainer) {
        this._imageContainer = imageContainer;
    }
    ExitBtn.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._btnExit:
                this.exitHandle();
                break;
        }
    };
    ExitBtn.prototype.exitHandle = function () {
        var str;
        var bfType = Manager.model.self.attrInfo.bfType;
        if (bfType == BFType.BOSS_PUBLIC)
            str = LangCVO.getContent("boss16");
        else if (bfType == BFType.CLUB_BF)
            str = LangCVO.getContent("clubBF27"); //您确定要退出战场？\n（30秒后可重回战场）
        else if (bfType == BFType.DEVIL)
            str = LangCVO.getContent("devil6");
        else
            str = LangCVO.getContent("activity3");
        var cbi = Manager.pool.create(CallBackInfo, this.doExit, this);
        Manager.tips.showTips(str, cbi, true);
    };
    ExitBtn.prototype.doExit = function () {
        var bfType = Manager.model.self.attrInfo.bfType;
        if (bfType == BFType.BOSS_PUBLIC)
            Manager.control.getBoss().exit();
        else if (bfType == BFType.CLUB_BF)
            Manager.control.getClubBF().exit();
        else if (bfType == BFType.DEVIL)
            Manager.control.getDevil().exitDevil();
        else
            Manager.control.getCopy().exit();
    };
    ExitBtn.prototype.switch = function (visible) {
        if (visible) {
            if (this._btnExit == null) {
                this._btnExit = BitmapRes.create("main_btn_exit_png");
                this._btnExit.touchEnabled = true;
                this._btnExit.y = 960;
                this._btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._imageContainer.addChild(this._btnExit);
            }
        }
        else {
            if (this._btnExit) {
                Manager.pool.push(this._btnExit);
                this._btnExit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._btnExit = null;
            }
        }
    };
    return ExitBtn;
}());
__reflect(ExitBtn.prototype, "ExitBtn");
//# sourceMappingURL=ExitBtn.js.map