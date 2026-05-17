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
 * 命格背包
 * pzx
 * 2017.12.26
 */
var LifeGridBagView = /** @class */ (function (_super) {
    __extends(LifeGridBagView, _super);
    function LifeGridBagView() {
        var _this = _super.call(this) || this;
        /** 穿上的位置 */
        _this._pos = 0;
        _this.skinName = Manager.path.getSkinName("lifeGrid/lifegridview", "LifeGridBagViewSkin");
        return _this;
    }
    LifeGridBagView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = "lifeGrid_minggebeibao_png";
        this._popupView.viewY = 150;
        this._popupView.bgHeight = 900;
        this._model = Manager.model.getLifeGrid();
    };
    LifeGridBagView.prototype.addEvent = function () {
        this._scroller.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._gainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT, this.onTouchCloseHandler, this);
        _super.prototype.addEvent.call(this);
    };
    LifeGridBagView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._scroller.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortcutHandler, this);
        this._gainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickHandler, this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_WARE_EVENT, this.onTouchCloseHandler, this);
    };
    LifeGridBagView.prototype.onclickHandler = function (e) {
        Manager.view.hide(52 /* LifeGridBagView */);
        if (LifeGridView.view)
            LifeGridView.view.setTap(LifeGridType.HUNT);
    };
    LifeGridBagView.prototype.onShortcutHandler = function (e) {
        var target = e.target;
        if (target instanceof BaseGoods) {
            return;
        }
        var index = this._scroller.itemList.selectedIndex;
        if (index < 0)
            return;
        var item = this._scroller.itemList.getElementAt(index);
        var cvo = item.cvo;
        var itemCvo = ItemsCVO.getCvo(cvo.base_id);
        var atvoArr = cvo.attrVos();
        var arr = Manager.model.getItems().lifeGridList;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i]) {
                var attrItemsinfo = arr[i].infoList[0];
                var bagItemCvo = arr[i].cvo;
                var lifeCvo = LifeGridCVO.getInfo(bagItemCvo.id, attrItemsinfo.value);
                var attArr = lifeCvo.attrVos();
                var n = this.getqeual(atvoArr, attArr);
                if (n != 0) {
                    if (attArr.length == atvoArr.length) {
                        if (atvoArr.length == 1) {
                            if (bagItemCvo.color < itemCvo.color) {
                                var view = Manager.view.show(54 /* LifeGridFuseView */);
                                view.setData(lifeCvo, cvo, i, cvo.itemid);
                            }
                            else {
                                FloatTips.addTips(LangCVO.getContent("lifeGrid3"), 0xff0000);
                            }
                        }
                        else if (atvoArr.length == 2) {
                            if (n == 1) {
                                FloatTips.addTips(LangCVO.getContent("lifeGrid2"), 0xff0000);
                            }
                            else {
                                if (bagItemCvo.color < itemCvo.color) {
                                    var view = Manager.view.show(54 /* LifeGridFuseView */);
                                    view.setData(lifeCvo, cvo, i, cvo.itemid);
                                }
                            }
                        }
                    }
                    else {
                        FloatTips.addTips(LangCVO.getContent("lifeGrid2"), 0xff0000);
                    }
                    return;
                }
            }
        }
        if (this._pos > 0)
            Manager.control.getLifeGrid().ware(cvo.itemid, this._pos);
    };
    /** 返回i个相同，0表示无相同 */
    LifeGridBagView.prototype.getqeual = function (value1, value2) {
        var i = 0;
        for (var j = 0; j < value2.length; j++) {
            if (value1[0]) {
                if (value1[0].id == value2[j].id) {
                    i++;
                }
            }
            if (value1[1]) {
                if (value1[0].id == value2[j].id) {
                    i++;
                }
            }
        }
        return i;
    };
    LifeGridBagView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(52 /* LifeGridBagView */);
    };
    LifeGridBagView.prototype.initData = function () {
        _super.prototype.initData.call(this);
    };
    LifeGridBagView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.darwData();
    };
    LifeGridBagView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.darwData();
    };
    LifeGridBagView.prototype.setData = function (data) {
        this.invalidate(InvalidationType.DATA);
    };
    LifeGridBagView.prototype.darwData = function () {
        var infos = Manager.model.getItems().lifeGridBagList;
        var cvos = [];
        for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
            var info = infos_1[_i];
            var itemcvo = info.cvo;
            if (itemcvo.type == ItemsType.TYPE_LIFEGRID_SPAR) {
                continue;
            }
            var cvo = LifeGridCVO.getDataInfo(info);
            var boo = void 0;
            for (var _a = 0, cvos_1 = cvos; _a < cvos_1.length; _a++) {
                var obj = cvos_1[_a];
                if (obj.base_id == cvo.base_id && obj.lev == cvo.lev) {
                    boo = true;
                    break;
                }
            }
            if (boo)
                continue;
            cvos.push(cvo);
        }
        cvos = ArrayUtil.sortOn(cvos, ["color", "fightnum"], [1, 1]);
        this._scroller.initBtnListData(LifeGridBagItem, cvos, true);
        this._scroller.itemList.selectedIndex = -1;
        this._numTxt.text = LangCVO.getContent("lifeGrid1") + infos.length + "/" + Manager.model.getItems().lifeGridTotal;
    };
    LifeGridBagView.prototype.show = function (value) {
        this._pos = value;
        _super.prototype.show.call(this);
    };
    LifeGridBagView.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridBagView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridBagView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._pos = 0;
        this._scroller.dispose();
        this._scroller = null;
        this._gainBtn.dispose();
        this._gainBtn = null;
        this._numTxt.dispose();
        this._numTxt = null;
        this._model = null;
    };
    return LifeGridBagView;
}(PopUpView));
//# sourceMappingURL=LifeGridBagView.js.map