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
 * 铸魂属性TIPS
 * Simon 2017.11.20
 */
var ZhuhunAttrTips = /** @class */ (function (_super) {
    __extends(ZhuhunAttrTips, _super);
    function ZhuhunAttrTips() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("equip", "ZhuhunAttrTipsSkin");
        _this.visible = false;
        return _this;
    }
    ZhuhunAttrTips.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.visible = true;
        this.onResizeHandler(null);
    };
    ZhuhunAttrTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    ZhuhunAttrTips.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        if (this._closeBtn)
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ZhuhunAttrTips.prototype.onResizeHandler = function (e) {
        this.x = Math.round((Manager.global.gameMain.stage.stageWidth - this.width) / 2);
    };
    ZhuhunAttrTips.prototype.onClickHandler = function (e) {
        Manager.view.hide(6 /* ZhuhunAttrTips */);
    };
    ZhuhunAttrTips.prototype.setInfo = function (career, level) {
        var curInfo = EquipZhuhunCVO.getInfo(career, 1, level);
        var nextInfo = EquipZhuhunCVO.getInfo(career, 1, level + 1);
        this._curLevel.text = LangCVO.getContent("equip18") + level;
        var curAttr = "";
        if (curInfo) {
            if (curInfo.levelAttrList.length > 0)
                this._curStatus.text = LangCVO.getContent("equip12");
            else
                HtmlUtil.setTextFlow(this._curStatus, "<font color='#ff0000'>（" + LangCVO.getContent("equip17") + "）</font>");
            for (var i = 0; i < curInfo.levelAttrList.length; i++) {
                curAttr += AttrDescType.getAttrName(curInfo.levelAttrList[i][0]) + "+" + curInfo.levelAttrList[i][1] + "    ";
            }
        }
        else {
            HtmlUtil.setTextFlow(this._curStatus, "<font color='#ff0000'>（" + LangCVO.getContent("equip17") + "）</font>");
        }
        this._curValue.text = curAttr;
        if (nextInfo) {
            this._nextLevel.text = LangCVO.getContent("equip18") + (level + 1);
            this._nextStatus.text = LangCVO.getContent("equip13");
            var nextAttr = "";
            for (var i = 0; i < nextInfo.levelAttrList.length; i++) {
                nextAttr += AttrDescType.getAttrName(nextInfo.levelAttrList[i][0]) + "+" + nextInfo.levelAttrList[i][1] + "    ";
            }
            this._nextValue.text = nextAttr;
        }
        else {
            this._nextLevel.text = "";
            this._nextStatus.text = "";
            this._nextValue.text = "";
        }
        if (!curInfo || level == 0) {
            this._curLevel.text = this._nextLevel.text;
            this._curStatus.text = this._nextStatus.text;
            HtmlUtil.setTextFlow(this._curStatus, HtmlUtil.addColorTag(this._curStatus.text, "#7C6E62"));
            this._curValue.text = this._nextValue.text;
            // HtmlUtil.setTextFlow(this._curValue, HtmlUtil.addColorTag(this._curValue.text, "#7C6E62"));
            this._nextLevel.text = "";
            this._nextStatus.text = "";
            this._nextValue.text = "";
            this._tipsBg.height = 135;
        }
        else {
            if (curInfo && curInfo.level == EquipModel.ZHUHUAN_MAX_LEVEL)
                this._tipsBg.height = 135;
            else
                this._tipsBg.height = 229;
        }
    };
    ZhuhunAttrTips.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    ZhuhunAttrTips.prototype.hide = function () {
        this.dispose();
    };
    ZhuhunAttrTips.prototype.dispose = function () {
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
    return ZhuhunAttrTips;
}(UIComponent));
//# sourceMappingURL=ZhuhunAttrTips.js.map