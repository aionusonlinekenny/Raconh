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
 *liangyan
 *create 2017-11-02
*/
var FriendsModel = (function (_super) {
    __extends(FriendsModel, _super);
    function FriendsModel() {
        var _this = _super.call(this) || this;
        _this.infos = [];
        _this.chatDatas = {};
        return _this;
    }
    /**列表添加 */
    FriendsModel.prototype.addFriends = function (friend, needAlert) {
        if (needAlert === void 0) { needAlert = true; }
        if (this.infos.indexOf(friend) != -1)
            return;
        this.infos.push(friend);
        if (!this.chatDatas.hasOwnProperty("" + friend.id))
            this.chatDatas[friend.id] = new Array();
        this.dispatchEvent(new FriendsEvent(FriendsEvent.ADD_PLAYER));
        if (needAlert)
            FloatTips.addTips("添加成功", Color.GREEN);
    };
    /**请求添加好友（用ID）*/
    FriendsModel.prototype.addFriendByID = function (id) {
        Manager.control.getFriends().addFriends(id, FriendsType.FRIEND);
    };
    /**请求添加好友（用昵称）*/
    FriendsModel.prototype.addFriendByName = function (name) {
        Manager.control.getFriends().addFriends(0, FriendsType.FRIEND, name);
    };
    /**列表移除 by id*/
    FriendsModel.prototype.removeFriendsByID = function (id) {
        var info = this.getFriendsByID(id);
        if (info != null) {
            var type = info.type;
            this.removeFriendsByInfo(info);
            delete this.chatDatas[id];
            this.dispatchEvent(new FriendsEvent(FriendsEvent.DELETE_PLAYER));
        }
    };
    /**列表移除 by info */
    FriendsModel.prototype.removeFriendsByInfo = function (info) {
        var index = this.infos.indexOf(info);
        if (index != -1)
            this.infos.splice(index, 1);
    };
    /**更新信息 */
    FriendsModel.prototype.updateFriendsInfo = function (friend, needReSort) {
        if (needReSort === void 0) { needReSort = false; }
        this.dispatchEvent(new FriendsEvent(FriendsEvent.UPDATE_PLAYER));
    };
    /**根据类型获取信息 */
    FriendsModel.prototype.getFriendsByType = function (type, needOnline) {
        if (needOnline === void 0) { needOnline = false; }
        var result = [];
        for (var i = 0; i < this.infos.length; i++) {
            if ((this.infos[i].type & type) == type) {
                if (needOnline) {
                    if (this.infos[i].isOnline)
                        result.push(this.infos[i]);
                }
                else
                    result.push(this.infos[i]);
            }
        }
        return result;
    };
    /**根据id获取信息 */
    FriendsModel.prototype.getFriendsByID = function (id) {
        for (var i = 0; i < this.infos.length; i++) {
            if (this.infos[i].id == id)
                return this.infos[i];
        }
        return null;
    };
    /**根据id、类型获取信息 */
    FriendsModel.prototype.getFriendsByIDAndType = function (id, type) {
        for (var i = 0; i < this.infos.length; i++) {
            if (this.infos[i].id == id && (this.infos[i].type & type) == type)
                return this.infos[i];
        }
        return null;
    };
    /**根据名字获取信息 */
    FriendsModel.prototype.getFriendsByName = function (name) {
        for (var i = 0; i < this.infos.length; i++) {
            if (this.infos[i].nickName == name)
                return this.infos[i];
        }
        return null;
    };
    /**检测是否为好友 */
    FriendsModel.prototype.checkIsFriend = function (id) {
        for (var i = 0; i < this.infos.length; i++) {
            if (this.infos[i].id == id) {
                if (this.isFriend(this.infos[i].type))
                    return true;
                else
                    return false;
            }
        }
        return false;
    };
    /**检测是否为好友类型 */
    FriendsModel.prototype.isFriend = function (type) {
        if ((type & FriendsType.FRIEND) == FriendsType.FRIEND)
            return true;
        return false;
    };
    /**根据id检查是否在type分组里 */
    FriendsModel.prototype.checkFriendsBeingByID = function (id, type) {
        var info = this.getFriendsByID(id);
        if (info != null && ((info.type & type) == type))
            return true;
        return false;
    };
    /**根据name检查是否在type分组里 */
    FriendsModel.prototype.checkFriendsBeingByName = function (name, type) {
        if ((this.getFriendsByName(name) != null) && ((this.getFriendsByName(name).type & type) == type))
            return true;
        else
            return false;
    };
    /**搜索列表添加 */
    FriendsModel.prototype.addSearchInfo = function (info) {
        this.searchInfos.push(info);
    };
    /**获取批量删除列表 */
    FriendsModel.prototype.getBatchDelInfos = function () {
        var result = [];
        var length = this.infos.length;
        var offDays;
        for (var i = 0; i < length; i++) {
            offDays = (Manager.model.getLogin().serverTimeInfo.serverTime / 1000 - this.infos[i].lastOnlineTime) / 86400;
            if (offDays >= 3)
                result.push(this.infos[i]);
        }
        result.sort(function (a, b) { return (a.lastOnlineTime > b.lastOnlineTime ? 1 : -1); });
        return result;
    };
    /**添加聊天消息 */
    FriendsModel.prototype.pushChatData = function (info, id) {
        if (!this.chatDatas.hasOwnProperty("" + id))
            this.chatDatas[id] = new Array();
        this.chatDatas["" + id].push(info);
        this.dispatchEvent(new ChatEvent(ChatEvent.ADD_PRIVATE_MSG));
        this.dispatchEvent(new FriendsEvent(FriendsEvent.SHOW_HIDE_TIPS));
    };
    /**根据id获取聊天记录 */
    FriendsModel.prototype.getChatData = function (id) {
        if (!this.chatDatas.hasOwnProperty("" + id))
            return null;
        return this.chatDatas[id];
    };
    Object.defineProperty(FriendsModel.prototype, "hasUnReadMsg", {
        /**是否有未读消息 */
        get: function () {
            var infos;
            var selfID = Manager.model.self.id;
            for (var key in this.chatDatas) {
                infos = this.chatDatas[key];
                var len = infos ? infos.length : 0;
                var info = void 0;
                for (var i = 0; i < len; i++) {
                    info = infos[i];
                    if (!info.hasDraw && info.fromID != selfID)
                        return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return FriendsModel;
}(egret.EventDispatcher));
__reflect(FriendsModel.prototype, "FriendsModel");
//# sourceMappingURL=FriendsModel.js.map