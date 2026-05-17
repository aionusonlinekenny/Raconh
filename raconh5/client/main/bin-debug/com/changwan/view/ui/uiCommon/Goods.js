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
var Goods = (function (_super) {
    __extends(Goods, _super);
    function Goods() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Goods.prototype, "data", {
        set: function (value) {
            this._data = value;
            if (this._data) {
                this.baseId = value.base_id;
                this.bind = value.bind;
                this.count = value.quantity;
                this.setStar(value.getStar());
            }
            else {
                this.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Goods.prototype, "pos", {
        get: function () {
            if (this._data)
                return this._data.pos;
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Goods.prototype, "id", {
        get: function () {
            if (this._data)
                return this._data.id;
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Goods.prototype.clickFun = function (e) {
        var cvo = ItemsCVO.getCvo(this.baseId);
        if (this._data && cvo) {
            if (cvo.group == 1) {
                Manager.view.show(20 /* BagEquipTips */, this._data);
            }
            else {
                Manager.view.show(9 /* ItemsTips */, this._data);
            }
        }
    };
    Goods.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._data = null;
    };
    Goods.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this.clear();
        this.x = this.y = 0;
    };
    Goods.prototype.reuse = function () {
        _super.prototype.reuse.call(this);
    };
    Goods.prototype.dispose = function () {
        this._data = null;
        _super.prototype.dispose.call(this);
    };
    return Goods;
}(BaseGoods));
__reflect(Goods.prototype, "Goods");
//# sourceMappingURL=Goods.js.map