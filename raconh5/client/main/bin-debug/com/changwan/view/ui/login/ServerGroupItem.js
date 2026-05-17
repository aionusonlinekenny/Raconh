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
var ServerGroupItem = (function (_super) {
    __extends(ServerGroupItem, _super);
    function ServerGroupItem() {
        var _this = _super.call(this) || this;
        _this._back = new eui.Image("login_serverBtn0_png");
        _this.addChild(_this._back);
        _this._label = new Label();
        _this._label.y = 19;
        _this._label.width = 185;
        _this._label.size = 30;
        _this._label.textColor = 0x7C6E62;
        _this._label.fontFamily = Manager.config.defaultFont;
        _this._label.textAlign = "center";
        _this.addChild(_this._label);
        return _this;
    }
    ServerGroupItem.prototype.dataChanged = function () {
        // {
        //     "name": "历史服务器",
        //     "list": [
        //         { "name":"202服务器", "host":"127.0.0.1" , "port":9002, "serverID":10001, "state":0 },
        //         { "name":"林铿50", "host":"127.0.0.1" , "port":9002, "serverID":10001, "state":1 },
        //     ]
        // }
        this._label.text = this.data.name;
        this.list = this.data.list;
    };
    Object.defineProperty(ServerGroupItem.prototype, "selected", {
        set: function (value) {
            this._back.source = value ? "login_serverBtn1_png" : "login_serverBtn0_png";
        },
        enumerable: true,
        configurable: true
    });
    ServerGroupItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._back);
        ObjectUtil.dispose(this._label);
        this._back = null;
        this._label = null;
        this.list = null;
    };
    return ServerGroupItem;
}(ItemRenderer));
__reflect(ServerGroupItem.prototype, "ServerGroupItem");
//# sourceMappingURL=ServerGroupItem.js.map