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
// 一键领取邮件
var MailAllFetchView = (function (_super) {
    __extends(MailAllFetchView, _super);
    function MailAllFetchView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("mail", "MailAllFetchSkin");
        return _this;
    }
    MailAllFetchView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    MailAllFetchView.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this._goods = [];
        var goodsInfo = this.getGoodsInfos();
        var length = goodsInfo.length;
        var child;
        var rowIndex;
        var offsetX = length <= 5 ? (720 - (141 * length)) / 2 : 8;
        for (var i = 0; i < length; i++) {
            rowIndex = i % 5;
            child = Manager.pool.create(Goods);
            child.data = goodsInfo[i];
            child.x = offsetX + 140 * rowIndex;
            child.y = i >= 5 ? 510 : 380;
            this._goods.push(child);
            this.addChild(child);
        }
    };
    MailAllFetchView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    };
    MailAllFetchView.prototype.removeEvent = function () {
        this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MailAllFetchView.prototype.onTouchCloseHandler = function (e) {
        switch (e.currentTarget) {
            case this._popupView.closeBtn:
                break;
            case this._confirmBtn:
                Manager.control.getMail().mailAllFetch();
                break;
        }
        Manager.view.hide(2 /* MailAllFetchView */);
    };
    MailAllFetchView.prototype.getGoodsInfos = function () {
        var mailInfos = Manager.model.getMail().mailInfos;
        var length = mailInfos ? mailInfos.length : 0;
        var goodsArr;
        var goodsLen;
        var result = [];
        for (var i = 0; i < length; i++) {
            if (mailInfos[i].attachStatus != MailConst.UN_FETCH)
                continue;
            goodsArr = mailInfos[i].goodsArr;
            goodsLen = goodsArr.length;
            for (var j = 0; j < goodsLen; j++) {
                var resultLen = result.length;
                var needPush = true;
                for (var k = 0; k < resultLen; k++) {
                    if (goodsArr[j].cvo.superposition > 1 && goodsArr[j].base_id == result[k].base_id) {
                        result[k].quantity += goodsArr[j].quantity;
                        needPush = false;
                        break;
                    }
                }
                if (needPush)
                    result.push(goodsArr[j]);
            }
        }
        if (result.length > 1)
            result.sort(function (a, b) { return (a.cvo.quality > b.cvo.quality ? -1 : 1); });
        return result;
    };
    MailAllFetchView.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    MailAllFetchView.prototype.hide = function () {
        this.dispose();
    };
    MailAllFetchView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._confirmBtn.dispose();
        this._confirmBtn = null;
        if (this._goods) {
            this._goods.forEach(function (good, i) {
                Manager.pool.push(good);
            });
            this._goods.length = 0;
            this._goods = null;
        }
    };
    return MailAllFetchView;
}(PopUpView));
__reflect(MailAllFetchView.prototype, "MailAllFetchView");
//# sourceMappingURL=MailAllFetchView.js.map