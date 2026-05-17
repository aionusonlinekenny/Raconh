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
 * 缥缈录怪物球体
 * Simon
 * 2018.3.14
 */
var MaterialBallItem = (function (_super) {
    __extends(MaterialBallItem, _super);
    function MaterialBallItem() {
        var _this = _super.call(this) || this;
        _this._isInited = false;
        _this._isShowFightAndItem = true;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("material", "MaterialBallItemSkin");
        return _this;
    }
    MaterialBallItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchEnabled = true;
        this.touchChildren = false;
        this._monsterGroup.touchEnabled = false;
        this._kill1.touchEnabled = false;
        this._kill2.touchEnabled = false;
        this._kill3.touchEnabled = false;
        this._killImgList = [this._kill1, this._kill2, this._kill3];
        if (this._quanImg == null) {
            this._quanImg = Manager.pool.create(BitmapRemote);
            this._quanImg.y = -20;
            this.addChildAt(this._quanImg, 0);
            this._quanImg.load(Manager.path.getPanelMaterialPath("material_quan", "png"));
        }
        this._monsterImgList = [];
        if (this._monster1 == null) {
            this._monster1 = Manager.pool.create(BitmapRemote);
            this._monster1.touchEnabled = true;
            this._monster1.x = 142;
            this._monster1.y = 127;
            this._monsterGroup.addChild(this._monster1);
            FilterUtil.setGrayFilter(this._monster1);
            this._monsterImgList.push(this._monster1);
        }
        if (this._monster2 == null) {
            this._monster2 = Manager.pool.create(BitmapRemote);
            this._monster2.touchEnabled = true;
            this._monster2.x = 280;
            this._monster2.y = 123;
            this._monsterGroup.addChild(this._monster2);
            FilterUtil.setGrayFilter(this._monster2);
            this._monsterImgList.push(this._monster2);
        }
        if (this._monster3 == null) {
            this._monster3 = Manager.pool.create(BitmapRemote);
            this._monster3.touchEnabled = true;
            this._monster3.x = 165;
            this._monster3.y = 283;
            this._monsterGroup.addChild(this._monster3);
            FilterUtil.setGrayFilter(this._monster3);
            this._monsterImgList.push(this._monster3);
        }
        if (!this._fightView) {
            this._fightView = Manager.pool.create(NumImgView2);
            this._fightView.x = 280;
            this._fightView.y = 477;
            this.addChild(this._fightView);
        }
        if (!this._awardSp) {
            this._awardSp = Manager.pool.create(Sprite);
            this.addChild(this._awardSp);
        }
    };
    MaterialBallItem.prototype.initData = function () {
        this._model = Manager.model.getMaterialCopy();
        this._passCellId = this._model.getPassCellByType(this._type);
        var passCellId = 0;
        var info;
        if (this._passCellId == 0) {
            info = MaterialCopyCVO.getFirstCell(this._type);
            if (info)
                passCellId = info.cell;
        }
        this.setInfo();
        for (var i = 0; i < 3; i++) {
            if (this._passCellId >= this._firstCellId + i) {
                this._monsterImgList[i].filters = [];
                this._killImgList[i].visible = true;
            }
            else if (this._passCellId + 1 == this._firstCellId + i || info && passCellId == this._firstCellId + i && Manager.model.self.attrInfo.fight >= info.fight) {
                this._monsterImgList[i].filters = [];
                this._killImgList[i].visible = false;
            }
            else {
                FilterUtil.setGrayFilter(this._monsterImgList[i]);
                this._killImgList[i].visible = false;
            }
        }
        this.dispatchEvent(new MaterialEvent(MaterialEvent.MATERIAL_CHECK_CAN_FIGHT));
        this._fightView.setValue(this._fight, "nums_lifegrid_", 20);
        info = MaterialCopyCVO.getCellInfo(this._firstCellId + 2);
        if (info) {
            this._itemList = [];
            for (var i = 0; i < info.passAward.length; i++) {
                var item = Manager.pool.create(BaseGoods);
                item.setGainLossVO(info.passAward[i]);
                item.x = i * 120;
                item.y = 500;
                this._awardSp.addChild(item);
                this._itemList.push(item);
            }
            this._awardSp.width = info.passAward.length * 120;
            this._awardSp.x = Math.round((this.width - this._awardSp.width) / 2) - 15;
        }
        this._isInited = true;
        this.showFightAndItemHandler();
    };
    MaterialBallItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._monster1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._monster2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._monster3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    MaterialBallItem.prototype.removeEvent = function () {
        this._monster1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._monster2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._monster3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MaterialBallItem.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._monster1:
                break;
            case this._monster2:
                break;
            case this._monster3:
                break;
        }
    };
    MaterialBallItem.prototype.setInfo = function () {
        this._monster1.load(Manager.path.getPanelMaterialPath("boss/1", "png"));
        this._monster2.load(Manager.path.getPanelMaterialPath("boss/2", "png"));
        this._monster3.load(Manager.path.getPanelMaterialPath("boss/3", "png"));
    };
    Object.defineProperty(MaterialBallItem.prototype, "type", {
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBallItem.prototype, "firstCellId", {
        set: function (value) {
            this._firstCellId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBallItem.prototype, "targetId", {
        get: function () {
            return this._targetId;
        },
        set: function (value) {
            this._targetId = value;
        },
        enumerable: true,
        configurable: true
    });
    MaterialBallItem.prototype.updateFight = function (value) {
        this._fight = value;
    };
    Object.defineProperty(MaterialBallItem.prototype, "curFight", {
        get: function () {
            return this._fight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBallItem.prototype, "isKillAll", {
        get: function () {
            var ret = true;
            for (var i = 0; i < this._killImgList.length; i++) {
                ret = ret && this._killImgList[i].visible;
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterialBallItem.prototype, "showFightAndItem", {
        set: function (value) {
            this._isShowFightAndItem = value;
            this.showFightAndItemHandler();
        },
        enumerable: true,
        configurable: true
    });
    MaterialBallItem.prototype.showFightAndItemHandler = function () {
        if (this._isInited) {
            this._fightImg.visible = this._fightView.visible = this._isShowFightAndItem;
            if (this._itemList && this._itemList.length > 0) {
                for (var i = 0; i < this._itemList.length; i++) {
                    this._itemList[i].visible = this._isShowFightAndItem;
                }
            }
        }
    };
    MaterialBallItem.prototype.reuse = function (thisParent) {
        this._thisParent = thisParent;
        _super.prototype.reuse.call(this);
    };
    MaterialBallItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._monsterGroup, this._quanImg, this._awardSp);
        this._monsterGroup = null;
        if (this._quanImg)
            Manager.pool.push(this._quanImg);
        this._quanImg = null;
        if (this._killImgList) {
            for (var i = 0; i < this._killImgList.length; i++) {
                if (this._killImgList[i] && this._killImgList[i].parent)
                    this._killImgList[i].parent.removeChild(this._killImgList[i]);
                this._killImgList[i] = null;
            }
            this._killImgList = null;
        }
        this._fightImg = null;
        if (this._monsterImgList) {
            for (var i = 0; i < this._monsterImgList.length; i++) {
                if (this._monsterImgList[i])
                    Manager.pool.push(this._monsterImgList[i]);
                this._monsterImgList[i] = null;
            }
            this._monsterImgList = null;
        }
        if (this._fightView)
            Manager.pool.push(this._fightView);
        this._fightView = null;
        this._model = null;
        if (this._itemList) {
            for (var i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i])
                    Manager.pool.push(this._itemList[i]);
                this._itemList[i] = null;
            }
            this._itemList = null;
        }
        if (this._awardSp)
            Manager.pool.push(this._awardSp);
        this._awardSp = null;
    };
    return MaterialBallItem;
}(UIComponent));
__reflect(MaterialBallItem.prototype, "MaterialBallItem");
//# sourceMappingURL=MaterialBallItem.js.map