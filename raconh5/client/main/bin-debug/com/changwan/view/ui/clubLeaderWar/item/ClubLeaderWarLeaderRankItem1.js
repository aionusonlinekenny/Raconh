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
var ClubLeaderWarLeaderRankItem1 = (function (_super) {
    __extends(ClubLeaderWarLeaderRankItem1, _super);
    function ClubLeaderWarLeaderRankItem1() {
        var _this = _super.call(this) || this;
        _this._model = Manager.model.getClubLeaderWar();
        _this.skinName = Manager.path.getSkinName("clubLeaderWar/item", "ClubLeaderWarLeaderRankItem1Skin");
        return _this;
    }
    ClubLeaderWarLeaderRankItem1.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._back.load(Manager.path.rankPath("rank_back.png"));
        this._power = Manager.pool.create(NumImgView2);
        this._power.x = this._powerBack.x + 150;
        this._power.y = this._powerBack.y + 15;
        this.addChild(this._power);
    };
    Object.defineProperty(ClubLeaderWarLeaderRankItem1.prototype, "info", {
        set: function (value) {
            if (this._info == value)
                return;
            this._info = value;
            this.invalidate("drawByInfo");
        },
        enumerable: true,
        configurable: true
    });
    ClubLeaderWarLeaderRankItem1.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawByInfo"))
            this.drawByInfo();
    };
    ClubLeaderWarLeaderRankItem1.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawByInfo();
    };
    ClubLeaderWarLeaderRankItem1.prototype.drawByInfo = function () {
        if (this._info != null) {
            // this._headImg.load(Manager.path.rankPath("role"+ (this._info.career == 0 ? 2 : 1) +".png"));
            this._headImg.load(Manager.path.rankPath("role" + this._info.career + ".png"));
            this._txtName.text = this._info.nickName;
            this._power.setValue(this._info.fight, "nums_fighting_", 25);
        }
        else {
            this._headImg.load(null);
            this._txtName.text = LangCVO.getContent("rank6"); //虚位以待
            this._power.setValue(0, "nums_fighting_", 25);
        }
    };
    ClubLeaderWarLeaderRankItem1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.disposes(this._back, this._headImg, this._titleImg, this._txtName);
        ObjectUtil.removes(this._powerBack);
        this._model = null;
        this._info = null;
        this._back = null;
        this._headImg = null;
        this._titleImg = null;
        this._txtName = null;
        if (this._power)
            Manager.pool.push(this._power);
        this._power = null;
        this._powerBack = null;
    };
    return ClubLeaderWarLeaderRankItem1;
}(UIComponent));
__reflect(ClubLeaderWarLeaderRankItem1.prototype, "ClubLeaderWarLeaderRankItem1");
//# sourceMappingURL=ClubLeaderWarLeaderRankItem1.js.map