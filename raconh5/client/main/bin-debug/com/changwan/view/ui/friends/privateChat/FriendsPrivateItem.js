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
 * 好友私聊子项
 * liangyan
 * create 2017-11-03
*/
var FriendsPrivateItem = (function (_super) {
    __extends(FriendsPrivateItem, _super);
    function FriendsPrivateItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsPrivateItemSkin");
        return _this;
    }
    FriendsPrivateItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._head = Manager.pool.create(BitmapRemote);
        this._head.x = this._headBack.x + 27;
        this._head.y = this._headBack.y + 27;
        this.addChild(this._head);
    };
    FriendsPrivateItem.prototype.dataChanged = function () {
        var info = this.data;
        if (info == null)
            return;
        this._head.load(Manager.path.getRoleHeadPath(1, info.isSelf ? info.targetCareer : info.fromCareer));
        var records = Manager.model.getFriends().getChatData(info.isSelf ? info.targetID : info.fromID);
        var count = 0;
        var len = records.length;
        for (var i = 0; i < len; i++) {
            if (!records[i].hasDraw)
                count++;
        }
        this._bubble.update(count);
        this._nameTxt.text = info.isSelf ? info.targetName : info.fromName;
        if (info.zhuansheng > 0) {
            this._lvlTxt.text = info.zhuansheng + LangCVO.getContent("common14") + info.level + LangCVO.getContent("common15");
        }
        else {
            this._lvlTxt.text = info.level + LangCVO.getContent("common15");
        }
        this._msgTxt.text = info.content.slice(0, 12);
        this._timeTxt.text = cw.DateUtil.formatStr(info.time, cw.DateUtil.MM_DD_HH_MM);
    };
    FriendsPrivateItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._headBack, this._bubble, this._nameTxt, this._lvlTxt, this._msgTxt, this._timeTxt, this._head);
        this._headBack.bitmapData = null;
        this._headBack = null;
        this._bubble.dispose();
        this._bubble = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._lvlTxt.dispose();
        this._lvlTxt = null;
        this._msgTxt.dispose();
        this._msgTxt = null;
        this._timeTxt.dispose();
        this._timeTxt = null;
        Manager.pool.push(this._head);
        this._head = null;
    };
    FriendsPrivateItem.prototype.updatebubble = function (value) {
        this._bubble.update(value);
    };
    return FriendsPrivateItem;
}(ItemRenderer));
__reflect(FriendsPrivateItem.prototype, "FriendsPrivateItem");
//# sourceMappingURL=FriendsPrivateItem.js.map