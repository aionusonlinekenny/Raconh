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
 * 聊天主界面
 * liangyan
 * create 2017-11-13
*/
var ChatView = (function (_super) {
    __extends(ChatView, _super);
    function ChatView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("chat", "ChatViewSkin");
        _this.touchChildren = true;
        return _this;
    }
    ChatView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 0;
            this._bgImg.y = 1033;
            this._bgImg.load(PathInfo.getPath("res/common/panel_bg2.png", LoaderType.IMAGE), 720, 107);
            this.addChildAt(this._bgImg, 2);
        }
        this._model = Manager.model.getChat();
        this._isInit = true;
        this._input.textDisplay.fontFamily = Manager.config.defaultFont;
        this.initChannel();
    };
    ChatView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._faceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._channelList.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchItemHandler, this);
        this._model.addEventListener(ChatEvent.ADD_CHANNEL_MSG, this.onMsgUpdateHandler, this);
    };
    ChatView.prototype.removeEvent = function () {
        this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._faceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        this._channelList.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchItemHandler, this);
        this._model.removeEventListener(ChatEvent.ADD_CHANNEL_MSG, this.onMsgUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    ChatView.prototype.drawAll = function () {
        _super.prototype.drawAll.call(this);
        this.drawData();
    };
    ChatView.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid(InvalidationType.DATA))
            this.drawData();
    };
    ChatView.prototype.drawData = function () {
        //清除旧频道消息
        if (this._isInit) {
            this.clearGroup();
            this._oldY = 0;
        }
        //添加频道消息
        var infos = this._model.getInfos(Manager.model.getChat().curSelCnl);
        var len = infos.length;
        var info;
        var item;
        var i = infos.length - ChatModel.MAX_MSG >= 0 ? infos.length - ChatModel.MAX_MSG : 0;
        for (i; i < len; i++) {
            info = infos[i];
            if (!this._isInit && info.hasDraw)
                continue;
            item = Manager.pool.create(ChatContentItem, info);
            item.y = this._oldY;
            this._msgGroup.addChild(item);
            this._oldY = item.y + item.height + 12;
            info.hasDraw = true;
        }
        this._msgScroll.validateNow();
        var differ = this._msgScroll.viewport.contentHeight - this._msgScroll.viewport.height;
        if (differ > 0)
            this._msgScroll.viewport.scrollV = differ;
        if (this._isInit)
            this._isInit = false;
    };
    ChatView.prototype.onTouchHandler = function (e) {
        switch (e.currentTarget) {
            case this._backBtn:
                if (ChatFaceBox.hasInstance)
                    ChatFaceBox.getInstance().hide();
                // this.clearGroup();
                if (this.parent != null)
                    this.parent.removeChild(this);
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
                if (Manager.model.getChat().curSelCnl == ChatChannelType.WORLD && !OpenCVO.isOpen(OpenConst.ID_WORLD_CHAT, true))
                    return;
                Manager.control.getChat().channelChat(Manager.model.getChat().curSelCnl, this._input.text);
                this._input.text = "";
                break;
        }
    };
    ChatView.prototype.onTouchItemHandler = function (e) {
        var list = e.currentTarget;
        var index = list.selectedIndex;
        var channel = list.getChildAt(index).channel;
        if (Manager.model.getChat().curSelCnl == channel)
            return;
        Manager.model.getChat().curSelCnl = channel;
        var length = list.numChildren;
        var lvl = Manager.model.self.attrInfo.level;
        switch (channel) {
            case ChatChannelType.SYSTEM:
                this._input.enabled = this._sendBtn.enabled = this._faceBtn.enabled = false;
                this._input.prompt = "系统频道禁止发言";
                break;
            case ChatChannelType.CORPS:
                // this._input.enabled = this._sendBtn.enabled = this._faceBtn.enabled = false;
                // this._input.prompt = "未加入盟会禁止发言";
                if (Manager.model.self.attrInfo.guildID > 0) {
                    this._input.enabled = this._sendBtn.enabled = this._faceBtn.enabled = true;
                    this._input.prompt = "聊天发送信息输入区域";
                }
                else {
                    this._input.enabled = this._sendBtn.enabled = this._faceBtn.enabled = false;
                    this._input.prompt = "未加入盟会禁止发言";
                }
                break;
            case ChatChannelType.WORLD:
                this._input.enabled = this._sendBtn.enabled = this._faceBtn.enabled = true;
                this._input.prompt = "聊天发送信息输入区域";
                // if(lvl <= 100)
                // {
                //     alert("你的级别不足！");
                //     return;
                // }
                break;
        }
        for (var i = 0; i < length; i++) {
            list.getChildAt(i).selected = (i == index);
        }
        this._isInit = true;
        this.invalidate(InvalidationType.DATA);
    };
    ChatView.prototype.onMsgUpdateHandler = function (e) {
        if (Manager.model.getChat().curSelCnl == e.params)
            this.invalidate(InvalidationType.DATA);
    };
    ChatView.prototype.clearGroup = function () {
        var num = this._msgGroup.numChildren;
        for (var i = 0; i < num; i++) {
            var child = this._msgGroup.getChildAt(0);
            if (child) {
                this._msgGroup.removeChild(child);
                Manager.pool.push(child);
            }
        }
    };
    ChatView.prototype.faceSelect = function (type, target) {
        var face = Manager.pool.create(Face, type);
        target._input.textDisplay.text += face.faceName;
        if (ChatFaceBox.hasInstance)
            ChatFaceBox.getInstance().hide();
        target._input.textDisplay.setFocus();
        Manager.pool.push(face);
    };
    ChatView.prototype.initChannel = function () {
        if (!this._cnlBtnContent) {
            this._cnlBtnContent = [
                { channelName: "chat_sys_png", channel: ChatChannelType.SYSTEM },
                { channelName: "chat_world_png", channel: ChatChannelType.WORLD },
                { channelName: "chat_corps_png", channel: ChatChannelType.CORPS }
            ];
        }
        this._channelList.initBtnListData(ChatChannelBtn, this._cnlBtnContent);
        this._channelList.itemList.layout.gap = 0;
        this._channelList.itemList.selectedIndex = 1;
        Manager.model.getChat().curSelCnl = ChatChannelType.WORLD;
        this._channelList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    ChatView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._channelList, this._backBtn, this._faceBtn, this._sendBtn, this._input, this._msgScroll, this._msgGroup, this._bgImg);
        this._channelList.dispose();
        this._channelList = null;
        this._backBtn.dispose();
        this._backBtn = null;
        this._faceBtn.dispose();
        this._faceBtn = null;
        this._sendBtn.dispose();
        this._sendBtn = null;
        this._input.dispose();
        this._input = null;
        this._msgScroll.dispose();
        this._msgScroll = null;
        this.clearGroup();
        this._msgGroup = null;
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        this._cnlBtnContent.length = 0;
        this._model = null;
        this._isInit = false;
    };
    return ChatView;
}(UIComponent));
__reflect(ChatView.prototype, "ChatView");
//# sourceMappingURL=ChatView.js.map