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
 * 命格球
 * pzx
 * create 17.12.25
 */
var LifeGridBallItem = /** @class */ (function (_super) {
    __extends(LifeGridBallItem, _super);
    function LifeGridBallItem() {
        var _this = _super.call(this) || this;
        /**初始化特效id */
        _this._initEffId = -1;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridBallItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    LifeGridBallItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._isclock = false;
        this._mask = Manager.pool.create(egret.Shape);
        this.addChild(this._mask);
        this._mask.graphics.beginFill(0, 1);
        this._mask.graphics.drawCircle(0, 0, 42);
        this._mask.x = 57;
        this._mask.y = 56;
        this._ballImg.mask = this._mask;
    };
    LifeGridBallItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLifeGrid().addEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT, this.onReturnLvUpHandler, this);
    };
    LifeGridBallItem.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getLifeGrid().removeEventListener(LifeGridEvent.LIFEGRID_LVUP_EVENT, this.onReturnLvUpHandler, this);
        if (this._thEffectAni)
            this._thEffectAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LifeGridBallItem.prototype.onClickHandler = function (e) {
        if (this._data) {
            var view = Manager.view.show(53 /* LifeGridLeveUpView */);
            view.setData(this._data, this.id, this._ketihuanImg.visible);
            return;
        }
        if (this._isclock) {
            var view = Manager.view.show(52 /* LifeGridBagView */, this.id);
        }
        else {
            var cvo = LifeGridCVO.getholeCvo(this.id);
            var conticion = new ConditionVO(cvo.cond);
            var str = StringUtils.setParam(LangCVO.getContent("lifeGrid10"), conticion.value2);
            FloatTips.addTips(str, Color.RED);
        }
    };
    /** 升级返回 */
    LifeGridBallItem.prototype.onReturnLvUpHandler = function (e) {
        if (this._data && e.params == this.id) {
            var cvo = LifeGridCVO.getDataInfo(this._data);
            if (cvo.lev_loss != "") {
                var loss = new GainLossVO(cvo.lev_loss);
                this._redIcon.visible = this._ketihuanImg.visible || loss.isEnough();
            }
        }
    };
    LifeGridBallItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LifeGridBallItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
    };
    LifeGridBallItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.darwData();
    };
    LifeGridBallItem.prototype.setData = function (data) {
        this._data = data;
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridBallItem.prototype.darwData = function () {
        this._redIcon.visible = false;
        if (this._data) {
            this._ballImg.visible = true;
            this._lockImg.visible = this._addImg.visible = false;
            this._ballImg.load(Manager.path.getIconPath(this._data.cvo.imgId));
            this._guangImg.visible = false;
            this._lvGroup.visible = true;
            var vl = this._data.infoList[0].value;
            this._lvTxt.text = "" + vl;
            var cvo = LifeGridCVO.getDataInfo(this._data);
            this._ketihuanImg.visible = Manager.model.getLifeGrid().getIsSenior([this._data]);
            this._redIcon.visible = this._ketihuanImg.visible;
        }
        else {
            this._lvGroup.visible = false;
            var cvo = LifeGridCVO.getholeCvo(this.id);
            var conticion = new ConditionVO(cvo.cond);
            if (conticion.isSatisfy()) {
                this._addImg.visible = true;
                this._lockImg.visible = false;
                this._ballImg.visible = false;
                this._isclock = true;
                this._guangImg.visible = true;
                if (Manager.model.getItems().lifeGridBagList.length > 0) {
                    this._redIcon.visible = true;
                }
            }
            else {
                this._addImg.visible = false;
                this._lockImg.visible = true;
                this._ballImg.visible = false;
                this._isclock = false;
                this._guangImg.visible = false;
            }
        }
        this.dispatchEvent(new LifeGridEvent(LifeGridEvent.LV_UPGRADE_EVENT, this.id));
    };
    LifeGridBallItem.prototype.playEffect = function (data) {
        this._data = data;
        if (this._thEffectAni == null) {
            this._thEffectAni = Manager.animation.createPanelLifeGridAnimation("lifeGridmgjm", "lifeGridPanel");
            this._thEffectAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
            this.addChild(this._thEffectAni);
            this._thEffectAni.x = -93;
            this._thEffectAni.y = -89;
        }
        else {
            this._thEffectAni.visible = true;
            this._thEffectAni.play();
        }
    };
    LifeGridBallItem.prototype.onShowBlastCompleteHandler = function () {
        this._thEffectAni.visible = false;
        this.invalidate(InvalidationType.DATA);
    };
    Object.defineProperty(LifeGridBallItem.prototype, "losslv", {
        /** 等级 若可以升级返回当前等级，不可升级，返回０ */
        get: function () {
            if (!this._data)
                return 0;
            var cvo = LifeGridCVO.getDataInfo(this._data);
            if (cvo.lev_loss != "") {
                var loss = new GainLossVO(cvo.lev_loss);
                if (loss.isEnough()) {
                    return cvo.lev;
                }
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /** 显示升级消耗小红点 */
    LifeGridBallItem.prototype.setLossRedIcon = function (value) {
        if (!this._data)
            return;
        this._redIcon.visible = this._ketihuanImg.visible || value;
    };
    LifeGridBallItem.prototype.getItemCvo = function () {
        if (this._data) {
            return this._data.cvo;
        }
    };
    LifeGridBallItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridBallItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridBallItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._ketihuanImg, this._lockImg, this._addImg, this._mask, this._guangImg, this._lvGroup, this._redIcon);
        this._lvTxt.dispose();
        this._lvTxt = null;
        this._lvGroup = null;
        this._guangImg = null;
        Manager.pool.push(this._ballImg);
        this._ballImg = null;
        this._lockImg = null;
        this._addImg = null;
        this._data = null;
        Manager.pool.push(this._mask);
        this._mask = null;
        this.id = 0;
        this._redIcon = null;
        this._ketihuanImg = null;
        if (this._thEffectAni) {
            this.removeChild(this._thEffectAni);
            Manager.pool.push(this._thEffectAni);
            this._thEffectAni = null;
        }
    };
    return LifeGridBallItem;
}(UIComponent));
//# sourceMappingURL=LifeGridBallItem.js.map