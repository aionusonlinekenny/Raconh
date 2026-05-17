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
 * 副本Model
 * luzhihong
 * create 2017.12.4
 */
var CopyModel = /** @class */ (function (_super) {
    __extends(CopyModel, _super);
    function CopyModel() {
        var _this = _super.call(this) || this;
        _this._buyCount = {}; //vip已购买进入次数
        _this._towerModel = new TowerCopyModel();
        _this._expModel = new CopyExpModel();
        _this._silverModel = new CopySilverModel();
        return _this;
    }
    Object.defineProperty(CopyModel.prototype, "towerModel", {
        /**爬塔副本model */
        get: function () {
            return this._towerModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyModel.prototype, "expModel", {
        /**经验副本model */
        get: function () {
            return this._expModel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CopyModel.prototype, "silverModel", {
        /**经验副本model */
        get: function () {
            return this._silverModel;
        },
        enumerable: true,
        configurable: true
    });
    CopyModel.prototype.setBuyCount = function (type, value) {
        if (this._buyCount[type] == value)
            return;
        this._buyCount[type] = value;
        this.dispatchEvent(new CopyEvent(CopyEvent.UPDATE_BUY_COUNT, type));
    };
    CopyModel.prototype.getBuyCount = function (type) {
        return this._buyCount[type] ? this._buyCount[type] : 0;
    };
    CopyModel.prototype.clean = function () {
        this.curID = 0;
    };
    CopyModel.sortResultItems = function (a, b) {
        // 优先排列装备-再到其他的银币什么的
        // 然后装备里优先按品质的顺序排列 
        //装备类放前面
        if (a.cvo.group == ItemsConst.GROUP_EQUIP && b.cvo.group != ItemsConst.GROUP_EQUIP)
            return -1;
        if (a.cvo.group != ItemsConst.GROUP_EQUIP && b.cvo.group == ItemsConst.GROUP_EQUIP)
            return 1;
        //资产类放第二
        if (a.cvo.group == ItemsConst.GROUP_MONEY && b.cvo.group != ItemsConst.GROUP_MONEY)
            return -1;
        if (a.cvo.group != ItemsConst.GROUP_MONEY && b.cvo.group == ItemsConst.GROUP_MONEY)
            return 1;
        //高品质的放前面
        if (a.cvo.color > b.cvo.color)
            return -1;
        if (a.cvo.color < b.cvo.color)
            return 1;
        return (a.id < b.id ? -1 : 1);
    };
    CopyModel.prototype.towerMoveToEnd = function () {
        Manager.control.getCopy().enter(CopyConst.ID_TOWER);
    };
    return CopyModel;
}(egret.EventDispatcher));
//# sourceMappingURL=CopyModel.js.map