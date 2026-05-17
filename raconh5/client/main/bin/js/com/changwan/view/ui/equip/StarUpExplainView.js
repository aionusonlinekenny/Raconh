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
 * 升星 说明
 * drq
 *  2018.04.13
 */
var StarUpExplainView = /** @class */ (function (_super) {
    __extends(StarUpExplainView, _super);
    function StarUpExplainView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("equip", "StarUpExplainViewSkin");
        return _this;
    }
    StarUpExplainView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._popupView.titleImg.source = this._title;
        this._enterBtn.visible = this._isEnterBtn;
        switch (this._conType) {
            case 1: //文字
                this._txt.visible = true;
                this._txt.text = this._con;
                break;
            case 2: //图片
                this._popupView.diImgVisible = false;
                this._img.visible = true;
                this._img.source = this._con;
                this._img.width = this._imgW;
                this._img.height = this._imgH;
                break;
            case 3: //主装备
                this._popupView.diImgVisible = false;
                this._vScroll.initBtnListData(StarUpRowItem, [], true);
                this.drawMainEquip(null);
                break;
        }
    };
    StarUpExplainView.prototype.drawMainEquip = function (e) {
        var arr = [];
        var row = Math.ceil(this._list.length / 4) < 2 ? 2 : Math.ceil(this._list.length / 4);
        var count = 0;
        var a = [];
        for (var i = 0; i < this._list.length; i++) {
            a.push(this._list[i].base_id, this._list[i].storagetype);
        }
        for (var i = 0; i < row; i++) {
            var arr2 = [];
            var col = void 0;
            if (i == (row - 1)) //最后一行?
             {
                this._list.length % 4 == 0 ? col = 4 : col = this._list.length % 4;
            }
            else {
                col = 4;
            }
            for (var j = 0; j < col; j++) {
                arr2.push(this._list[count]);
                count++;
            }
            arr.push(arr2);
        }
        this._vScroll.dataProvider(arr);
    };
    StarUpExplainView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    };
    StarUpExplainView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchCloseHandler, this);
    };
    StarUpExplainView.prototype.show = function (title, type, con, isEnterBtn, w, h, list) {
        _super.prototype.show.call(this);
        this._title = title;
        this._conType = type;
        this._con = con;
        this._isEnterBtn = isEnterBtn;
        this._list = list;
        if (type == 2) {
            this._imgW = w;
            this._imgH = h;
        }
    };
    StarUpExplainView.prototype.onTouchCloseHandler = function (e) {
        Manager.view.hide(147 /* StarUpExplainView */);
    };
    StarUpExplainView.prototype.hide = function () {
        this.dispose();
    };
    StarUpExplainView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._img, this._enterBtn);
        ObjectUtil.dispose(this._txt);
        this._title = null;
        this._txt = null;
        this._img = null;
        this._enterBtn = null;
        this._conType = null;
        this._con = null;
        this._isEnterBtn = null;
        this._imgW = null;
        this._imgH = null;
        this._list = null;
        this._vScroll.dispose();
        this._vScroll = null;
    };
    return StarUpExplainView;
}(PopUpView));
//# sourceMappingURL=StarUpExplainView.js.map