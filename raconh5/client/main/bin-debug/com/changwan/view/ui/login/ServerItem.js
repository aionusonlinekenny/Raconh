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
 * 服务器组按钮
 * luzhihong
 * create 2017-12-15
 */
var ServerItem = (function (_super) {
    __extends(ServerItem, _super);
    function ServerItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("login", "ServerItemSkin");
        return _this;
    }
    ServerItem.prototype.dataChanged = function () {
        // { "name":"202服务器", "host":"127.0.0.1" , "port":9002, "serverID":10001, "state":0 }
        this.itemData = this.data;
        if (this.itemData.state == 1)
            this._icon.source = "login_iconNew_png";
        else if (this.itemData.state == 2)
            this._icon.source = "login_iconHot_png";
        else
            this._icon.source = "";
        this._txtServer.text = this.itemData.name;
        if (this.itemData.nick_name) {
            this._txtServer.x = 15;
            if (this.itemData.rein > 0) {
                this._txtPlayer.text = LangCVO.getContent("common57", this.itemData.nick_name, this.itemData.rein, this.itemData.level);
            }
            else {
                this._txtPlayer.text = LangCVO.getContent("common58", this.itemData.nick_name, this.itemData.level);
            }
        }
        else {
            this._txtServer.x = 170;
            this._txtPlayer.text = "";
        }
    };
    ServerItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._icon);
        ObjectUtil.disposes(this._txtServer, this._txtPlayer);
        this._icon = null;
        this._txtServer = null;
        this._txtPlayer = null;
        this.itemData = null;
    };
    return ServerItem;
}(ItemRenderer));
__reflect(ServerItem.prototype, "ServerItem");
//# sourceMappingURL=ServerItem.js.map