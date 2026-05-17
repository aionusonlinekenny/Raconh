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
var GemItemView = (function (_super) {
    __extends(GemItemView, _super);
    function GemItemView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.skinName = Manager.path.getSkinName("equip", "GemItemViewSkin");
        return _this;
    }
    GemItemView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._kuangList = [this._kuang1, this._kuang2, this._kuang3, this._kuang4];
    };
    Object.defineProperty(GemItemView.prototype, "itemId", {
        get: function () {
            return this._itemId;
        },
        enumerable: true,
        configurable: true
    });
    GemItemView.prototype.setInfo = function (local, itemInfo) {
        this._local = local;
        this._itemInfo = itemInfo;
        this._itemId = this._itemInfo.id;
        if (this._itemInfo) {
            // this._itemBgImg.source = "equip_gem_openBg_png";
            this._addImg.visible = false;
            var level = Number(String(this._itemId).substr(String(this._itemId).length - 2, 2));
            this._itemLv.text = "Lv:" + level;
            this.updateBg(level);
            this._itemName.text = AttrDescTypeEx.getAttrName(this._itemInfo.attrList[0][0]);
            if (this._imgPath != null)
                Manager.loader.remove(this._imgPath, this.onLoadComplete, this);
            this._imgPath = Manager.path.getIconPath(this._itemInfo.imgId);
            Manager.loader.load(this._imgPath, this.onLoadComplete, this, ResourceGCType.COMMON);
        }
    };
    GemItemView.prototype.updateBg = function (level) {
        var index = -1;
        if (level >= 1 && level <= 3)
            index = 0;
        else if (level >= 4 && level <= 6)
            index = 1;
        else if (level >= 7 && level <= 8)
            index = 2;
        else if (level >= 9)
            index = 3;
        for (var i = 0; i < this._kuangList.length; i++) {
            if (i == index)
                this._kuangList[i].visible = true;
            else
                this._kuangList[i].visible = false;
        }
    };
    GemItemView.prototype.onLoadComplete = function (loader) {
        this._gemImg.texture = loader.data;
    };
    GemItemView.prototype.clean = function () {
        this._addImg.visible = true;
        this._itemLv.text = "";
        this._itemName.text = "";
        this._gemImg.texture = null;
        this._redImg.visible = false;
        this._local = -1;
        this._itemInfo = null;
        this._itemId = 0;
        if (this._imgPath != null)
            Manager.loader.remove(this._imgPath, this.onLoadComplete, this);
        this._imgPath = null;
        this._canUseItemId = 0;
        this._itemTips.text = "";
        this._upgradeType = 0;
        for (var i = 0; i < this._kuangList.length; i++)
            this._kuangList[i].visible = false;
        this._upgradeImg.visible = false;
        this._changeImg.visible = false;
    };
    Object.defineProperty(GemItemView.prototype, "canUseItemId", {
        get: function () {
            return this._canUseItemId;
        },
        set: function (value) {
            this._canUseItemId = value;
            this._redImg.visible = (this._canUseItemId == 0 ? false : true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GemItemView.prototype, "upgradeType", {
        get: function () {
            return this._upgradeType;
        },
        set: function (value) {
            this._upgradeType = value;
            if (value == 2) {
                // this._itemTips.text = LangCVO.getContent("equip14");
                this._upgradeImg.visible = true;
            }
            else if (value == 3) {
                // this._itemTips.text = LangCVO.getContent("equip15");
                this._changeImg.visible = true;
            }
            else
                this._itemTips.text = "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GemItemView.prototype, "pos", {
        get: function () {
            return this._local;
        },
        enumerable: true,
        configurable: true
    });
    GemItemView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._kuang1, this._kuang2, this._kuang3, this._kuang4, this._upgradeImg, this._changeImg);
        this._itemBgImg = null;
        this._itemLv = null;
        this._gemImg = null;
        this._itemName = null;
        this._redImg = null;
        this._itemTips = null;
        this._itemInfo = null;
        if (this._imgPath != null)
            Manager.loader.remove(this._imgPath, this.onLoadComplete, this);
        this._imgPath = null;
        this._kuangList = null;
        this._upgradeImg = null;
        this._changeImg = null;
    };
    return GemItemView;
}(UIComponent));
__reflect(GemItemView.prototype, "GemItemView");
//# sourceMappingURL=GemItemView.js.map