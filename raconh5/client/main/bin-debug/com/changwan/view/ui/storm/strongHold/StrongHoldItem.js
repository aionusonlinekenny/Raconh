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
 * 江湖风云据点Item
 * luzh
 * 2018-4.20
 */
var StrongHoldItem = (function (_super) {
    __extends(StrongHoldItem, _super);
    function StrongHoldItem() {
        return _super.call(this) || this;
    }
    StrongHoldItem.prototype.start = function () {
        _super.prototype.start.call(this);
        this._back = BitmapRes.create("");
        this.addChild(this._back);
        this._back.filters = [new egret.GlowFilter(0xffffff, 0.5, 3, 3, 3)];
        this._icon = BitmapRes.create("");
        this.addChild(this._icon);
        this._txt = TextField.create(220, 40, Color.GREEN, 24);
        this.addChild(this._txt);
    };
    Object.defineProperty(StrongHoldItem.prototype, "cvo", {
        set: function (value) {
            if (this._cvo == value)
                return;
            this._cvo = value;
            this.x = this._cvo.pos.x;
            this.y = this._cvo.pos.y;
            this._back.source = "storm_mask" + this._cvo.id + "_png";
            if (this._cvo.step == 3)
                this.addRewardsView();
            // else this.disposeRewardsView();
        },
        enumerable: true,
        configurable: true
    });
    StrongHoldItem.prototype.setData = function (ownerType, bossCDEndTime) {
        this._bossCDEndTime = bossCDEndTime;
        if (this.bossCD > 0) {
            this._icon.source = "";
            Manager.render.add(this.countDown, this, 1000);
            this.countDown();
        }
        else {
            Manager.render.remove(this.countDown, this);
            this._txt.text = "";
            if (ownerType == Manager.model.self.attrInfo.guildType) {
                this._icon.source = "storm_danjian_png";
            }
            else {
                this._icon.source = "storm_shuangjian_png";
            }
        }
        if (ownerType == 1)
            FilterUtil.addAliveColorFilter(this._back, Color.BLUE);
        else if (ownerType == 2)
            FilterUtil.addAliveColorFilter(this._back, Color.RED);
        else if (ownerType == 3)
            FilterUtil.addAliveColorFilter(this._back, Color.GREEN);
        else
            FilterUtil.removeColorMat(this._back);
    };
    StrongHoldItem.prototype.countDown = function () {
        this._txt.text = LangCVO.getContent("storm8") + cw.DateUtil.formatStr(this.bossCD, cw.DateUtil.LEFT_HH_MM_SS, true); //保护中：
    };
    Object.defineProperty(StrongHoldItem.prototype, "bossCD", {
        get: function () {
            return this._bossCDEndTime - Manager.model.getLogin().serverTimeInfo.serverTime / 1000;
        },
        enumerable: true,
        configurable: true
    });
    StrongHoldItem.prototype.addRewardsView = function () {
        if (this._rewardsView == null) {
            this._rewardsView = ObjectUtil.createObj(StrongHoldRewardsView);
            this.addChildAt(this._rewardsView, 1);
        }
    };
    StrongHoldItem.prototype.disposeRewardsView = function () {
        if (this._rewardsView) {
            this._rewardsView.dispose();
            this._rewardsView = null;
        }
    };
    StrongHoldItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this.touchEnabled = true;
        this.touchChildren = false;
    };
    StrongHoldItem.prototype.dispose = function () {
        Manager.render.remove(this.countDown, this);
        _super.prototype.dispose.call(this);
        this.disposeRewardsView();
        this._back.filters = [];
        ObjectUtil.pushes(this._back, this._icon, this._txt);
        this._cvo = null;
        this._back = null;
        this._rewardsView = null;
        this._icon = null;
        this._txt = null;
    };
    return StrongHoldItem;
}(RenderSprite));
__reflect(StrongHoldItem.prototype, "StrongHoldItem");
//# sourceMappingURL=StrongHoldItem.js.map