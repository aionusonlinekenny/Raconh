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
 *author Anydo
 *create 2018-1-8
 *description
*/
var ArenaPKHeadView = (function (_super) {
    __extends(ArenaPKHeadView, _super);
    function ArenaPKHeadView() {
        var _this = _super.call(this) || this;
        _this.WIDTH = 720;
        _this.FIGHT_SCALE = 0.8;
        _this.skinName = Manager.path.getSkinName("arena", "ArenaPKHeadViewSkin");
        return _this;
    }
    ArenaPKHeadView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._fightNum1 = Manager.pool.create(NumImgView2);
        this._fightNum1.y = 13;
        this._fightNum1.scaleX = this._fightNum1.scaleY = this.FIGHT_SCALE;
        this.addChild(this._fightNum1);
        this._fightNum2 = Manager.pool.create(NumImgView2);
        this._fightNum2.y = 13;
        this._fightNum2.scaleX = this._fightNum2.scaleY = this.FIGHT_SCALE;
        this.addChild(this._fightNum2);
        this._info1.addEventListener(GameObjectAttrEvent.HP, this.__updateBlood1, this);
        this._info2.addEventListener(GameObjectAttrEvent.HP, this.__updateBlood2, this);
        this._fightNum1.setValue(this._info1.attrInfo.fight, "nums_fighting_", 20);
        this._fightNum2.setValue(this._info2.attrInfo.fight, "nums_fighting_", 20);
        this._fightNum1.x = this._fightLable1.x + 25;
        this._fightNum2.x = 610 - (String(this._info2.attrInfo.fight).length * 23) * this.FIGHT_SCALE;
        this._fightLable2.x = this._fightNum2.x - 25;
        if (this._info1 instanceof MonsterGameObjectInfo) {
            this._txtName1.text = this._info1.cvo.name;
            this._imageHead1.load(Manager.path.getBossHeadPath(this._info1.cvo.url, "c"));
        }
        else {
            this._txtName1.text = this._info1.attrInfo.nickName;
            this._imageHead1.load(Manager.path.getRoleHeadPath(2, this._info1.attrInfo.career));
        }
        if (this._info2 instanceof MonsterGameObjectInfo) {
            this._txtName2.text = this._info2.cvo.name;
            this._imageHead2.load(Manager.path.getBossHeadPath(this._info2.cvo.url, "c"));
        }
        else {
            this._txtName2.text = this._info2.attrInfo.nickName;
            this._imageHead2.load(Manager.path.getRoleHeadPath(2, this._info2.attrInfo.career));
        }
        if (this._info2 instanceof SelfGameObjectInfo) {
            this._strip1.source = "strip_red2_png";
            this._strip2.source = "strip_green2_png";
        }
        else {
            this._strip1.source = "strip_green2_png";
            this._strip2.source = "strip_red2_png";
        }
        this.__updateBlood1(null);
        this.__updateBlood2(null);
    };
    ArenaPKHeadView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArenaPKHeadView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    ArenaPKHeadView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.WIDTH) / 2;
    };
    ArenaPKHeadView.prototype.__updateBlood1 = function (e) {
        this._strip1.width = (this._info1.attrInfo.hp / this._info1.attrInfo.hpMax) * 164;
    };
    ArenaPKHeadView.prototype.__updateBlood2 = function (e) {
        this._strip2.width = (this._info2.attrInfo.hp / this._info2.attrInfo.hpMax) * 164;
    };
    ArenaPKHeadView.prototype.show = function (selfInfo, enemyInfo) {
        this._info1 = selfInfo;
        this._info2 = enemyInfo;
        this.onResizeHandler(null);
        Manager.layer.tipsLayer.addChild(this);
    };
    ArenaPKHeadView.prototype.hide = function () {
        ObjectUtil.remove(this);
        this.dispose();
    };
    ArenaPKHeadView.prototype.dispose = function () {
        if (this._info1 != null)
            this._info1.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood1, this);
        if (this._info2 != null)
            this._info2.removeEventListener(GameObjectAttrEvent.HP, this.__updateBlood2, this);
        this._info1 = null;
        this._info2 = null;
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            this._txtName1.dispose();
            this._txtName1 = null;
            this._txtName2.dispose();
            this._txtName2 = null;
            if (this._fightNum1)
                Manager.pool.push(this._fightNum1);
            this._fightNum1 = null;
            if (this._fightNum2)
                Manager.pool.push(this._fightNum2);
            this._fightNum2 = null;
            this._fightLable2 = null;
            this._fightLable1 = null;
            this._imageHead1.dispose();
            this._imageHead1 = null;
            this._imageHead2.dispose();
            this._imageHead2 = null;
            this._strip1 = null;
            this._strip2 = null;
        }
    };
    return ArenaPKHeadView;
}(UIComponent));
__reflect(ArenaPKHeadView.prototype, "ArenaPKHeadView");
//# sourceMappingURL=ArenaPKHeadView.js.map