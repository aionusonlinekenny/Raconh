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
 * 道具tips皮肤
 */
var BaseTips = /** @class */ (function (_super) {
    __extends(BaseTips, _super);
    function BaseTips() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("tips", "BaseTipsSkin");
        return _this;
    }
    BaseTips.prototype.configUI = function () {
        this.touchEnabled = false;
        this.touchChildren = true;
        this._group.touchEnabled = false;
        this._items.touchEnabled = false;
        this._porpTxt3.text = "";
        this._desc.lineSpacing = 10;
        this._huoqutujGroup.touchChildren = true;
    };
    BaseTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    };
    BaseTips.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseHandler, this);
    };
    BaseTips.prototype.onCloseHandler = function (e) {
        this.dispatchEvent(new egret.Event("closeView"));
    };
    BaseTips.prototype.setData = function (value, count, bin) {
        if (count === void 0) { count = 1; }
        if (bin === void 0) { bin = false; }
        this._cvo = value;
        this._count = count;
        this._bin = bin;
        _super.prototype.setData.call(this, value);
    };
    BaseTips.prototype.drawData = function () {
        this._items.setCvo(this._cvo);
        this._items.count = this._count;
        this._nameTxt.text = this._cvo.name;
        this._porpTxt1.text = LangCVO.getContent("common5") + this._cvo.needLevelStr;
        this._porpTxt2.text = LangCVO.getContent("common9") + LangCVO.getContent("item" + this._cvo.type);
        if (this._bin)
            this._porpTxt3.text = LangCVO.getContent("item93");
        else
            this._porpTxt3.text = "";
        HtmlUtil.setTextFlow(this._desc, this._cvo.desc);
        if (this._desc.textHeight < 65) {
            this._desc.height = 65;
        }
        else {
            this._desc.height = this._desc.textHeight;
        }
        var bgH = this._desc.y + this._desc.height + 15;
        if (this._cvo.desc_output != "" && !Manager.view.isOpening(11 /* BagPanel */) && !Manager.view.isOpening(18 /* ShopPanel */)
            && !Manager.view.isOpening(115 /* ShopPanelMulte */)) {
            this._huoqutujGroup.visible = true;
            this._huoqutujGroup.y = bgH;
            var arr = this._cvo.desc_output.split("|");
            var ln = arr.length;
            this._list = [];
            var starlife = 134;
            if (ln == 2) {
                starlife = 72;
            }
            else if (ln == 3) {
                starlife = 0;
            }
            for (var i = 0; i < ln; i++) {
                var item = Manager.pool.create(PutOutItem);
                this._huoqutujGroup.addChild(item);
                item.setData(arr[i]);
                item.viewId = 9 /* ItemsTips */;
                item.x = starlife + i * 134;
                item.y = 44;
                this._list.push(item);
            }
            bgH = this._huoqutujGroup.y + this._huoqutujGroup.height + 10;
        }
        else {
            this._huoqutujGroup.visible = false;
        }
        this._itemsBgImg.height = bgH;
        _super.prototype.drawData.call(this);
    };
    BaseTips.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._items.unuse();
        this._cvo = null;
        this._count = 1;
        this._porpTxt1.text = "";
        this._porpTxt2.text = "";
        this._porpTxt3.text = "";
        this._nameTxt.text = "";
        this._desc.text = "";
        if (this._list) {
            this._list.forEach(function (item, i) {
                Manager.pool.push(item);
            });
            this._list = null;
        }
    };
    BaseTips.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._itemsBgImg, this._huoqutujGroup);
        this._items.touchEnabled = true;
        Manager.pool.push(this._items);
        this._items = null;
        this._cvo = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._porpTxt1.dispose();
        this._porpTxt1 = null;
        this._porpTxt2.dispose();
        this._porpTxt2 = null;
        this._porpTxt3.dispose();
        this._porpTxt3 = null;
        this._desc.dispose();
        this._desc = null;
        this._close.dispose();
        this._close = null;
        this._itemsBgImg = null;
        this._huoqutujGroup = null;
        if (this._list) {
            this._list.forEach(function (item, i) {
                Manager.pool.push(item);
            });
            this._list = null;
        }
    };
    return BaseTips;
}(BaseItemsTips));
//# sourceMappingURL=BaseTips.js.map