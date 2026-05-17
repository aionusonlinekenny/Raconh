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
 * 排行榜第1名信息视图
 * luzhihong
 * create 2017-11-03
 */
var RankItem0 = /** @class */ (function (_super) {
    __extends(RankItem0, _super);
    function RankItem0() {
        var _this = _super.call(this) || this;
        _this._type = -1;
        _this.touchChildren = true;
        _this._model = Manager.model.getRank();
        _this.skinName = Manager.path.getSkinName("rank", "RankItemSkin0");
        return _this;
    }
    RankItem0.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._bubbleIcon.visible = false;
        this._back.load(Manager.path.rankPath("rank_back.png"));
        this._power = Manager.pool.create(NumImgView2);
        this._power.x = this._powerBack.x + 155;
        this._power.y = this._powerBack.y + 15;
        this.addChild(this._power);
    };
    RankItem0.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._btnWorship.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.updateWorship, this);
    };
    RankItem0.prototype.removeEvent = function () {
        this._btnWorship.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.updateWorship, this);
        _super.prototype.removeEvent.call(this);
    };
    Object.defineProperty(RankItem0.prototype, "type", {
        set: function (value) {
            if (this._type == value)
                return;
            this._type = value;
            this.setValueName();
            var titleID = [5001, 5002, 5003, 5004, 5005, 5006, 5007][this._type];
            var titleCVO = TitleCVO.getCVO(titleID);
            this._titleImg.load(titleCVO ? Manager.path.getTitlePath(titleCVO.resID) : null);
            if (this._type == RankConst.TYPE_POWER) {
                ObjectUtil.adds(this, this._btnWorship, this._bubbleIcon);
                this.invalidate("drawWorship");
            }
            else {
                ObjectUtil.removes(this._btnWorship, this._bubbleIcon);
            }
            // this.invalidate("drawWorship");
        },
        enumerable: true,
        configurable: true
    });
    RankItem0.prototype.setValueName = function () {
        var tempX = 385;
        switch (this._type) {
            case RankConst.TYPE_POWER:
            case RankConst.TYPE_PET:
            case RankConst.TYPE_MING_GE:
                this._imgValueName.source = "rank_zhanli_png";
                break;
            case RankConst.TYPE_LEVEL:
                this._imgValueName.source = "rank_level_png";
                break;
            case RankConst.TYPE_JIE_XUE:
                this._imgValueName.source = "rank_jingjie_png";
                break;
            case RankConst.TYPE_GEM:
            case RankConst.TYPE_SOUL:
                this._imgValueName.source = "rank_total_level_png";
                tempX = 351;
                break;
        }
        this._imgValueName.x = tempX;
    };
    Object.defineProperty(RankItem0.prototype, "info", {
        set: function (value) {
            if (this._info == value)
                return;
            this._info = value;
            this.invalidate("drawByInfo");
        },
        enumerable: true,
        configurable: true
    });
    RankItem0.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawWorship"))
            this.drawWorship();
        if (this.isInvalid("drawByInfo"))
            this.drawByInfo();
    };
    RankItem0.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawByInfo();
        this.drawWorship();
    };
    RankItem0.prototype.onClickHandler = function (e) {
        if (e === void 0) { e = null; }
        if (this._info)
            Manager.control.getRank().worship(this._type, this._info.id);
    };
    RankItem0.prototype.updateWorship = function (e) {
        this.invalidate("drawWorship");
    };
    RankItem0.prototype.drawByInfo = function () {
        if (this._info != null) {
            // this.showAnimation(this._info.career);
            this._headImg.load(Manager.path.rankPath("role" + this._info.career + ".png"));
            this._txtName.text = this._info.name;
            this._power.setValue(this._info.value, "nums_fighting_", 25);
            this._btnWorship.visible = true;
        }
        else {
            // if(this._roleAni) Manager.pool.push(this._roleAni);
            this._headImg.load(null);
            this._txtName.text = LangCVO.getContent("rank6"); //虚位以待
            this._power.setValue(0, "nums_fighting_", 25);
            this._btnWorship.visible = false;
            this._bubbleIcon.visible = false;
        }
    };
    RankItem0.prototype.drawWorship = function () {
        var hasWorship = this._model.hasWorship(this._type);
        this._btnWorship.enabled = !hasWorship;
        this._bubbleIcon.visible = !hasWorship;
    };
    // private showAnimation(career:number):void
    // {
    // 	if(this._roleAni) Manager.pool.push(this._roleAni);
    // 	this._roleAni = Manager.pool.create(RoleAnimation, this._info.fashion, this._info.weapon, this._info.cloak);
    // 	this.addChild(this._roleAni);
    // 	this._roleAni.scaleX = this._roleAni.scaleY = 0.65;
    // 	this._roleAni.x = -240;
    // 	this._roleAni.y = -60;
    // }
    RankItem0.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // if(this._roleAni) Manager.pool.push(this._roleAni);
        ObjectUtil.disposes(this._back, this._txtName, this._btnWorship, this._power, this._titleImg);
        ObjectUtil.removes(this._bubbleIcon, this._powerBack);
        this._model = null;
        this._info = null;
        this._back = null;
        this._txtName = null;
        this._btnWorship = null;
        this._bubbleIcon = null;
        this._powerBack = null;
        this._power = null;
        this._titleImg = null;
    };
    return RankItem0;
}(UIComponent));
//# sourceMappingURL=RankItem0.js.map