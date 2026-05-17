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
var LifeGridSeparateItem = (function (_super) {
    __extends(LifeGridSeparateItem, _super);
    function LifeGridSeparateItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridSeparate", "LifeGridSeparateItemSkin");
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    LifeGridSeparateItem.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
    };
    LifeGridSeparateItem.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    LifeGridSeparateItem.prototype.removeEvent = function () {
        if (this._levAni)
            this._levAni.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LifeGridSeparateItem.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LifeGridSeparateItem.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.darwData();
    };
    LifeGridSeparateItem.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.darwData();
    };
    LifeGridSeparateItem.prototype.setData = function (data) {
        this._data = data;
        this._cvo = LifeGridCVO.getDataInfo(this._data);
        this._itemcvo = data.cvo;
        this._type = this._itemcvo.type;
        if (this._type == ItemsType.TYPE_LIFEGRID_SPAR) {
            //命格晶石每次必定分解
            this._statu = true;
        }
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridSeparateItem.prototype.darwData = function () {
        this._goods.setCvo(this._itemcvo);
        var name = this._itemcvo.name + "Lv." + this._cvo.lev;
        name = HtmlUtil.addColorTag(name, this._itemcvo.colorStr);
        HtmlUtil.setTextFlow(this._nameTxt, name);
        var attvos = this._cvo.attrVos();
        var str;
        if (attvos[0]) {
            str = attvos[0].desc(false, Color.GREEN_STR);
            HtmlUtil.setTextFlow(this._attrTxt1, str);
        }
        else
            this._attrTxt1.text = "";
        if (attvos[1]) {
            str = attvos[1].desc(false, Color.GREEN_STR);
            HtmlUtil.setTextFlow(this._attrTxt2, str);
        }
        else {
            this._attrTxt2.text = "";
        }
        if (this._type == ItemsType.TYPE_LIFEGRID_SPAR) {
            //命格晶石每次必定分解
            this._effImg.visible = true;
        }
    };
    Object.defineProperty(LifeGridSeparateItem.prototype, "itemId", {
        get: function () {
            return this._data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LifeGridSeparateItem.prototype, "cvo", {
        get: function () {
            return this._cvo;
        },
        enumerable: true,
        configurable: true
    });
    LifeGridSeparateItem.prototype.setEffectImg = function () {
        if (this._type == ItemsType.TYPE_LIFEGRID_SPAR) {
            return;
        }
        if (this._checkBoo)
            return;
        this._statu = this._effImg.visible = !this._effImg.visible;
    };
    LifeGridSeparateItem.prototype.setCheck = function (value) {
        if (this._type == ItemsType.TYPE_LIFEGRID_SPAR) {
            return;
        }
        this._checkBoo = value;
        this._statu = this._effImg.visible = value;
    };
    Object.defineProperty(LifeGridSeparateItem.prototype, "statu", {
        /**
         * 选中状态
         */
        get: function () {
            return this._statu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LifeGridSeparateItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    LifeGridSeparateItem.prototype.clear = function () {
        this._goods.clear();
        this._checkBoo = false;
        this._nameTxt.text = "";
        this._data = null;
        this._effImg.visible = false;
    };
    LifeGridSeparateItem.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridSeparateItem.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    /** 翻放特效 */
    LifeGridSeparateItem.prototype.playAniEff = function () {
        if (this._levAni == null) {
            this._levAni = Manager.animation.createPanelLifeGridAnimation("lifeGridmgfj", "lifeGridPanel");
            this.addChild(this._levAni);
            this._levAni.x = this._goods.x - 79;
            this._levAni.y = this._goods.y - 77;
            this._levAni.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
        }
        else {
            this._levAni.visible = true;
            this._levAni.play();
        }
    };
    LifeGridSeparateItem.prototype.onShowBlastCompleteHandler = function () {
        this._levAni.visible = false;
        this.dispatchEvent(new GlobalEvent(GlobalEvent.ANIMATION_PLAY_COMPLETE));
    };
    LifeGridSeparateItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._effImg, this._goods);
        ObjectUtil.disposes(this._nameTxt, this._attrTxt1, this._attrTxt2);
        this._effImg = null;
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt = null;
        this._attrTxt1 = null;
        this._attrTxt2 = null;
        this._data = null;
        this._cvo = null;
        this._itemcvo = null;
        if (this._levAni) {
            Manager.pool.push(this._levAni);
            this._levAni = null;
        }
    };
    return LifeGridSeparateItem;
}(UIComponent));
__reflect(LifeGridSeparateItem.prototype, "LifeGridSeparateItem");
//# sourceMappingURL=LifeGridSeparateItem.js.map