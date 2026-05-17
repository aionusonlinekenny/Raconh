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
 * 好友私聊弹窗
 * liangyan
 * create 2017-11-08
*/
var FriendsChatView = /** @class */ (function (_super) {
    __extends(FriendsChatView, _super);
    function FriendsChatView() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("friends/privateChat", "FriendsChatViewSkin");
        return _this;
    }
    FriendsChatView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getFriends();
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 0;
            this._bgImg.y = 1015;
            this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 110);
            this.addChildAt(this._bgImg, 2);
        }
        this._isInit = true;
    };
    FriendsChatView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._faceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onMsgUpdateHandler, this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
    };
    FriendsChatView.prototype.removeEvent = function () {
        this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._faceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(ChatEvent.ADD_PRIVATE_MSG, this.onMsgUpdateHandler, this);
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    FriendsChatView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    FriendsChatView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    FriendsChatView.prototype.drawData = function () {
        //清除消息
        // let isInit = e == null;
        if (this._isInit) {
            this.clearGroup();
            this._oldY = 0;
        }
        //添加消息
        var infos = Manager.model.getFriends().getChatData(this._id);
        if (infos == null)
            return;
        var len = infos.length;
        var info;
        var item;
        var i = infos.length - ChatModel.MAX_MSG >= 0 ? infos.length - ChatModel.MAX_MSG : 0;
        for (i; i < len; i++) {
            info = infos[i];
            if (!this._isInit && info.hasDraw)
                continue;
            if (i != 0 && info.time - infos[i - 1].time >= 3) {
                var split = Manager.pool.create(FriendsChatSplitLine, infos[i].time);
                split.y = this._oldY;
                split.time = info.time;
                this._group.addChild(split);
                this._oldY = split.y + split.height + 5;
            }
            item = Manager.pool.create(FriendsChatItem, info);
            item.y = this._oldY;
            this._group.addChild(item);
            this._oldY = item.y + item.height + 5;
            info.hasDraw = true;
        }
        this._scroll.validateNow();
        var differ = this._scroll.viewport.contentHeight - this._scroll.viewport.height;
        if (differ > 0)
            this._scroll.viewport.scrollV = differ;
        if (this._isInit)
            this._isInit = false;
    };
    FriendsChatView.prototype.show = function (id, name) {
        if (this.parent == null) {
            this.reuse();
            this.onResizeHandler(null);
            this._id = id;
            this._name = name;
            this._nameTxt.text = "与" + this._name + "私聊中";
            this._nameTxt.stroke = 2;
            this._nameTxt.strokeColor = 0x7C6E62;
            Manager.layer.tipsLayer.addChild(this);
            this.invalidate(InvalidationType.DATA);
        }
    };
    FriendsChatView.prototype.hide = function () {
        if (this.parent != null)
            this.dispose();
    };
    FriendsChatView.prototype.faceSelect = function (type, target) {
        var face = Manager.pool.create(Face, type);
        target._input.textDisplay.text += face.faceName;
        if (ChatFaceBox.hasInstance)
            ChatFaceBox.getInstance().hide();
        target._input.textDisplay.setFocus();
        Manager.pool.push(face);
    };
    FriendsChatView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._closeBtn:
            case this._backBtn:
                if (ChatFaceBox.hasInstance)
                    ChatFaceBox.getInstance().hide();
                Manager.view.hide(5 /* FriendsChatView */);
                break;
            case this._faceBtn:
                if (ChatFaceBox.hasInstance)
                    ChatFaceBox.getInstance().hide();
                else
                    ChatFaceBox.getInstance(this.faceSelect, this).show(0, e.stageY);
                break;
            case this._sendBtn:
                if (this._input.text == "")
                    return;
                Manager.control.getChat().privateChat(this._id, this._name, this._input.text, 0);
                this._input.text = "";
                break;
        }
    };
    FriendsChatView.prototype.onMsgUpdateHandler = function (e) {
        this.invalidate(InvalidationType.DATA);
    };
    FriendsChatView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
    };
    FriendsChatView.prototype.clearGroup = function () {
        var num = this._group.numChildren;
        for (var i = 0; i < num; i++) {
            var child = this._group.getChildAt(0);
            if (child) {
                this._group.removeChild(child);
                Manager.pool.push(child);
            }
        }
    };
    FriendsChatView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._closeBtn, this._nameTxt, this._scroll, this._group, this._backBtn, this._input, this._faceBtn, this._sendBtn, this._bgImg);
        // this._closeBtn.dispose();
        this._closeBtn = null;
        this._nameTxt.dispose();
        this._nameTxt = null;
        this._scroll.dispose();
        this._scroll = null;
        this.clearGroup();
        this._group = null;
        this._backBtn.dispose();
        this._backBtn = null;
        this._input.dispose();
        this._input = null;
        this._faceBtn.dispose();
        this._faceBtn = null;
        this._sendBtn.dispose();
        this._sendBtn = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._model = null;
        this._isInit = false;
    };
    return FriendsChatView;
}(UIComponent));
//# sourceMappingURL=FriendsChatView.js.map