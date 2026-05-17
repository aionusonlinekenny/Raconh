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
var BaseGoods = /** @class */ (function (_super) {
    __extends(BaseGoods, _super);
    function BaseGoods() {
        var _this = _super.call(this) || this;
        _this._count = 0;
        _this._strengthenLevel = 0;
        _this._curAmount = 0;
        _this._totalAmount = 0;
        _this._star = 0;
        /** 特效资源名 */
        _this._pathEff = "";
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.skinName = Manager.path.getSkinName("uiCommon", "BaseGoodsSkin");
        return _this;
    }
    BaseGoods.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
        this.x = 0;
        this.y = 0;
    };
    BaseGoods.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
        this.touchEnabled = true;
        this.touchChildren = false;
        this.clear();
    };
    BaseGoods.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (this._itemSelect && this._itemSelect.parent)
            this._itemSelect.parent.removeChild(this._itemSelect);
        //this.showStar();
        this._jieTxt.visible = this._jieImg.visible = false;
    };
    BaseGoods.prototype.addEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickFun, this);
    };
    BaseGoods.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickFun, this);
    };
    BaseGoods.prototype.clickFun = function (e) {
        if (this._cvo) {
            if (this._cvo.group == 1) {
                Manager.view.show(20 /* BagEquipTips */, this._cvo);
            }
            else {
                Manager.view.show(9 /* ItemsTips */, this._cvo);
            }
        }
    };
    BaseGoods.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
        this.drawItemAmout();
        this.drawCount();
    };
    BaseGoods.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawCount"))
            this.drawCount();
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
        if (this.isInvalid("drawStrengthenLevel"))
            this.drawStrengthenLevel();
        if (this.isInvalid("drawItemAmout"))
            this.drawItemAmout();
        if (this.isInvalid("drawBgHide"))
            this.drawBgHide();
    };
    Object.defineProperty(BaseGoods.prototype, "baseId", {
        get: function () {
            return this._baseId;
        },
        set: function (value) {
            if (this._baseId == value) {
                return;
            }
            this._baseId = value;
            this._cvo = ItemsCVO.getCvo(this._baseId);
            this.invalidate(InvalidationType.DATA);
        },
        enumerable: true,
        configurable: true
    });
    BaseGoods.prototype.drawData = function () {
        if (!this._cvo)
            return;
        this.initBackBgImg();
        this.initItemImg();
        this.showjie();
    };
    Object.defineProperty(BaseGoods.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    BaseGoods.prototype.setCvo = function (value) {
        if (value === void 0) { value = null; }
        if (value == null) {
            this.clear();
            return;
        }
        if (this._cvo && this._cvo.id == value.id) {
            return;
        }
        this._cvo = value;
        this._baseId = this._cvo.id;
        this.invalidate(InvalidationType.DATA);
    };
    Object.defineProperty(BaseGoods.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            if (this._count == value)
                return;
            this._count = value;
            this.invalidate("drawCount");
        },
        enumerable: true,
        configurable: true
    });
    BaseGoods.prototype.drawCount = function () {
        if (this._count <= 1) {
            this._countTxt.text = "";
            if (this._curAmount == 0)
                this._countkunImg.visible = false;
        }
        else {
            this._countTxt.text = GameUtil.getNumShortStr(this._count);
            this._countkunImg.visible = true;
        }
    };
    BaseGoods.prototype.setStrengthenLevel = function (value, isStrengthen) {
        if (isStrengthen === void 0) { isStrengthen = false; }
        if (this._strengthenLevel == value)
            return;
        this._strengthenLevel = value;
        this._isStrengthen = isStrengthen;
        this.invalidate("drawStrengthenLevel");
    };
    Object.defineProperty(BaseGoods.prototype, "strengthenLevel", {
        get: function () {
            return this._strengthenLevel;
        },
        enumerable: true,
        configurable: true
    });
    BaseGoods.prototype.drawStrengthenLevel = function () {
        if (this._strengthenLevel < 1) {
            this._strengthenLevelTxt.text = "";
            if (this._count < 1)
                this._countkunImg.visible = false;
        }
        else {
            if (this._isStrengthen)
                this._strengthenLevelTxt.text = "+" + this._strengthenLevel;
            else
                this._strengthenLevelTxt.text = "" + this._strengthenLevel;
            this._countkunImg.visible = true;
        }
    };
    BaseGoods.prototype.itemAmount = function (value1, value2) {
        if (this._totalAmount == value1 && this._curAmount == value2)
            return;
        this._totalAmount = value1;
        this._curAmount = value2;
        this.invalidate("drawItemAmout");
    };
    BaseGoods.prototype.drawItemAmout = function () {
        if (this._curAmount > 0) {
            if (this._totalAmount >= this._curAmount)
                HtmlUtil.setTextFlow(this._amountTxt, HtmlUtil.addColorTag(String(this._totalAmount), "#ffffff") + "/" + HtmlUtil.addColorTag(String(this._curAmount), "#ffffff"));
            else
                HtmlUtil.setTextFlow(this._amountTxt, HtmlUtil.addColorTag(String(this._totalAmount), "#ff0000") + "/" + HtmlUtil.addColorTag(String(this._curAmount), "#ffffff"));
            this._countkunImg.visible = true;
        }
        else {
            this._amountTxt.text = "";
            this._countkunImg.visible = false;
        }
    };
    Object.defineProperty(BaseGoods.prototype, "curAmount", {
        get: function () {
            return this._curAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGoods.prototype, "totalAmount", {
        get: function () {
            return this._totalAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGoods.prototype, "amount", {
        set: function (value) {
            this._amountTxt.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGoods.prototype, "bind", {
        get: function () {
            return this._bind;
        },
        set: function (boo) {
            this._bind = boo;
        },
        enumerable: true,
        configurable: true
    });
    BaseGoods.prototype.initItemImg = function () {
        if (!this._cvo)
            return;
        if (this._path != null)
            Manager.loader.remove(this._path, this.onLoadComplete, this);
        this._path = Manager.path.getIconPath(this._cvo.imgId);
        Manager.loader.load(this._path, this.onLoadComplete, this, ResourceGCType.COMMON);
    };
    BaseGoods.prototype.onLoadComplete = function (loader) {
        this._itemImg.texture = loader.data;
        if (this._callback) {
            this._callback.call(this._thisObj, this._equipLocation);
        }
    };
    BaseGoods.prototype.initBackBgImg = function () {
        if (this._cvo.quality > 1) {
            this._backbgImg.source = "common_item_" + this._cvo.quality + "_png";
        }
        else {
            this._backbgImg.source = "";
        }
        this.qualtyEff();
    };
    BaseGoods.prototype.qualtyEff = function () {
        if (!this._cvo)
            return;
        if (this._cvo.quality == 5) {
            this.setEffect("itemOrange2Eff");
        }
        else if (this._cvo.quality == 6) {
            this.setEffect("itemRedEff"); //itemRedEff
        }
        else {
            if (!this._lossVo || this._lossVo.effect == "" || !this._lossVo.effect) {
                this.setEffect();
            }
        }
    };
    BaseGoods.prototype.callback = function (func, thisObj, local) {
        this._callback = func;
        this._thisObj = thisObj;
        this._equipLocation = local;
    };
    Object.defineProperty(BaseGoods.prototype, "itemImgTexture", {
        get: function () {
            return this._itemImg.texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGoods.prototype, "itemImgBitmapData", {
        get: function () {
            return this._itemImg.bitmapData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGoods.prototype, "bgImg", {
        get: function () {
            return this._bgImg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGoods.prototype, "selected", {
        set: function (value) {
            // this._itemSelect.visible = value;
            if (value)
                if (!this._itemSelect.parent)
                    this.addChildAt(this._itemSelect, 1);
                else if (this._itemSelect.parent)
                    this.removeChild(this._itemSelect);
        },
        enumerable: true,
        configurable: true
    });
    BaseGoods.prototype.setGainLossVO = function (value) {
        this._lossVo = value;
        this.count = this._lossVo.num;
        if (this._lossVo.effect)
            this.setEffect(this._lossVo.effect);
        if (this._baseId == this._lossVo.baseId) {
            return;
        }
        this._cvo = ItemsCVO.getCvo(this._baseId);
        this.baseId = this._lossVo.baseId;
        this.bind = this._lossVo.bind;
        //this.invalidate("drawLossVo");
    };
    /**设置星星 */
    BaseGoods.prototype.setStar = function (value) {
        this._star = value;
        if (this._loadComplete) {
            this.showStar();
        }
    };
    BaseGoods.prototype.showStar = function () {
        for (var i = 1; i < 4; i++) {
            this["_star" + i].visible = i <= this._star;
        }
    };
    BaseGoods.prototype.showjie = function () {
        var leve = this._cvo.needLevel;
        if (this._cvo.group == 1 && leve > 1000) {
            this._jieTxt.visible = this._jieImg.visible = true;
            this._jieTxt.text = String(leve).substr(2, 1) + LangCVO.getContent("common18");
        }
        else {
            this._jieTxt.visible = this._jieImg.visible = false;
        }
    };
    /**物品特效 */
    BaseGoods.prototype.setEffect = function (path) {
        if (path === void 0) { path = ""; }
        if (path == "") {
            this._pathEff = "";
            if (this._itemAni) {
                Manager.pool.push(this._itemAni);
                this._itemAni = null;
            }
            return;
        }
        if (this._pathEff == path) {
            return;
        }
        if (this._itemAni) {
            Manager.pool.push(this._itemAni);
            this._itemAni = null;
        }
        this._itemAni = Manager.animation.createEffectAnimation(path);
        this.addChild(this._itemAni);
        this._itemAni.x = -57;
        this._itemAni.y = -51;
        this._pathEff = path;
    };
    /**
     * color2 是否带物品的颜色 默认否
     */
    BaseGoods.prototype.getName = function (color2) {
        if (color2 === void 0) { color2 = false; }
        if (this._cvo) {
            if (color2) {
                return HtmlUtil.addColorTag(this._cvo.name, this._cvo.colorStr);
            }
            return this._cvo.name;
        }
        return null;
    };
    BaseGoods.prototype.clear = function () {
        if (this._path != null)
            Manager.loader.remove(this._path, this.onLoadComplete, this);
        this._path = null;
        this.baseId = 0;
        this._itemImg.texture = null;
        this.setStrengthenLevel(0);
        this.amount = "";
        this._lossVo = null;
        this._cvo = null;
        this._backbgImg.source = "";
        this._countTxt.text = "";
        this._strengthenLevelTxt.text = "";
        this._amountTxt.text = "";
        this._bind = false;
        this._equipLocation = 0;
        this._callback = null;
        this._thisObj = null;
        this._strengthenLevel = 0;
        this._curAmount = 0;
        this._totalAmount = 0;
        this._loadComplete = true;
        this._count = 0;
        this._countkunImg.visible = false;
        this._star1.visible = false;
        this._star2.visible = false;
        this._star3.visible = false;
        this._star = 0;
        this._jieTxt.visible = this._jieImg.visible = false;
        this._isStrengthen = false;
        this._pathEff = "";
        if (this._itemAni) {
            Manager.pool.push(this._itemAni);
            this._itemAni = null;
        }
        this._isBgShow = true;
        this.visible = true;
    };
    BaseGoods.prototype.setBgHied = function (value) {
        this._isBgShow = value;
        this.invalidate("drawBgHide");
    };
    BaseGoods.prototype.drawBgHide = function () {
        this._bgImg.visible = this._isBgShow;
    };
    BaseGoods.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._loadComplete) {
            if (this._path != null)
                Manager.loader.remove(this._path, this.onLoadComplete, this);
            this._path = null;
            ObjectUtil.remove(this._bgImg);
            this._bgImg = null;
            ObjectUtil.remove(this._itemSelect);
            this._itemSelect = null;
            ObjectUtil.remove(this._itemImg);
            this._itemImg = null;
            ObjectUtil.remove(this._countkunImg);
            this._countkunImg = null;
            ObjectUtil.remove(this._backbgImg);
            this._backbgImg = null;
            this._countTxt.dispose();
            this._countTxt = null;
            this._strengthenLevelTxt.dispose();
            this._strengthenLevelTxt = null;
            this._amountTxt.dispose();
            this._amountTxt = null;
            ObjectUtil.remove(this._star1);
            ObjectUtil.remove(this._star2);
            ObjectUtil.remove(this._star3);
            this._star1 = null;
            this._star2 = null;
            this._star3 = null;
            ObjectUtil.remove(this._jieImg);
            this._jieImg = null;
            this._jieTxt.dispose();
            this._jieTxt = null;
            this.setEffect();
        }
        this._cvo = null;
        this._lossVo = null;
    };
    return BaseGoods;
}(UIComponent));
//# sourceMappingURL=BaseGoods.js.map