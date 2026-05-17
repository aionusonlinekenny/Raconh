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
 * 多物品显示容器
 * Simon
 * 2018.4.9
 */
var ItemObject = (function (_super) {
    __extends(ItemObject, _super);
    function ItemObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**品质图片层列表，以品质分组 */
        _this._bgColorLayer = {};
        /**背景图片列表 */
        _this._bgList = {};
        /**品质图片列表 */
        _this._bgColorList = {};
        /**物品列表 */
        _this._itemList = {};
        /**物品数量背景图列表 */
        _this._countBgImgList = {};
        /**物品数量列表 */
        _this._itemAmountList = {};
        /**星数列表 */
        _this._starList = {};
        /**阶数背景列表 */
        _this._jieImgList = {};
        /**阶数列表 */
        _this._jieNumList = {};
        /**特效列表 */
        _this._effectList = {};
        _this._inited = false;
        _this._selectIndex = -1;
        return _this;
    }
    ItemObject.prototype.start = function () {
        _super.prototype.start.call(this);
        this._bgLayer = Manager.pool.create(Sprite);
        this.addChild(this._bgLayer);
        this._selectLayer = Manager.pool.create(Sprite);
        this.addChild(this._selectLayer);
        if (!this._bgColorLayer)
            this._bgColorLayer = {};
        for (var i = 0; i < 5; i++) {
            var bgColorLayer = Manager.pool.create(Sprite);
            this.addChild(bgColorLayer);
            this._bgColorLayer[i + 2] = bgColorLayer;
        }
        this._baseItemLayer = Manager.pool.create(Sprite);
        this._baseItemLayer.touchChildren = true;
        this.addChild(this._baseItemLayer);
        this._countBgImgLayer = Manager.pool.create(Sprite);
        this.addChild(this._countBgImgLayer);
        this._itemAmountLayer = Manager.pool.create(Sprite);
        this.addChild(this._itemAmountLayer);
        this._starLayer = Manager.pool.create(Sprite);
        this.addChild(this._starLayer);
        this._jieImgLayer = Manager.pool.create(Sprite);
        this.addChild(this._jieImgLayer);
        this._jieNumLayer = Manager.pool.create(Sprite);
        this.addChild(this._jieNumLayer);
        this._effectLayer = Manager.pool.create(Sprite);
        this.addChild(this._effectLayer);
    };
    ItemObject.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawItems();
        this._inited = true;
        if (this._selectIndex != -1)
            this.selectIndex = this._selectIndex;
    };
    ItemObject.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawItems"))
            this.drawItems();
    };
    ItemObject.prototype.drawItems = function () {
        var col = 0;
        var row = 0;
        var itemX;
        var itemY;
        for (var i = 0; i < this._itemInfoList.length; i++) {
            if (col == this._col) {
                col = 0;
                row += 1;
            }
            itemX = col * (ItemObject.ITEM_WIDTH + this._spacing);
            itemY = row * (ItemObject.ITEM_WIDTH + this._spacing);
            /**背景图 */
            var bg = Manager.pool.create(BitmapRes, "common_itemBg_png");
            bg.x = itemX;
            bg.y = itemY;
            this._bgLayer.addChild(bg);
            this._bgList[i] = bg;
            if (this._itemInfoList[i]) {
                /**品质图 */
                var colorBg = Manager.pool.create(BitmapRes, "common_item_" + this._itemInfoList[i].cvo.quality + "_png");
                colorBg.x = 27 + itemX;
                colorBg.y = 27 + itemY;
                this._bgColorLayer[this._itemInfoList[i].cvo.quality].addChild(colorBg);
                this._bgColorList[this._itemInfoList[i].id] = colorBg;
                /**物品item */
                var item = Manager.pool.create(BaseItem, this._itemInfoList[i]);
                item.x = itemX;
                item.y = itemY;
                this._baseItemLayer.addChild(item);
                this._itemList[this._itemInfoList[i].id] = item;
                /**物品数量背景 */
                var countBgImg = Manager.pool.create(BitmapRes, "common_item_amountBg_png");
                countBgImg.x = 56 + itemX;
                countBgImg.y = 90 + itemY;
                if (this._itemInfoList[i].quantity > 1)
                    this._countBgImgLayer.addChild(countBgImg);
                this._countBgImgList[this._itemInfoList[i].id] = countBgImg;
                /**物品数量文本 */
                var countTxt = Manager.pool.create(Label);
                countTxt.fontFamily = "Microsoft YaHei";
                countTxt.textAlign = "right";
                countTxt.width = 90;
                countTxt.height = 24;
                countTxt.x = 20 + itemX;
                countTxt.y = 90 + itemY;
                countTxt.text = this._itemInfoList[i].quantity + "";
                if (this._itemInfoList[i].quantity > 1)
                    this._itemAmountLayer.addChild(countTxt);
                this._itemAmountList[this._itemInfoList[i].id] = countTxt;
                /**星数 */
                var starList = [];
                for (var j = 0; j < 3; j++) {
                    var star = Manager.pool.create(BitmapRes, "common_star_bright_png", null, null, 20, 20);
                    star.x = 92 + itemX;
                    star.y = 28 + 20 * j + itemY;
                    starList.push(star);
                    if (j + 1 <= this._itemInfoList[i].getStar())
                        this._starLayer.addChild(star);
                }
                this._starList[this._itemInfoList[i].id] = starList;
                var isShowJie = this._itemInfoList[i].cvo.group == 1 && this._itemInfoList[i].cvo.needLevel > 1000;
                /**阶数背景 */
                var jieBgImg = Manager.pool.create(BitmapRes, "common_tips_num_back_png");
                jieBgImg.x = 24 + itemX;
                jieBgImg.y = 23 + itemY;
                if (isShowJie)
                    this._jieImgLayer.addChild(jieBgImg);
                this._jieImgList[this._itemInfoList[i].id] = jieBgImg;
                /**阶数文本 */
                var jieTxt = Manager.pool.create(Label);
                jieTxt.fontFamily = "Microsoft YaHei";
                jieTxt.textAlign = "right";
                jieTxt.width = 42;
                jieTxt.height = 21;
                jieTxt.x = 27 + itemX;
                jieTxt.y = 23 + itemY;
                jieTxt.text = "";
                if (isShowJie) {
                    jieTxt.text = String(this._itemInfoList[i].cvo.needLevel).substr(2, 1) + LangCVO.getContent("common18");
                    this._jieNumLayer.addChild(jieTxt);
                }
                this._jieNumList[this._itemInfoList[i].id] = jieTxt;
                this.setEffect(this._itemInfoList[i], itemX, itemY);
            }
            col += 1;
        }
    };
    ItemObject.prototype.setEffect = function (itemInfo, itemX, itemY) {
        if (!this._effectList[itemInfo.id])
            this._effectList[itemInfo.id] = { effectPath: "", itemAni: null };
        var effectPath = "";
        if (itemInfo.cvo.quality == 5) {
            effectPath = "itemOrange2Eff";
        }
        else if (itemInfo.cvo.quality == 6) {
            effectPath = "itemRedEff";
        }
        if (effectPath == "") {
            this._effectList[itemInfo.id].effectPath = "";
            if (this._effectList[itemInfo.id].itemAni)
                Manager.pool.push(this._effectList[itemInfo.id].itemAni);
            this._effectList[itemInfo.id].itemAni = null;
            return;
        }
        if (this._effectList[itemInfo.id].effectPath == effectPath)
            return;
        if (this._effectList[itemInfo.id].itemAni) {
            Manager.pool.push(this._effectList[itemInfo.id].itemAni);
            this._effectList[itemInfo.id].itemAni = null;
        }
        this._effectList[itemInfo.id].itemAni = Manager.animation.createEffectAnimation(effectPath);
        this._effectLayer.addChild(this._effectList[itemInfo.id].itemAni);
        this._effectList[itemInfo.id].itemAni.x = -57 + itemX;
        this._effectList[itemInfo.id].itemAni.y = -51 + itemY;
        this._effectList[itemInfo.id].effectPath = effectPath;
    };
    /**
     * itemInfoList：物品信息列表
     * col:列数
     * spacing:间距
     */
    ItemObject.prototype.reuse = function (itemInfoList, col, spacing) {
        if (col === void 0) { col = 10; }
        if (spacing === void 0) { spacing = 20; }
        this.touchChildren = true;
        this._itemInfoList = itemInfoList;
        this._col = col;
        this._spacing = spacing;
        this.cleanData();
        _super.prototype.reuse.call(this);
    };
    ItemObject.prototype.unuse = function () {
        this.cleanAll();
        _super.prototype.unuse.call(this);
    };
    ItemObject.prototype.cleanData = function () {
        if (this._bgList) {
            for (var i in this._bgList) {
                if (this._bgList[i]) {
                    Manager.pool.push(this._bgList[i]);
                }
                this._bgList[i] = null;
            }
        }
        this._bgList = {};
        if (this._bgColorList) {
            for (var i in this._bgColorList) {
                if (this._bgColorList[i])
                    Manager.pool.push(this._bgColorList[i]);
                this._bgColorList[i] = null;
            }
        }
        this._bgColorList = {};
        if (this._itemList) {
            for (var i in this._itemList) {
                if (this._itemList[i])
                    Manager.pool.push(this._itemList[i]);
                this._itemList[i] = null;
            }
        }
        this._itemList = {};
        if (this._countBgImgList) {
            for (var i in this._countBgImgList) {
                if (this._countBgImgList[i])
                    Manager.pool.push(this._countBgImgList[i]);
                this._countBgImgList[i] = null;
            }
        }
        this._countBgImgList = {};
        if (this._itemAmountList) {
            for (var i in this._itemAmountList) {
                if (this._itemAmountList[i])
                    Manager.pool.push(this._itemAmountList[i]);
                this._itemAmountList[i] = null;
            }
        }
        this._itemAmountList = {};
        if (this._starList) {
            for (var i in this._starList) {
                if (this._starList[i]) {
                    for (var j = 0; j < this._starList[i].length; j++) {
                        if (this._starList[i][j])
                            Manager.pool.push(this._starList[i][j]);
                        this._starList[i][j] = null;
                    }
                    this._starList[i] = null;
                }
            }
        }
        this._starList = {};
        if (this._jieImgList) {
            for (var i in this._jieImgList) {
                if (this._jieImgList[i])
                    Manager.pool.push(this._jieImgList[i]);
                this._jieImgList[i] = null;
            }
        }
        this._jieImgList = {};
        if (this._jieNumList) {
            for (var i in this._jieNumList) {
                if (this._jieNumList[i])
                    Manager.pool.push(this._jieNumList[i]);
                this._jieNumList[i] = null;
            }
        }
        this._jieNumList = {};
        if (this._effectList) {
            for (var i in this._effectList) {
                this._effectList[i].effectPath = null;
                if (this._effectList[i].itemAni)
                    Manager.pool.push(this._effectList[i].itemAni);
                this._effectList[i].itemAni = null;
            }
        }
        this._effectList = {};
    };
    ItemObject.prototype.cleanAll = function () {
        ObjectUtil.removes(this._bgLayer, this._selectLayer, this._baseItemLayer, this._countBgImgLayer, this._itemAmountLayer, this._starLayer, this._jieImgLayer, this._jieNumLayer, this._effectLayer, this._selectImg);
        this.cleanData();
        if (this._bgLayer)
            Manager.pool.push(this._bgLayer);
        this._bgLayer = null;
        if (this._selectLayer)
            Manager.pool.push(this._selectLayer);
        this._selectLayer = null;
        if (this._bgColorLayer) {
            for (var i in this._bgColorLayer) {
                Manager.pool.push(this._bgColorLayer[i]);
                this._bgColorLayer[i] = null;
            }
        }
        this._bgColorLayer = null;
        if (this._baseItemLayer)
            Manager.pool.push(this._baseItemLayer);
        this._baseItemLayer = null;
        if (this._countBgImgLayer)
            Manager.pool.push(this._countBgImgLayer);
        this._countBgImgLayer = null;
        if (this._itemAmountLayer)
            Manager.pool.push(this._itemAmountLayer);
        this._itemAmountLayer = null;
        if (this._starLayer)
            Manager.pool.push(this._starLayer);
        this._starLayer = null;
        if (this._jieImgLayer)
            Manager.pool.push(this._jieImgLayer);
        this._jieImgLayer = null;
        if (this._jieNumLayer)
            Manager.pool.push(this._jieNumLayer);
        this._jieNumLayer = null;
        if (this._effectLayer)
            Manager.pool.push(this._effectLayer);
        this._effectLayer = null;
        if (this._selectImg)
            Manager.pool.push(this._selectImg);
        this._selectImg = null;
        this._itemInfoList = null;
    };
    ItemObject.prototype.getItem = function (id) {
        return this._itemList[id];
    };
    ItemObject.prototype.updateItemInfo = function (itemInfoList) {
        this._itemInfoList = itemInfoList;
        this.cleanData();
        // this.invalidate("drawItems");
        this.drawItems();
    };
    ItemObject.prototype.getItemInfo = function () {
        return this._itemInfoList;
    };
    Object.defineProperty(ItemObject.prototype, "selectIndex", {
        /**
         * 返回当前选中物品序号
         */
        get: function () {
            return this._selectIndex;
        },
        /**
         * 选择某个物品
         */
        set: function (value) {
            this._selectIndex = value;
            if (this._inited) {
                if (this._bgList[this._selectIndex]) {
                    if (this._selectImg && this._selectImg.parent)
                        this._selectLayer.removeChild(this._selectImg);
                    if (!this._selectImg)
                        this._selectImg = Manager.pool.create(BitmapRes, "common_itemBg_select_png");
                    this._selectImg.x = this._bgList[this._selectIndex].x;
                    this._selectImg.y = this._bgList[this._selectIndex].y;
                    this._selectLayer.addChild(this._selectImg);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemObject.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.cleanAll();
        this._bgList = null;
        this._bgColorList = null;
        this._itemList = null;
        this._countBgImgList = null;
        this._itemAmountList = null;
        this._starList = null;
        this._jieImgList = null;
        this._jieNumList = null;
        this._effectList = null;
    };
    ItemObject.ITEM_WIDTH = 141;
    return ItemObject;
}(RenderSprite));
__reflect(ItemObject.prototype, "ItemObject");
//# sourceMappingURL=ItemObject.js.map