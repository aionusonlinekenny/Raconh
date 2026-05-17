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
 * 右边活动图标容器视图
 * luzh
 * create 2018.2.27
 * @update devil 2018-04-15
*/
var ActivityIcon = (function (_super) {
    __extends(ActivityIcon, _super);
    function ActivityIcon(type) {
        var _this = _super.call(this) || this;
        _this._imageContainer01 = ObjectUtil.createConainer();
        _this._imageContainer = ObjectUtil.createConainer();
        _this._btnContainer = ObjectUtil.createConainer();
        Manager.layer.homeImageLayer.addChild(_this._btnContainer);
        _this._conainer1 = ObjectUtil.createConainer();
        _this._type = type;
        if (_this._type == ActivityIcon.TOP) {
            _this._needSetRight = parseInt(MapCVO.getConfigData(MapCVO.CONFIG_DAILY_ICON)) == 1;
        }
        _this._icons = [];
        _this._visible = false;
        _this.start();
        return _this;
    }
    ActivityIcon.prototype.layout = function (gameWidth, gameHeight) {
        if (this._type == ActivityIcon.RIGHT)
            this.move(gameWidth - 117, 420);
        else if (this._type == ActivityIcon.TOP)
            this.move(68, 135);
    };
    ActivityIcon.prototype.move = function (x, y) {
        this._imageContainer.x = x;
        this._imageContainer.y = y;
        this._imageContainer01.x = x;
        this._imageContainer01.y = y;
        this._conainer1.x = x;
        this._conainer1.y = y;
        this._btnContainer.x = x;
        this._btnContainer.y = y;
    };
    ActivityIcon.prototype.switch = function (visible) {
        if (this._visible == visible)
            return;
        this._visible = visible;
        this._isMoving = true;
        egret.Tween.removeTweens(this._imageContainer01);
        egret.Tween.removeTweens(this._imageContainer);
        egret.Tween.removeTweens(this._conainer1);
        var layer = Manager.layer;
        if (this._visible) {
            if (this._imageContainer.parent == null) {
                layer.iconImageLayer.addChild(this._imageContainer01);
                layer.homeImageLayer.addChild(this._imageContainer);
                layer.homeLayer.addChild(this._conainer1);
            }
            if (this._type == ActivityIcon.RIGHT) {
                egret.Tween.get(this._imageContainer01).to({ y: 420, alpha: 1 }, 200).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({ y: 420, alpha: 1 }, 200);
                egret.Tween.get(this._conainer1).to({ y: 420, alpha: 1 }, 200);
            }
            else if (this._type == ActivityIcon.TOP) {
                egret.Tween.get(this._imageContainer01).to({ x: 68, alpha: 1 }, 200).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({ x: 68, alpha: 1 }, 200);
                egret.Tween.get(this._conainer1).to({ x: 68, alpha: 1 }, 200);
                if (this._needSetRight)
                    Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON, this._visible);
                if (this._btn != null)
                    this._btn.source = "main_minBtn_png";
            }
        }
        else {
            if (this._type == ActivityIcon.RIGHT) {
                egret.Tween.get(this._imageContainer01).to({ y: 420 + 472, alpha: 0 }, 100).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({ y: 420 + 472, alpha: 0 }, 100);
                egret.Tween.get(this._conainer1).to({ y: 420 + 472, alpha: 0 }, 100);
            }
            else if (this._type == ActivityIcon.TOP) {
                egret.Tween.get(this._imageContainer01).to({ x: -630 - 100, alpha: 0 }, 100).call(this.moveComplete, this);
                egret.Tween.get(this._imageContainer).to({ x: -630 - 100, alpha: 0 }, 100);
                egret.Tween.get(this._conainer1).to({ x: -630 - 100, alpha: 0 }, 100);
                if (this._needSetRight)
                    Manager.model.getLogin().home.switch(HomeView2.RIGHT_ICON, this._visible);
                if (this._btn != null)
                    this._btn.source = "main_maxBtn_png";
            }
        }
    };
    ActivityIcon.prototype.moveComplete = function () {
        this._isMoving = false;
        var layer = Manager.layer;
        if (!this._visible) {
            if (this._imageContainer.parent) {
                layer.iconImageLayer.removeChild(this._imageContainer01);
                layer.homeImageLayer.removeChild(this._imageContainer);
                layer.homeLayer.removeChild(this._conainer1);
            }
        }
    };
    ActivityIcon.prototype.createIcon = function (id) {
        var icon;
        if (id == ActIconID.DAILY)
            icon = new DailyActivityIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.BOSS)
            icon = new BossIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.TRAINING) {
            icon = new TrainingActivityIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
            Manager.model.getTraining().addRender();
        }
        else if (id == ActIconID.CLUBLEADERWAR) {
            icon = new ClubLeaderWarActivityIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        }
        else if (id == ActIconID.SHOP)
            icon = new ShopIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.MATERIAL)
            icon = new MaterialIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.CASHCOW)
            icon = new CashCowIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.SYSPRIVILEGE)
            icon = new SysPrivilegeIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.ARTIFACT)
            icon = new ArtifactIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.RANK)
            icon = new RankIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        else if (id == ActIconID.SHARE) {
            var bol1 = Manager.model.getshare().canShare;
            var cvo = ShareCVO.cvo();
            var bol2 = !cvo.isReward;
            if (bol1 && bol2)
                icon = new ShareIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        }
        else if (id == ActIconID.SRV_RANK) {
            var i = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
            if (i < 8)
                icon = new SrvRankIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
            else
                Manager.model.getActIcon().removeID(id);
        }
        else if (id == ActIconID.RECHARGE_ACTIVITY) {
            var any = Manager.model.getrechargeActivity().getTitleTabList();
            if (any.length > 0)
                icon = new RechargeActivityIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        }
        else
            icon = new ActBaseIcon2(this._imageContainer01, this._imageContainer, this._conainer1);
        if (icon) {
            icon.setID(id);
            this._icons.push(icon);
        }
    };
    ActivityIcon.prototype.getIconByID = function (id) {
        var icon;
        var len = this._icons.length - 1;
        var icons = this._icons;
        for (var i = len; i >= 0; i--) {
            icon = icons[i];
            if (icon.getCVO().id == id)
                return icon;
        }
        return null;
    };
    ActivityIcon.prototype.getGuidePos = function (id) {
        var icon = this.getIconByID(id);
        if (icon != null) {
            var display = icon.getIcon();
            if (display)
                return display.parent.localToGlobal(display.x, display.y);
        }
        return new egret.Point();
    };
    ActivityIcon.prototype.updateIcon = function (cvo, isRemove) {
        var icon = this.getIconByID(cvo.id);
        var index;
        if (isRemove) {
            if (icon) {
                index = this._icons.indexOf(icon);
                icon.dispose();
                this._icons.splice(index, 1);
            }
        }
        else {
            if (icon)
                icon.setCVO(cvo);
            else
                this.createIcon(cvo.id);
        }
        this.invalidate("drawSort");
    };
    ActivityIcon.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawSort"))
            this.drawSort();
    };
    ActivityIcon.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        if (this._icons.length > 0)
            this.drawSort();
    };
    ActivityIcon.prototype.drawSort = function () {
        var icon;
        var len = this._icons.length;
        var icons = this._icons;
        if (icons.length <= 0)
            return;
        this._icons.sort(this.sortByIndex);
        if (icons.length > 0) {
            if (this._type == ActivityIcon.RIGHT) {
                for (var j = 0; j < icons.length; j++) {
                    icon = icons[j];
                    icon.move(0, 472 - 118 * j);
                }
            }
            else if (this._type == ActivityIcon.TOP) {
                var y = void 0;
                for (var k = 0; k < icons.length; k++) {
                    icon = icons[k];
                    y = k > 5 ? 118 : 0;
                    icon.move(100 * (k % 6), y);
                }
            }
        }
        if (this._type == ActivityIcon.TOP)
            this.updateBtn();
    };
    ActivityIcon.prototype.sortByIndex = function (a, b) {
        return a.getCVO().sortIndex > b.getCVO().sortIndex ? 1 : -1;
    };
    ActivityIcon.prototype.updateBtn = function () {
        if (this._icons.length <= 3) {
            if (this._btn != null) {
                Manager.pool.push(this._btn);
                this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._btn = null;
            }
        }
        else {
            if (this._btn == null) {
                this._btn = BitmapRes.create(this._visible ? "main_minBtn_png" : "main_maxBtn_png", -68, 20);
                this._btn.touchEnabled = true;
                this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._btnContainer.addChild(this._btn);
            }
        }
    };
    ActivityIcon.prototype.onClickHandler = function (e) {
        if (this._isMoving)
            return;
        this.switch(!this._visible);
    };
    ActivityIcon.RIGHT = 1;
    ActivityIcon.TOP = 2;
    return ActivityIcon;
}(BaseRender));
__reflect(ActivityIcon.prototype, "ActivityIcon");
//# sourceMappingURL=ActivityIcon.js.map