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
var LifeGridBuyItem = (function (_super) {
    __extends(LifeGridBuyItem, _super);
    function LifeGridBuyItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridBuy", "LifeGridBuyItemSkin");
        return _this;
    }
    LifeGridBuyItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.configUI();
        this.addEvent();
    };
    LifeGridBuyItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this._cvo = this.data;
        this.darwData();
    };
    LifeGridBuyItem.prototype.configUI = function () {
        this._self = Manager.model.self;
        this._itemsModel = Manager.model.getItems();
    };
    LifeGridBuyItem.prototype.addEvent = function () {
        this._self.addEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onCoinUpdateHandler, this);
        this._buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuyClickHandler, this);
        this._itemsModel.addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.darwData, this);
    };
    LifeGridBuyItem.prototype.onbuyClickHandler = function (e) {
        var frag = this._self.attrInfo.destinyfrig;
        if (frag < this._cvo.price) {
            FloatTips.addTips(LangCVO.getContent("lifeGrid6"), Color.RED);
            return;
        }
        var _itemModel = Manager.model.getItems();
        if (_itemModel.lifeGridTotal - _itemModel.lifeGridBagList.length < 1) {
            var cbi = Manager.pool.create(CallBackInfo, this.onbuyClickCallback, this);
            Manager.tips.showTips(LangCVO.getContent("lifeGrid9"), cbi);
            return;
        }
        var view = Manager.view.show(54 /* LifeGridFuseView */);
        view.setbuyData(this._cvo);
    };
    LifeGridBuyItem.prototype.onbuyClickCallback = function () {
        LifeGridView.view.setTap(LifeGridType.RESOLVE);
    };
    LifeGridBuyItem.prototype.onCoinUpdateHandler = function () {
        this.setBuyBtnColor();
    };
    LifeGridBuyItem.prototype.removeEvent = function () {
        this._self.removeEventListener(GameObjectAttrEvent.DESTINY_FRAG, this.onCoinUpdateHandler, this);
        this._buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onbuyClickHandler, this);
        this._itemsModel.removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.darwData, this);
    };
    LifeGridBuyItem.prototype.darwData = function (e) {
        if (e === void 0) { e = null; }
        if (e && e.params != ItemsType.LIFEGRIDBAG) {
            return;
        }
        var itemCvo = ItemsCVO.getCvo(this._cvo.base_id);
        this._goods.setCvo(itemCvo);
        var name = HtmlUtil.addColorTag(itemCvo.name + "Lv.1", itemCvo.colorStr);
        HtmlUtil.setTextFlow(this._nameTxt, name);
        var cvo = LifeGridCVO.getInfo(this._cvo.base_id, 1); //固定读1级属性，有事找策划
        var attvoArr = cvo.attrVos();
        if (attvoArr[0]) {
            attvoArr[0].sign = "+";
            HtmlUtil.setTextFlow(this._attrTxt0, attvoArr[0].desc(false, Color.GREEN_STR));
        }
        else {
            this._attrTxt0.text = "";
        }
        if (attvoArr[1]) {
            attvoArr[1].sign = "+";
            HtmlUtil.setTextFlow(this._attrTxt1, attvoArr[1].desc(false, Color.GREEN_STR));
        }
        else {
            this._attrTxt1.text = "";
        }
        var condit = new ConditionVO(this._cvo.show_cond);
        var arr = [];
        var infoArr = this._itemsModel.lifeGridList;
        for (var _i = 0, infoArr_1 = infoArr; _i < infoArr_1.length; _i++) {
            var info = infoArr_1[_i];
            if (info)
                arr.push(info);
        }
        infoArr = this._itemsModel.lifeGridBagList;
        for (var _a = 0, infoArr_2 = infoArr; _a < infoArr_2.length; _a++) {
            var info = infoArr_2[_a];
            arr.push(info);
        }
        var isyiyou = false;
        for (var _b = 0, arr_1 = arr; _b < arr_1.length; _b++) {
            var info = arr_1[_b];
            if (info.base_id == this._cvo.base_id) {
                //已有属性
                isyiyou = true;
                break;
            }
        }
        if (isyiyou && itemCvo.condition != "") {
            this._numGroup.visible = false;
            this._yiyouImg.visible = true;
        }
        else {
            this._numGroup.visible = true;
            this._yiyouImg.visible = false;
        }
        this.setBuyBtnColor();
        if (condit.isSatisfy()) {
            this._goods.filters = null;
            this._nameTxt.filters = null;
            this._attrTxt0.filters = null;
            this._attrTxt1.filters = null;
            this._copyTxt.text = "";
            this._numTxt.text = "" + this._cvo.price;
        }
        else {
            //未解锁
            this._yiyouImg.visible = false;
            this._numGroup.visible = false;
            FilterUtil.setGrayFilter(this._goods);
            FilterUtil.setGrayFilter(this._nameTxt);
            FilterUtil.setGrayFilter(this._attrTxt0);
            FilterUtil.setGrayFilter(this._attrTxt1);
            this._copyTxt.text = StringUtils.setParam(LangCVO.getContent("lifeGrid4", condit.value2));
        }
    };
    LifeGridBuyItem.prototype.setBuyBtnColor = function () {
        var frag = this._self.attrInfo.destinyfrig;
        if (frag >= this._cvo.price) {
            this._buyBtn.filters = null;
        }
        else {
            FilterUtil.setGrayFilter(this._buyBtn);
        }
    };
    LifeGridBuyItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeEvent();
        ObjectUtil.removes(this._numGroup, this._yiyouImg, this._goods);
        ObjectUtil.disposes(this._buyBtn, this._nameTxt, this._attrTxt0, this._attrTxt1, this._numTxt, this._copyTxt);
        this._buyBtn = null;
        Manager.pool.push(this._goods);
        this._goods = null;
        this._nameTxt = null;
        this._attrTxt0 = null;
        this._attrTxt1 = null;
        this._numTxt = null;
        this._copyTxt = null;
        this._yiyouImg = null;
        this._numGroup = null;
        this._cvo = null;
        this._self = null;
        this._itemsModel = null;
    };
    return LifeGridBuyItem;
}(ItemRenderer));
__reflect(LifeGridBuyItem.prototype, "LifeGridBuyItem");
//# sourceMappingURL=LifeGridBuyItem.js.map