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
 * 好友私聊面板
 * liangyan
 * create 2017-11-03
*/
var FriendsPrivateView = (function (_super) {
    __extends(FriendsPrivateView, _super);
    function FriendsPrivateView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsPrivateViewSkin");
        return _this;
    }
    FriendsPrivateView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.touchChildren = true;
        this._list.itemList.layout.gap = -5;
    };
    FriendsPrivateView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getFriends().addEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onInfoUpdateHandler, this);
        this._list.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    FriendsPrivateView.prototype.removeEvent = function () {
        Manager.model.getFriends().removeEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onInfoUpdateHandler, this);
        this._list.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsPrivateView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsPrivateView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsPrivateView.prototype.drawData = function () {
        var infos = Manager.model.getFriends().chatDatas;
        var dataArr = [];
        for (var key in infos) {
            var len = infos[key].length;
            if (len > 0) {
                dataArr.push(infos[key][len - 1]);
            }
        }
        dataArr.sort(function (a, b) { return (a.time > b.time ? -1 : 1); });
        this._list.initBtnListData(FriendsPrivateItem, dataArr, true);
    };
    FriendsPrivateView.prototype.onInfoUpdateHandler = function (e) {
        this.invalidate(InvalidationType.DATA);
    };
    FriendsPrivateView.prototype.onTouchHandler = function (e) {
        if (e.target instanceof List)
            return;
        var index = this._list.itemList.selectedIndex;
        if (index < 0)
            return;
        var item = this._list.itemList.getChildAt(index);
        var info = item.data;
        Manager.view.show(5 /* FriendsChatView */, info.isSelf ? info.targetID : info.fromID, info.isSelf ? info.targetName : info.fromName);
        Manager.model.getFriends().dispatchEvent(new FriendsEvent(FriendsEvent.SHOW_HIDE_TIPS));
        item.updatebubble(0);
    };
    FriendsPrivateView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._list);
        this._list.dispose();
        this._list = null;
    };
    return FriendsPrivateView;
}(UIComponent));
__reflect(FriendsPrivateView.prototype, "FriendsPrivateView");
//# sourceMappingURL=FriendsPrivateView.js.map