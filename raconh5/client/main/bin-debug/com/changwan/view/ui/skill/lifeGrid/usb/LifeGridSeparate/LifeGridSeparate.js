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
 * pzx
 * 命格分解
 */
var LifeGridSeparate = (function (_super) {
    __extends(LifeGridSeparate, _super);
    function LifeGridSeparate() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("lifeGrid/LifeGridSeparate", "LifeGridSeparateViewSkin");
        _this._list = [];
        return _this;
    }
    LifeGridSeparate.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._currentView = Manager.pool.create(egret.DisplayObjectContainer);
        this._vScroller = new egret.ScrollView();
        this._vScroller.x = 15;
        this._vScroller.y = 297;
        this._vScroller.width = 700;
        this._vScroller.height = 595;
        this._vScroller.horizontalScrollPolicy = "off";
        this._vScroller.setContent(this._currentView);
        this.addChild(this._vScroller);
        this._vScroller.scrollSpeed = 0.01;
        this._itemModel = Manager.model.getItems();
        this._model = Manager.model.getLifeGrid();
        this._sepatateTxt.text = "";
    };
    LifeGridSeparate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._currentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickItemHnadler, this);
        this._splerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSeparateHandler, this);
        this._model.addEventListener(LifeGridEvent.LIFEGRID_SEPARATE_EVENT, this.onReturnSeparateHandler, this);
        this._bosGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckBoxHandler, this);
    };
    LifeGridSeparate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._currentView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickItemHnadler, this);
        this._splerBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSeparateHandler, this);
        this._model.removeEventListener(LifeGridEvent.LIFEGRID_SEPARATE_EVENT, this.onReturnSeparateHandler, this);
        this._bosGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckBoxHandler, this);
    };
    LifeGridSeparate.prototype.onCheckBoxHandler = function (e) {
        this.separateFileGrid();
    };
    LifeGridSeparate.prototype.onReturnSeparateHandler = function () {
        this.darwData();
        this._checkBox0.selected = false;
        this._checkBox1.selected = false;
        this._checkBox2.selected = false;
        this._checkBox3.selected = false;
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.visible) {
                item.setCheck(false);
            }
        }
        this.getSnolNum();
    };
    LifeGridSeparate.prototype.onShowBlastCompleteHandler = function () {
        this._effnum--;
        if (this._effnum == 0) {
            var numArr = [];
            for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.visible && item.statu) {
                    numArr.push(item.itemId);
                }
            }
            Manager.control.getLifeGrid().separate(numArr);
            this._splerBtn.touchEnabled = true;
        }
    };
    LifeGridSeparate.prototype.onClickSeparateHandler = function (e) {
        this._effnum = 0;
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.visible && item.statu) {
                this._effnum++;
                item.playAniEff();
            }
        }
        if (this._effnum > 0) {
            this._splerBtn.touchEnabled = false;
        }
    };
    LifeGridSeparate.prototype.separateFileGrid = function () {
        var colorArr = []; //品色   绿色=2 蓝色=3  紫色=4   橙色=5
        if (this._checkBox0.selected) {
            colorArr.push(5);
        }
        if (this._checkBox1.selected) {
            colorArr.push(4);
        }
        if (this._checkBox2.selected) {
            colorArr.push(3);
        }
        if (this._checkBox3.selected) {
            colorArr.push(6);
        }
        if (colorArr.length > 0) {
            var arr = [];
            var infoArr = this._itemModel.lifeGridBagList;
            for (var _i = 0, infoArr_1 = infoArr; _i < infoArr_1.length; _i++) {
                var info = infoArr_1[_i];
                var cvo = info.cvo;
                for (var _a = 0, colorArr_1 = colorArr; _a < colorArr_1.length; _a++) {
                    var color = colorArr_1[_a];
                    if (cvo.quality == color) {
                        arr.push(info.id);
                        break;
                    }
                }
            }
            for (var _b = 0, _c = this._list; _b < _c.length; _b++) {
                var item = _c[_b];
                if (item.visible) {
                    var boo = false;
                    for (var _d = 0, arr_1 = arr; _d < arr_1.length; _d++) {
                        var id = arr_1[_d];
                        if (item.itemId == id) {
                            boo = true;
                            break;
                        }
                    }
                    item.setCheck(boo);
                }
            }
        }
        else {
            for (var _e = 0, _f = this._list; _e < _f.length; _e++) {
                var item = _f[_e];
                if (item.visible)
                    item.setCheck(false);
            }
        }
        this.getSnolNum();
    };
    LifeGridSeparate.prototype.getSnolNum = function () {
        var num = 0;
        for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.visible && item.statu) {
                var cvo = item.cvo;
                var loss = new GainLossVO(cvo.sep_gain);
                num += loss.num;
            }
        }
        this._sepatateTxt.text = "+" + num;
    };
    LifeGridSeparate.prototype.onclickItemHnadler = function (e) {
        var any = e.target;
        if (any instanceof LifeGridSeparateItem) {
            var item = any;
            item.setEffectImg();
            this.getSnolNum();
        }
    };
    LifeGridSeparate.prototype.initData = function () {
        _super.prototype.initData.call(this);
        this.darwData();
    };
    LifeGridSeparate.prototype.darwData = function () {
        var arr = this._itemModel.lifeGridBagList;
        arr = ArrayUtil.sortOn(arr, ["pos"]);
        var ln = arr.length > this._list.length ? arr.length : this._list.length;
        for (var i = 0; i < ln; i++) {
            var item = void 0;
            if (this._list[i] === undefined) {
                item = Manager.pool.create(LifeGridSeparateItem);
                item.x = i % 3 * (item.width + 10);
                item.y = Math.floor(i / 3) * (item.height + 10);
                this._currentView.addChild(item);
                this._list.push(item);
                item.addEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, this.onShowBlastCompleteHandler, this);
            }
            else {
                item = this._list[i];
            }
            if (arr[i]) {
                var info = arr[i];
                item.visible = true;
                item.setData(info);
            }
            else {
                item.clear();
                item.visible = false;
            }
        }
        var h = Math.floor(arr.length / 3) + 1;
        this._currentView.height = h * 250;
        this._vScroller.scrollTop = 0;
        this._soulTxt.text = "" + Manager.model.self.attrInfo.soul;
        this.getSnolNum();
        this._redIcon.visible = this._model.checkSeparate();
    };
    LifeGridSeparate.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    LifeGridSeparate.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
    };
    LifeGridSeparate.prototype.dispose = function () {
        var _this = this;
        _super.prototype.dispose.call(this);
        this._vScroller.removeContent();
        ObjectUtil.removes(this._vScroller, this._bosGroup, this._redIcon);
        ObjectUtil.disposes(this._splerBtn, this._checkBox0, this._checkBox1, this._checkBox2, this._checkBox3, this._soulTxt, this._sepatateTxt);
        this._list.forEach(function (item, i) {
            item.removeEventListener(GlobalEvent.ANIMATION_PLAY_COMPLETE, _this.onShowBlastCompleteHandler, _this);
            item.dispose();
        });
        this._vScroller = null;
        Manager.pool.push(this._currentView);
        this._currentView = null;
        this._list = null;
        this._itemModel = null;
        this._splerBtn = null;
        this._checkBox0 = null;
        this._checkBox1 = null;
        this._checkBox2 = null;
        this._checkBox3 = null;
        this._model = null;
        this._soulTxt = null;
        this._sepatateTxt = null;
        this._bosGroup = null;
        this._redIcon = null;
    };
    return LifeGridSeparate;
}(UIComponent));
__reflect(LifeGridSeparate.prototype, "LifeGridSeparate");
//# sourceMappingURL=LifeGridSeparate.js.map