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
 * 邮件、聊天视图
 * luzh
 * create 2018.2.27
 * @update devil 2018-04-15
*/
var MailAndChatAndFriend = /** @class */ (function (_super) {
    __extends(MailAndChatAndFriend, _super);
    function MailAndChatAndFriend(imageContainer, container1) {
        var _this = _super.call(this) || this;
        _this._contentWidth = 720;
        _this._contentHeight = 258;
        _this._visible = false;
        _this._imageContainer = ObjectUtil.createConainer();
        imageContainer.addChild(_this._imageContainer);
        _this._conainer1 = ObjectUtil.createConainer();
        container1.addChild(_this._conainer1);
        return _this;
    }
    MailAndChatAndFriend.prototype.addEvent = function () {
        this._mailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._friendsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getChat().addEventListener(ChatEvent.ADD_CHANNEL_MSG, this.onMsgUpdateHandler, this);
        Manager.model.getMail().addEventListener(MailEvent.HIDE_SHOW_NOTICE, this.onMailUpdateHandler, this);
        Manager.model.getFriends().addEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onFriendsUpdateHandler, this);
    };
    MailAndChatAndFriend.prototype.removeEvent = function () {
        this._mailBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._friendsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getChat().removeEventListener(ChatEvent.ADD_CHANNEL_MSG, this.onMsgUpdateHandler, this);
        Manager.model.getMail().removeEventListener(MailEvent.HIDE_SHOW_NOTICE, this.onMailUpdateHandler, this);
        Manager.model.getFriends().removeEventListener(FriendsEvent.SHOW_HIDE_TIPS, this.onFriendsUpdateHandler, this);
    };
    MailAndChatAndFriend.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._mailBtn:
                Manager.view.show(14 /* MailPanel */);
                break;
            case this._friendsBtn:
                if (OpenCVO.isOpen(OpenConst.ID_FRIENDS, true))
                    Manager.view.show(13 /* FriendPanel */);
                break;
            case this._back:
                Manager.control.getChat().showChatView(true);
                break;
        }
    };
    MailAndChatAndFriend.prototype.onMsgUpdateHandler = function (e) {
        var infos = Manager.model.getChat().getInfos(e.params);
        var len = infos.length;
        this._info = infos[len - 1];
        this.invalidate("drawMsg");
    };
    MailAndChatAndFriend.prototype.drawAll = function () {
        if (this._info)
            this.drawMsg();
    };
    MailAndChatAndFriend.prototype.draw = function () {
        _super.prototype.draw.call(this);
        if (this.isInvalid("drawMsg"))
            this.drawMsg();
    };
    MailAndChatAndFriend.prototype.drawMsg = function () {
        this._chatTxt.info = this._info;
        this._info = null;
    };
    MailAndChatAndFriend.prototype.onMailUpdateHandler = function (e) {
        var isShow = e.params;
        if (isShow) {
            if (this._mailRedIcon == null) {
                this._mailRedIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
                this._mailRedIcon.x = this._mailBtn.x + 38;
                this._mailRedIcon.y = this._mailBtn.y;
                this._imageContainer.addChild(this._mailRedIcon);
            }
        }
        else {
            if (this._mailRedIcon != null) {
                Manager.pool.push(this._mailRedIcon);
                this._mailRedIcon = null;
            }
        }
    };
    MailAndChatAndFriend.prototype.onFriendsUpdateHandler = function (e) {
        if (Manager.model.getFriends().hasUnReadMsg) {
            if (this._friendsRedIcon == null) {
                this._friendsRedIcon = Manager.pool.create(BitmapRes, "main_red_icon_png");
                this._friendsRedIcon.x = this._friendsBtn.x + 38;
                this._friendsRedIcon.y = this._friendsBtn.y;
                this._imageContainer.addChild(this._friendsRedIcon);
            }
        }
        else {
            if (this._friendsRedIcon != null) {
                Manager.pool.push(this._friendsRedIcon);
                this._friendsRedIcon = null;
            }
        }
    };
    MailAndChatAndFriend.prototype.layout = function (gameWidth, gameHeight) {
        this._conainer1.y = gameHeight - this._contentHeight;
        this._imageContainer.y = this._conainer1.y;
        this._conainer1.x = (gameWidth - this._contentWidth) >> 1;
        this._imageContainer.x = this._conainer1.x;
    };
    MailAndChatAndFriend.prototype.switch = function (visible) {
        if (this._visible == visible)
            return;
        this._visible = visible;
        if (visible) {
            this._mailBtn = BitmapRes.create("main_mail_png", 15, 36);
            this._mailBtn.touchEnabled = true;
            this._imageContainer.addChild(this._mailBtn);
            this._friendsBtn = BitmapRes.create("main_chat_png", 638, 36);
            this._friendsBtn.touchEnabled = true;
            this._imageContainer.addChild(this._friendsBtn);
            this._back = BitmapRes.create("main_chatBg_png", 90, 42, 548, 59);
            this._back.scale9Grid = new egret.Rectangle(7, 7, 45, 45);
            this._back.touchEnabled = true;
            this._imageContainer.addChild(this._back);
            this._chatTxt = new ChatContentItem2(this._imageContainer, this._conainer1, 540);
            this._chatTxt.move(94, 58);
            this.start();
            this.addEvent();
        }
        else {
            this.removeEvent();
            if (this._mailBtn != null) {
                Manager.pool.push(this._mailBtn);
                this._mailBtn = null;
            }
            if (this._friendsBtn != null) {
                Manager.pool.push(this._friendsBtn);
                this._friendsBtn = null;
            }
            if (this._back != null) {
                Manager.pool.push(this._back);
                this._back = null;
            }
            if (this._chatTxt != null) {
                this._chatTxt.dispose();
                this._chatTxt = null;
            }
            this._mailBtn = null;
            this._friendsBtn = null;
            this._chatTxt = null;
            this._back = null;
            if (this._mailRedIcon) {
                Manager.pool.push(this._mailRedIcon);
                this._mailRedIcon = null;
            }
            if (this._friendsRedIcon) {
                Manager.pool.push(this._friendsRedIcon);
                this._friendsRedIcon = null;
            }
            this.stop();
        }
    };
    return MailAndChatAndFriend;
}(BaseRender));
//# sourceMappingURL=MailAndChatAndFriend.js.map