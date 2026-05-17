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
 * 快捷菜单
 * liangyan
 * create 2017-11-06
*/
var ShortcutMenu = (function (_super) {
    __extends(ShortcutMenu, _super);
    function ShortcutMenu() {
        var _this = _super.call(this) || this;
        _this.COMMON_HIEGHT = 74;
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.skinName = "";
        return _this;
    }
    Object.defineProperty(ShortcutMenu, "hasInstance", {
        get: function () { return this._instance != null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShortcutMenu, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new ShortcutMenu();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ShortcutMenu.nullInstance = function () { this._instance = null; };
    ShortcutMenu.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._buttons = [];
        this._labels = [];
    };
    ShortcutMenu.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.global.gameMain.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
    };
    ShortcutMenu.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.global.gameMain.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickStageHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ShortcutMenu.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawLayout();
    };
    ShortcutMenu.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.LAYOUT))
            this.drawLayout();
    };
    ShortcutMenu.prototype.drawLayout = function () {
        this.updateLabels();
        this.updateButtons();
        this.updateSize();
        this.setPosition(this._x, this._y);
    };
    ShortcutMenu.prototype.showTip = function (x, y, id, name, tipType, width) {
        if (width === void 0) { width = 197; }
        this._x = x;
        this._y = y;
        this._id = id;
        this._currentType = tipType;
        this._name = name;
        this._width = width;
        this._notHide = true;
        if (this.parent == null)
            Manager.layer.uiLayer.addChild(this);
        this.invalidate(InvalidationType.LAYOUT);
    };
    ShortcutMenu.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    ShortcutMenu.prototype.move = function (x, y) {
        this._notHide = true;
        this.setPosition(x, y);
    };
    ShortcutMenu.prototype.onClickHandler = function (e) {
        e.stopImmediatePropagation();
        var btn = e.target;
        if (btn == null)
            return;
        switch (btn.type) {
            case ShortcutMenuFunType.PRIVATE_CHAT:
                this.chat();
                break;
            case ShortcutMenuFunType.OBSERVE_EQUIPT:
                this.observePlayer();
                break;
            case ShortcutMenuFunType.DELETE:
                this.deleteFriends();
                break;
            case ShortcutMenuFunType.BLACK_LIST:
                this.addBlack();
                break;
            case ShortcutMenuFunType.ADD_FRIENDS:
                this.addFriends();
                break;
        }
        this.hide();
    };
    ShortcutMenu.prototype.onClickStageHandler = function (e) {
        if (this._notHide)
            this._notHide = false;
        else
            this.hide();
    };
    ShortcutMenu.prototype.updateLabels = function () {
        this._labels = ShortcutMenuFunType.getLabelsByType(this._currentType);
        var friend = Manager.model.getFriends().getFriendsByID(this._id);
        var online = friend != null && friend.isOnline;
        var length = this._labels.length;
        for (var i = length; i >= 0; i--) {
            switch (this._labels[i]) {
                case ShortcutMenuFunType.PRIVATE_CHAT:
                    break;
                case ShortcutMenuFunType.OBSERVE_EQUIPT:
                    // if(!online) this._labels.splice(i, 1);
                    break;
                case ShortcutMenuFunType.DELETE:
                    if (!Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.BLACK)
                        && !Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.FRIEND)) {
                        this._labels.splice(i, 1);
                    }
                    break;
                case ShortcutMenuFunType.BLACK_LIST:
                    // if(!online) this._labels.splice(i, 1);
                    break;
                case ShortcutMenuFunType.ADD_FRIENDS:
                    // if(!online) this._labels.splice(i, 1);
                    break;
            }
        }
    };
    ShortcutMenu.prototype.updateButtons = function () {
        this.clearButtons();
        var btn;
        var length = this._labels.length;
        for (var i = 0; i < length; i++) {
            btn = new ShortcutMenuBtn(this._labels[i]);
            this._buttons.push(btn);
            btn.y = i * this.COMMON_HIEGHT;
            this.addChild(btn);
        }
    };
    ShortcutMenu.prototype.updateSize = function () {
        if (this._back == null)
            this._back = Manager.pool.create(egret.Shape);
        this._back.graphics.beginFill(0, 1);
        this._back.graphics.drawRect(0, 0, this._width, this._labels.length * (this.COMMON_HIEGHT) + +20);
        this._back.graphics.endFill();
        this._back.touchEnabled = true;
        this._back.alpha = 0.2;
        this._back.touchEnabled = false;
        this.addChildAt(this._back, 0);
    };
    ShortcutMenu.prototype.setPosition = function (x, y) {
        if (x + this._back.width > Manager.global.gameMain.stage.stageWidth)
            x = Manager.global.gameMain.stage.stageWidth - this._back.width;
        if (y + this._back.height > Manager.global.gameMain.stage.stageWidth)
            y = Manager.global.gameMain.stage.stageWidth - this._back.height;
        this.x = x;
        this.y = y;
        Manager.layer.uiLayer.setChildIndex(this, Manager.layer.uiLayer.numChildren - 1);
    };
    ShortcutMenu.prototype.clearButtons = function () {
        if (this._buttons == null || this._buttons.length == 0)
            return;
        while (this._buttons.length > 0) {
            if (this._buttons[0].parent != null)
                this._buttons[0].parent.removeChild(this._buttons[0]);
            this._buttons.shift();
        }
        this._buttons = [];
    };
    ShortcutMenu.prototype.chat = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_PRIVATE_CHAT, true))
            return;
        if (this._id == Manager.model.self.id || this._name == Manager.model.self.getName())
            return;
        var player = Manager.model.getFriends().getFriendsByID(this._id);
        if ((player != null) && (!player.isOnline)) {
            FloatTips.addTips("对方不在线，不能进行窗口聊天", Color.RED);
            return;
        }
        if (Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.BLACK)) {
            FloatTips.addTips("对方在你的黑名单，不能进行窗口聊天");
            return;
        }
        // FriendsChatView.instance.show(this._id, this._name);
        Manager.view.show(5 /* FriendsChatView */, this._id, this._name);
    };
    ShortcutMenu.prototype.observePlayer = function () { };
    ShortcutMenu.prototype.deleteFriends = function () {
        var info = Manager.model.getFriends().getFriendsByID(this._id);
        if (info == null)
            return;
        Manager.control.getFriends().deleteFriends(this._id, info.type);
    };
    ShortcutMenu.prototype.addBlack = function () {
        if (Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.BLACK)) {
            FloatTips.addTips("对方已在你的黑名单", Color.RED);
            return;
        }
        Manager.control.getFriends().addFriends(this._id, FriendsType.BLACK);
    };
    ShortcutMenu.prototype.addFriends = function () {
        if (Manager.model.getFriends().checkFriendsBeingByID(this._id, FriendsType.FRIEND)) {
            FloatTips.addTips("对方已是你的好友", Color.RED);
            return;
        }
        Manager.control.getFriends().addFriends(this._id, FriendsType.FRIEND);
    };
    ShortcutMenu.prototype.dispose = function () {
        ShortcutMenu.nullInstance();
        _super.prototype.dispose.call(this);
        Manager.pool.push(this._back);
        this._back = null;
        this._notHide = false;
        if (this._buttons) {
            var length_1 = this._buttons.length;
            var item = void 0;
            for (var i = 0; i < length_1; i++) {
                item = this._buttons[i];
                item.dispose();
                item = null;
            }
            this._buttons.length = 0;
        }
        this._labels.length = 0;
    };
    return ShortcutMenu;
}(UIComponent));
__reflect(ShortcutMenu.prototype, "ShortcutMenu");
//# sourceMappingURL=ShortcutMenu.js.map