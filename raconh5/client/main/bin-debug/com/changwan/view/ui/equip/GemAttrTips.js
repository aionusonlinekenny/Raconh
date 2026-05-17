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
 * 宝石属性TIPS
 * Simon 2017.11.27
 */
var GemAttrTips = (function (_super) {
    __extends(GemAttrTips, _super);
    function GemAttrTips() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("equip", "GemAttrTipsSkin");
        _this.visible = false;
        return _this;
    }
    GemAttrTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this.onResizeHandler(null);
    };
    GemAttrTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    GemAttrTips.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        if (this._closeBtn)
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    GemAttrTips.prototype.onResizeHandler = function (e) {
        this.width = Manager.global.gameMain.stage.stageWidth;
    };
    GemAttrTips.prototype.onClickHandler = function (e) {
        Manager.view.hide(8 /* GemAttrTips */);
    };
    GemAttrTips.prototype.setInfo = function (level) {
        var curInfo;
        var curLevel = 0;
        for (var i = level; i >= 1; i--) {
            curInfo = EquipStoneCVO.getGemSuitInfo(i);
            if (curInfo) {
                curLevel = i;
                break;
            }
        }
        var nextInfo;
        var nextLevel = 0;
        for (var i = level + 1; i <= 10; i++) {
            nextInfo = EquipStoneCVO.getGemSuitInfo(i);
            if (nextInfo) {
                nextLevel = i;
                break;
            }
        }
        if (curInfo) {
            this._curLevel.text = LangCVO.getContent("equip11", curLevel);
            var curAttr = "";
            this._curStatus.text = LangCVO.getContent("equip12");
            // HtmlUtil.setTextFlow(this._curStatus, HtmlUtil.addColorTag(this._curStatus.text, "#38B800"));
            for (var i = 0; i < curInfo.attr.length; i++) {
                curAttr += AttrDescTypeEx.getAttrName(curInfo.attr[i][0]) + "+" + curInfo.attr[i][1] + "      ";
            }
            this._curValue.text = curAttr;
            // HtmlUtil.setTextFlow(this._curValue, HtmlUtil.addColorTag(this._curValue.text, "#38B800"));
            if (curInfo.level < 10)
                this._tipsBg.height = 229;
            else
                this._tipsBg.height = 135;
        }
        else {
            this._curLevel.text = "";
            this._curStatus.text = "";
            this._curValue.text = "";
            this._tipsBg.height = 135;
        }
        if (nextInfo) {
            this._nextLevel.text = LangCVO.getContent("equip11", nextLevel);
            this._nextStatus.text = LangCVO.getContent("equip13");
            var nextAttr = "";
            for (var i = 0; i < nextInfo.attr.length; i++) {
                nextAttr += AttrDescTypeEx.getAttrName(nextInfo.attr[i][0]) + "+" + nextInfo.attr[i][1] + "      ";
            }
            this._nextValue.text = nextAttr;
        }
        else {
            this._nextLevel.text = "";
            this._nextStatus.text = "";
            this._nextValue.text = "";
        }
        if (!curInfo) {
            this._curLevel.text = this._nextLevel.text;
            this._curStatus.text = this._nextStatus.text;
            HtmlUtil.setTextFlow(this._curStatus, HtmlUtil.addColorTag(this._curStatus.text, "#7C6E62"));
            this._curValue.text = this._nextValue.text;
            // HtmlUtil.setTextFlow(this._curValue, HtmlUtil.addColorTag(this._curValue.text, "#7C6E62"));
            this._nextLevel.text = "";
            this._nextStatus.text = "";
            this._nextValue.text = "";
        }
    };
    GemAttrTips.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    GemAttrTips.prototype.hide = function () {
        this.dispose();
    };
    GemAttrTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._closeBtn)
            this._closeBtn.dispose();
        this._closeBtn = null;
        if (this._curLevel)
            this._curLevel.dispose();
        this._curLevel = null;
        if (this._curStatus)
            this._curStatus.dispose();
        this._curStatus = null;
        if (this._curValue)
            this._curValue.dispose();
        this._curValue = null;
        if (this._nextLevel)
            this._nextLevel.dispose();
        this._nextLevel = null;
        if (this._nextStatus)
            this._nextStatus.dispose();
        this._nextStatus = null;
        if (this._nextValue)
            this._nextValue.dispose();
        this._nextValue = null;
    };
    return GemAttrTips;
}(UIComponent));
__reflect(GemAttrTips.prototype, "GemAttrTips");
//# sourceMappingURL=GemAttrTips.js.map