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
 * 17.11.27
 * 商城mddel
 */
var ShopModel = (function (_super) {
    __extends(ShopModel, _super);
    function ShopModel() {
        var _this = _super.call(this) || this;
        _this.treasureGarretModel = new TreasureGarretModel();
        _this._shopList = new Dictionary();
        return _this;
    }
    /**商城查询 */
    ShopModel.prototype.queryList = function (type, dic) {
        if (this._shopList.containsKey(type)) {
            this._shopList.remove(type);
        }
        this._shopList.add(type, dic);
        this.dispatchEvent(new ShopEvent(ShopEvent.SHOP_UPDATE_EVENT));
    };
    /**更新 */
    ShopModel.prototype.buy = function (id, num, res) {
        if (res == 1) {
            var type = ShopCVO.getCvo(id).shop_type;
            var dic = void 0;
            if (this._shopList.containsKey(type)) {
                dic = this._shopList.get(type);
            }
            else {
                dic = new Dictionary();
                this._shopList.add(type, dic);
            }
            if (dic.containsKey(id)) {
                num = num + dic.get(id);
                dic.remove(id);
            }
            dic.add(id, num);
            this.dispatchEvent(new ShopEvent(ShopEvent.SHOP_BUY_EVENT));
        }
    };
    /**获取例表 */
    ShopModel.prototype.getList = function (type) {
        if (this._shopList.containsKey(type)) {
            return this._shopList.get(type);
        }
        else {
            Manager.control.getShop().query(type);
            return null;
        }
    };
    return ShopModel;
}(egret.EventDispatcher));
__reflect(ShopModel.prototype, "ShopModel");
//# sourceMappingURL=ShopModel.js.map