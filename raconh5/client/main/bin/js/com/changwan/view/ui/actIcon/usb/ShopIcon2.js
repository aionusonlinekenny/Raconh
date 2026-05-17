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
 * 商城活动图标
 * pzx
 * create 2018-3-6
*/
var ShopIcon2 = /** @class */ (function (_super) {
    __extends(ShopIcon2, _super);
    function ShopIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    ShopIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getShop().treasureGarretModel.addEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR, this.__drawRed, this);
    };
    ShopIcon2.prototype.removeEvent = function () {
        Manager.model.getShop().treasureGarretModel.removeEventListener(ShopEvent.TREASUREGARRET_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    ShopIcon2.prototype.hasRedIcon = function () {
        return (Manager.model.getShop().treasureGarretModel.checkfreeTime() || Manager.model.self.attrInfo.honor >= 500);
    };
    return ShopIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=ShopIcon2.js.map