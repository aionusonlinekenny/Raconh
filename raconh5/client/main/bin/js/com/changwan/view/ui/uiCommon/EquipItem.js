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
var EquipItem = /** @class */ (function (_super) {
    __extends(EquipItem, _super);
    function EquipItem() {
        var _this = _super.call(this) || this;
        _this.isShowTips = true;
        _this.isSuitItem = false;
        _this.touchEnabled = true;
        return _this;
    }
    EquipItem.prototype.clickFun = function (e) {
        var cvo = ItemsCVO.getCvo(this.baseId);
        if (this._data && cvo && this.isShowTips) {
            if (cvo.group == 1) {
                Manager.view.show(45 /* EquipTips */, cvo, this._data);
            }
            else {
                Manager.view.show(9 /* ItemsTips */, this._data);
            }
        }
    };
    Object.defineProperty(EquipItem.prototype, "jia", {
        set: function (value) {
            this._jieTxt.visible = this._jieImg.visible = value > 0 ? true : false;
            if (value > 0)
                this._jieTxt.text = value + LangCVO.getContent("common18");
            else
                this._jieTxt.text = "";
        },
        enumerable: true,
        configurable: true
    });
    EquipItem.prototype.showjie = function () {
        if (!this.isSuitItem)
            _super.prototype.showjie.call(this);
    };
    return EquipItem;
}(Goods));
//# sourceMappingURL=EquipItem.js.map