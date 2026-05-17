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
 * 活动基础图标
 * liangyan
 * create 2017-12-23
 * @update devil 2018-04-15
*/
var ActBaseIcon2 = /** @class */ (function (_super) {
    __extends(ActBaseIcon2, _super);
    function ActBaseIcon2(imageContainer01, imageContainer, container1) {
        var _this = _super.call(this) || this;
        _this.TEXT = "drawText";
        _this.ICON = "drawIcon";
        _this.RED_ICON = "drawRedIcon";
        _this._imageContainer01 = ObjectUtil.createConainer();
        imageContainer01.addChild(_this._imageContainer01);
        _this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(_this._imageContainer);
        _this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(_this._conainer1);
        _this.start();
        return _this;
    }
    ActBaseIcon2.prototype.getIcon = function () {
        return this._icon;
    };
    ActBaseIcon2.prototype.dispatchRender = function () {
        if (this._cvo)
            _super.prototype.dispatchRender.call(this);
    };
    ActBaseIcon2.prototype.move = function (x, y) {
        this._imageContainer01.x = x;
        this._imageContainer01.y = y;
        this._imageContainer.x = x;
        this._imageContainer.y = y;
        this._conainer1.x = x;
        this._conainer1.y = y;
    };
    ActBaseIcon2.prototype.setIsInTime = function (value) {
        if (value) {
            if (this._inTime == null) {
                this._inTime = BitmapRes.create("common_jinxingzhong_png");
                this._imageContainer.addChild(this._inTime);
            }
        }
        else {
            if (this._inTime != null) {
                Manager.pool.push(this._inTime);
                this._inTime = null;
            }
        }
    };
    Object.defineProperty(ActBaseIcon2.prototype, "txt", {
        get: function () {
            if (this._txt == null) {
                this._txt = TextField.create(118, 22, 0xffffff, 19, "center");
                this._txt.y = 106;
                this._txt.fontFamily = Manager.config.defaultFont;
                this._txt.stroke = 2;
                this._txt.strokeColor = 0;
                this._conainer1.addChild(this._txt);
            }
            return this._txt;
        },
        enumerable: true,
        configurable: true
    });
    ActBaseIcon2.prototype.update = function (interval) {
        var left = this._cvo.time - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        if (left <= 0) {
            Manager.render.remove(this.update, this);
            Manager.model.getActIcon().removeID(this._cvo.id);
        }
        else {
            var str = cw.DateUtil.formatStr(left, cw.DateUtil.LEFT_HH_MM_SS, true);
            str = HtmlUtil.addColorTag(str, Color.GREEN_STR);
            HtmlUtil.setTextFlow(this.txt, HtmlUtil.addBTag(str));
        }
    };
    ActBaseIcon2.prototype.drawText = function () {
        if (!this._cvo)
            return;
        Manager.render.remove(this.update, this);
        if (this._cvo.type != DailyActivityCVO.SHOW_TYPE_ALWAYS) {
            if (this._cvo.status == DailyActivityCVO.STATE_IN)
                Manager.render.add(this.update, this, 1000);
            else if (this._cvo.iconLabel != "")
                HtmlUtil.setTextFlow(this.txt, HtmlUtil.addBTag(this._cvo.iconLabel));
        }
    };
    ActBaseIcon2.prototype.drawIcon = function () {
        if (!this._cvo)
            return;
        if (this._icon != null) {
            this.removeEvent();
            Manager.pool.push(this._icon);
            this._icon = null;
        }
        this._icon = BitmapRes.create("actIcon" + this._cvo.resID.toString() + "_png");
        this._icon.touchEnabled = true;
        this.addEvent();
        this._imageContainer01.addChild(this._icon);
    };
    ActBaseIcon2.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._cvo) {
            this.drawText();
            this.drawIcon();
            this.drawRedIcon();
        }
    };
    ActBaseIcon2.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(this.TEXT))
            this.drawText();
        if (this.isInvalid(this.ICON))
            this.drawIcon();
        if (this.isInvalid(this.RED_ICON))
            this.drawRedIcon();
    };
    ActBaseIcon2.prototype.drawRedIcon = function () {
        if (this.hasRedIcon()) {
            if (this._redIcon == null) {
                this._redIcon = BitmapRes.create("main_red_icon_png", 70, 10);
                this._imageContainer.addChild(this._redIcon);
            }
        }
        else {
            if (this._redIcon != null) {
                Manager.pool.push(this._redIcon);
                this._redIcon = null;
            }
        }
    };
    ActBaseIcon2.prototype.hasRedIcon = function () {
        return false;
    };
    ActBaseIcon2.prototype.setCVO = function (value) {
        if (this._cvo == value)
            return;
        this._cvo = value;
        this.invalidate(InvalidationType.ALL);
    };
    ActBaseIcon2.prototype.setID = function (id) {
        if (this._cvo && this._cvo.id == id)
            return;
        this.setCVO(DailyActivityCVO.getCVO(id));
    };
    ActBaseIcon2.prototype.getCVO = function () {
        return this._cvo;
    };
    ActBaseIcon2.prototype.__drawRed = function (e) {
        this.invalidate(this.RED_ICON);
    };
    ActBaseIcon2.prototype.onTouchBeginHandler = function (e) {
        this._icon.filters = [FilterUtil.getBrightFilter(50)];
    };
    ActBaseIcon2.prototype.onTouchEndHandler = function (e) {
        this._icon.filters = null;
    };
    ActBaseIcon2.prototype.onTouchHandler = function (e) {
        if (!this._cvo || !this._cvo.isAllCondSatisfy(true))
            return;
        var arr = this._cvo.viewStr.split("|");
        if (!arr || arr.length <= 0)
            return;
        var linkID = Number(arr[0]);
        switch (linkID) {
            case LinkType.PANEL_SHOP:
                if (!OpenCVO.isOpen(OpenConst.ID_STORE, true))
                    return;
                break;
            case LinkType.PANEL_ARTIFACT:
                if (!OpenCVO.isOpen(OpenConst.ID_LING_YAN_GE, true))
                    return;
                break;
            case LinkType.PANEL_CASHCOW:
                if (!OpenCVO.isOpen(OpenConst.ID_CASHCOW, true))
                    return;
                break;
            case LinkType.PANEL_SYSPRIVILEGE:
                if (!OpenCVO.isOpen(OpenConst.ID_PRIVILEGE_CARD, true) || !OpenCVO.isOpen(OpenConst.ID_INVEST, true))
                    return;
                break;
            case LinkType.PANEL_ACTIVITY:
                if (!OpenCVO.isOpen(OpenConst.ID_DAILY_TASK, true))
                    return;
                break;
            case LinkType.PANEL_BOSS:
                if (!OpenCVO.isOpen(OpenConst.ID_PRIVATE_BOSS, true))
                    return;
                break;
            case LinkType.PANEL_RECHARGE:
                if (!OpenCVO.isOpen(OpenConst.ID_RECHARGE_ACTIVITY, true))
                    return;
                break;
            case LinkType.PANEL_RANK:
                if (!OpenCVO.isOpen(OpenConst.ID_RANK, true))
                    return;
                break;
            case LinkType.PANEL_INVEST:
                if (!OpenCVO.isOpen(OpenConst.ID_INVEST, true))
                    return;
                break;
            case LinkType.PANEL_MATERIAL:
                if (!OpenCVO.isOpen(OpenConst.ID_MATERIAL, true))
                    return;
                break;
        }
        if (linkID == LinkType.PANEL_SHOP || linkID == LinkType.PANEL_SHOP_MULTE) {
            if (!Manager.view.isOpening(18 /* ShopPanel */) && !Manager.view.isOpening(115 /* ShopPanelMulte */)) {
                Manager.link.linkStr(this._cvo.viewStr);
            }
        }
        else if (linkID == LinkType.PANEL_BOSS) {
            if (!Manager.model.getBoss().privateChallenge && Manager.model.getBoss().publicChallenge)
                Manager.link.link(LinkType.PANEL_BOSS, 1);
            else
                Manager.link.link(LinkType.PANEL_BOSS, 0);
        }
        else
            Manager.link.linkStr(this._cvo.viewStr);
    };
    ActBaseIcon2.prototype.addEvent = function () {
        this._icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
        this._icon.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);
        this._icon.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEndHandler, this);
        this._icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.SINGLE_UPDATE, this.updateText, this);
        Manager.model.getActIcon().addEventListener(ActIconEvent.LIST_UPDATE, this.updateText, this);
    };
    ActBaseIcon2.prototype.removeEvent = function () {
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginHandler, this);
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndHandler, this);
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEndHandler, this);
        this._icon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.SINGLE_UPDATE, this.updateText, this);
        Manager.model.getActIcon().removeEventListener(ActIconEvent.LIST_UPDATE, this.updateText, this);
    };
    ActBaseIcon2.prototype.updateText = function (e) {
        if (e.type == ActIconEvent.SINGLE_UPDATE && e.params != this._cvo.id)
            return;
        this.invalidate(this.TEXT);
    };
    ActBaseIcon2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        Manager.render.remove(this.update, this);
        if (this._icon != null) {
            Manager.pool.push(this._icon);
            this.removeEvent();
            this._icon = null;
        }
        if (this._txt != null) {
            Manager.pool.push(this._txt);
            this._txt = null;
        }
        if (this._inTime != null) {
            Manager.pool.push(this._inTime);
            this._inTime = null;
        }
        if (this._redIcon != null) {
            Manager.pool.push(this._redIcon);
            this._redIcon = null;
        }
        this._cvo = null;
        this._imageContainer.parent.removeChild(this._imageContainer);
        this._imageContainer = null;
        this._conainer1.parent.removeChild(this._conainer1);
        this._conainer1 = null;
        this._imageContainer01.parent.removeChild(this._imageContainer01);
        this._imageContainer01 = null;
    };
    return ActBaseIcon2;
}(BaseRender));
//# sourceMappingURL=ActBaseIcon2.js.map