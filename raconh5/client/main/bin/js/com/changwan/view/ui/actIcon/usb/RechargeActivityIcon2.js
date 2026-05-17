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
 * 充值活动图标
 * pzx
 * create 2018-４-１１
*/
var RechargeActivityIcon2 = /** @class */ (function (_super) {
    __extends(RechargeActivityIcon2, _super);
    function RechargeActivityIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    RechargeActivityIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getrechargeActivity().addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getrechargeActivity().addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT, this.__drawRed, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        //兑换活动
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.getcashCow().levItemModel.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getcashCow().levItemModel.addEventListener(CashCowEvent.LEVITEM_QUERY_EVENT, this.__drawRed, this);
    };
    RechargeActivityIcon2.prototype.removeEvent = function () {
        Manager.model.getrechargeActivity().removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getrechargeActivity().removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_QUERY_EVENT, this.__drawRed, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.CROSS_DAY_EVENT, this.CrossDayHandler, this);
        //兑换活动
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.getcashCow().levItemModel.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.__drawRed, this);
        Manager.model.getcashCow().levItemModel.removeEventListener(CashCowEvent.LEVITEM_QUERY_EVENT, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    RechargeActivityIcon2.prototype.CrossDayHandler = function () {
        var any = Manager.model.getrechargeActivity().getTitleTabList();
        if (any.length == 0) {
            Manager.model.getActIcon().removeID(this._cvo.id);
        }
    };
    RechargeActivityIcon2.prototype.hasRedIcon = function () {
        var any = Manager.model.getrechargeActivity().getTitleTabList();
        var boo = false;
        for (var key in any) {
            var obj = any[key];
            if (obj.showRedIcon) {
                boo = true;
                break;
            }
        }
        boo = boo || Manager.model.getcashCow().levItemModel.checkReward() || Manager.model.getExchange().checkCoin();
        return boo;
    };
    return RechargeActivityIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=RechargeActivityIcon2.js.map