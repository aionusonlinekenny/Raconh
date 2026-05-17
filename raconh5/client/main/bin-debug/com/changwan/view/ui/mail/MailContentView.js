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
// 邮件内容
var MailContentView = (function (_super) {
    __extends(MailContentView, _super);
    function MailContentView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("mail", "MailContentSkin");
        return _this;
    }
    MailContentView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._contentTxt.lineSpacing = 7;
    };
    MailContentView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._fetchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    };
    MailContentView.prototype.removeEvent = function () {
        this._fetchBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MailContentView.prototype.onTouchCloseHandler = function (e) {
        switch (e.currentTarget) {
            case this._popupView.closeBtn:
                break;
            case this._fetchBtn:
                if (Manager.model.getBag().isTooLittle()) {
                    FloatTips.addTips("背包已满！");
                    return;
                }
                if (this._goods) {
                    var len = this._goods.length;
                    var str = void 0;
                    if (this._goods[0]) {
                        var cvo = this._goods[0].cvo;
                        //判断是否为命格
                        if (cvo.group == ItemsType.GROUP_LIFEGRID) {
                            if (!Manager.model.getItems().checkLifeGridBagAmple(len)) {
                                FloatTips.addTips(LangCVO.getContent("lifeGrid11"), Color.RED); //命格背包空间不足
                                return;
                            }
                        }
                    }
                    for (var i = 0; i < len; i++) {
                        str = this._goods[i]._data.cvo.name + "X" + this._goods[i]._data.quantity;
                        FloatTips.addTips(str, Color.getColorNumByQuality(this._goods[i]._data.cvo.quality));
                    }
                }
                Manager.control.getMail().mailFetch(this._data.uniqueID);
                break;
        }
        Manager.view.hide(4 /* MailContentView */);
    };
    MailContentView.prototype.setBtn = function (unFetch) {
        this._fetchBtn.enabled = unFetch;
        if (unFetch)
            this._fetchBtn.filters = null;
        else
            FilterUtil.setGrayFilter(this._fetchBtn);
    };
    MailContentView.prototype.show = function (data) {
        if (this.parent == null) {
            this._data = data;
            if (this._data != null) {
                this._goods = [];
                if (!this._data.hasRead)
                    Manager.control.getMail().mailRead(this._data.uniqueID);
                var unFetch = this._data.attachStatus == MailConst.UN_FETCH;
                this.setBtn(unFetch);
                this._titleTxt.text = this._data.title;
                this._contentTxt.text = LangCVO.getContent("mail2") + "\r　　" + this._data.content;
                var goodsLen = this._data.goodsArr.length;
                var child = void 0;
                var goodsInfo = void 0;
                var offsetX = (720 - (141 * goodsLen)) / 2;
                var offsetY = this._fetchBtn.y - 140;
                for (var i = 0; i < goodsLen; i++) {
                    child = Manager.pool.create(Goods);
                    goodsInfo = this._data.goodsArr[i];
                    child.data = goodsInfo;
                    child.x = offsetX + (141 * i);
                    child.y = offsetY;
                    if (unFetch)
                        child.filters = null;
                    else
                        FilterUtil.setGrayFilter(child);
                    this._goods.push(child);
                    this.addChild(child);
                }
                Manager.layer.tipsLayer.addChild(this);
            }
        }
    };
    MailContentView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._fetchBtn.dispose();
        this._fetchBtn = null;
        this._titleTxt.dispose();
        this._titleTxt = null;
        this._contentTxt.dispose();
        this._contentTxt = null;
        this._data = null;
        if (this._goods) {
            this._goods.forEach(function (good, i) {
                if (good.filters) {
                    good.filters = null;
                }
                Manager.pool.push(good);
            });
            this._goods.length = 0;
            this._goods = null;
        }
    };
    return MailContentView;
}(PopUpView));
__reflect(MailContentView.prototype, "MailContentView");
//# sourceMappingURL=MailContentView.js.map