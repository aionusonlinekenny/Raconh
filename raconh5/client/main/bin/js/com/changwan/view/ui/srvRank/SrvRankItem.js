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
 * 冲榜竞技Item
 * pzx
 * 2018-3-20
 */
var SrvRankItem = /** @class */ (function (_super) {
    __extends(SrvRankItem, _super);
    function SrvRankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("srvRank", "SrvRankItemSkin");
        return _this;
    }
    SrvRankItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._list = [this._item0, this._item1, this._item2];
        this.addEvent();
    };
    SrvRankItem.prototype.addEvent = function () {
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchRewardHandler, this);
    };
    SrvRankItem.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchRewardHandler, this);
    };
    SrvRankItem.prototype.touchRewardHandler = function () {
        if (this._cvo.rank > 3) {
            if (this._cvo.checkReward()) {
                Manager.control.getsrvRank().reward(this._cvo.rank);
            }
            else {
                FloatTips.addTips(LangCVO.getContent("srv_rank2"), Color.RED);
            }
        }
    };
    SrvRankItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._cvo = this.data;
        this._nameTxt.text = "";
        this._rankImg.y = 0;
        this.drawDate();
        this.drawItem();
    };
    SrvRankItem.prototype.drawItem = function () {
        var arr = GainLossVO.parse(this._cvo.losse);
        for (var i = this._list.length - 1; i > -1; i--) {
            if (arr[i]) {
                this._list[i].setGainLossVO(arr[i]);
            }
            else {
                this._list[i].clear();
            }
        }
    };
    SrvRankItem.prototype.drawDate = function () {
        this._ilingquImg.visible = false;
        this._redIcon.visible = false;
        if (this._cvo.rank < 4) {
            this._rankImg.source = "srvRank_rank" + this._cvo.rank + "_png";
            this._btn.visible = false;
            this._statuTxt.text = LangCVO.getContent("srv_rank1"); //邮件发放
            if (this._numImg) {
                this._numImg.visible = false;
            }
            if (this._cvo.rank == 1) {
                this._nameTxt.text = Manager.model.getsrvRank().rank1Name;
            }
            else {
                this._rankImg.y = 20;
            }
        }
        else {
            this._rankImg.source = this._cvo.di_img;
            if (!this._numImg) {
                this._numImg = Manager.pool.create(NumImgView2);
                this._numImg.y = 70;
                this.addChild(this._numImg);
            }
            this._numImg.setValue(this._cvo.condStr(), "nums_srvRank_", 17);
            this._numImg.x = Math.round((145 - this._numImg.width) / 2);
            this._numImg.visible = true;
            if (this._cvo.isReward()) {
                this._btn.visible = false;
                this._statuTxt.text = "";
                this._ilingquImg.visible = true;
            }
            else if (this._cvo.checkReward()) {
                this._btn.visible = true;
                this._statuTxt.text = "";
                this._redIcon.visible = true;
            }
            else {
                this._btn.visible = false;
                this._statuTxt.text = LangCVO.getContent("srv_rank2"); //未达标
            }
        }
    };
    SrvRankItem.prototype.clear = function (isRemove) {
        if (isRemove === void 0) { isRemove = false; }
        if (isRemove) {
            ObjectUtil.removes(this._rankImg, this._ilingquImg, this._redIcon);
            ObjectUtil.disposes(this._btn, this._statuTxt, this._nameTxt);
        }
        this._rankImg = null;
        this._item0 = null;
        this._item1 = null;
        this._item2 = null;
        this._btn = null;
        this._statuTxt = null;
        this._nameTxt = null;
        this._cvo = null;
        this._ilingquImg = null;
        if (this._numImg)
            Manager.pool.push(this._numImg);
        this._numImg = null;
        this._list.forEach(function (item, i) {
            Manager.pool.push(item);
        });
        this._list = null;
        this._redIcon = null;
    };
    SrvRankItem.prototype.dispose = function () {
        this.removeEvent();
        this.clear(true);
        _super.prototype.dispose.call(this);
    };
    return SrvRankItem;
}(ItemRenderer));
//# sourceMappingURL=SrvRankItem.js.map