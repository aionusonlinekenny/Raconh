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
 * 选择宗门提示
 * Simon
 * 2017.12.14
 */
var ClubJoinTipsView = /** @class */ (function (_super) {
    __extends(ClubJoinTipsView, _super);
    function ClubJoinTipsView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("club", "ClubJoinTipsViewSkin");
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    ClubJoinTipsView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._okBtnImg.touchEnabled = false;
        this._cancelBtnImg.touchEnabled = false;
        this._tipsView.titleImg.source = "club_joinClub_png";
        var clubName = ClubDataCVO.getClubName(this._clubId);
        this._tips1.text = LangCVO.getContent("club1", clubName);
        if (this._joinType == 0) {
            this._tips1.y = 440;
            this._tips2.y = 515;
            this._tips2.text = LangCVO.getContent("club2");
        }
        else if (this._joinType == 1) {
            this._tips1.y = 400;
            this._tips2.y = 475;
            this._tips2.text = LangCVO.getContent("club3");
            var gainInfo = ClubDataCVO.getClubGainById(1);
            if (gainInfo)
                this._itemInfoList = gainInfo.gainList;
            if (this._itemInfoList && this._itemInfoList.length > 0) {
                this._itemList = [];
                var startX = Math.round((720 - this._itemInfoList.length * 150) / 2);
                for (var i = 0; i < this._itemInfoList.length; i++) {
                    var info = ItemsCVO.getCvo(this._itemInfoList[i].baseId);
                    if (info) {
                        var item = new BaseGoods();
                        item.baseId = this._itemInfoList[i].baseId;
                        item.count = this._itemInfoList[i].num;
                        item.bind = this._itemInfoList[i].bind;
                        item.x = startX + i * 150;
                        item.y = 520;
                        this._group.addChild(item);
                        this._itemList.push(item);
                    }
                }
            }
        }
        this.onResizeHandler(null);
        this.visible = true;
    };
    ClubJoinTipsView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._tipsView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ClubJoinTipsView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._tipsView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubJoinTipsView.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    ClubJoinTipsView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._tipsView.closeBtn:
            case this._cancelBtn:
                Manager.view.hide(39 /* ClubJoinTipsView */);
                break;
            case this._okBtn:
                Manager.control.getClub().clubJoin(this._clubId, this._joinType);
                Manager.view.hide(39 /* ClubJoinTipsView */);
                break;
        }
    };
    ClubJoinTipsView.prototype.show = function (clubId, type) {
        this._clubId = clubId;
        this._joinType = type;
        Manager.layer.tipsLayer.addChild(this);
    };
    ClubJoinTipsView.prototype.hide = function () {
        Manager.layer.tipsLayer.removeChild(this);
    };
    ClubJoinTipsView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._group, this._tipsView, this._tips1, this._tips2, this._okBtnImg, this._okBtn, this._cancelBtnImg, this._cancelBtn);
        this._group = null;
        if (this._tipsView)
            this._tipsView.dispose();
        this._tipsView = null;
        if (this._tips1)
            this._tips1.dispose();
        this._tips1 = null;
        if (this._tips2)
            this._tips2.dispose();
        this._tips2 = null;
        this._okBtnImg = null;
        if (this._okBtn)
            this._okBtn.dispose();
        this._okBtn = null;
        this._cancelBtnImg = null;
        if (this._cancelBtn)
            this._cancelBtn.dispose();
        this._cancelBtn = null;
        this._itemInfoList = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i])
                    this._itemList[i].dispose();
                this._itemList[i] = null;
            }
        }
        this._itemList = null;
    };
    return ClubJoinTipsView;
}(UIComponent));
//# sourceMappingURL=ClubJoinTipsView.js.map