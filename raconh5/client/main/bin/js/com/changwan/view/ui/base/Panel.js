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
 * update devil 2017-11-27
 */
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel(needSkin) {
        if (needSkin === void 0) { needSkin = true; }
        var _this = _super.call(this) || this;
        _this.isLoadComplete = false;
        _this._scrollH = 0;
        _this._loadComplete = false;
        _this._needSkin = needSkin;
        _this.basePanel = ObjectUtil.createObj(BasePanel);
        _this.addChild(_this.basePanel);
        if (needSkin) {
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onCompleteHandler, _this);
        }
        else {
            _this.onCompleteHandler();
        }
        return _this;
    }
    Object.defineProperty(Panel.prototype, "closeBtn", {
        get: function () {
            return this.basePanel.closeBtn;
        },
        enumerable: true,
        configurable: true
    });
    Panel.prototype.onCompleteHandler = function (e) {
        if (this.hasEventListener(eui.UIEvent.COMPLETE)) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onCompleteHandler, this);
        }
        this._loadComplete = true;
        this.configUI();
        this.addEvent();
        this.initData();
    };
    Panel.prototype.configUI = function () {
        if (this._needSkin)
            this.addChildAt(this.basePanel, 0);
    };
    Panel.prototype.addEvent = function () {
        GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onCoinUpdateHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.HONOR, this.onCoinUpdateHandler, this);
        this.basePanel.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.scrollerList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFuncBtnChangeHandler, this);
    };
    Panel.prototype.initData = function () {
        this.resType = GainLossVO.COIN;
        this.onNameLevelUpdateHandler();
        this.onCoinUpdateHandler();
        this.onGoldUpdateHandler();
    };
    Panel.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.NICKNAME, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.onNameLevelUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.COIN, this.onCoinUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onGoldUpdateHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GUILDCONTRI, this.onCoinUpdateHandler, this);
        this.basePanel.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.basePanel.scrollerList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFuncBtnChangeHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.HONOR, this.onCoinUpdateHandler, this);
    };
    Panel.prototype.onFuncBtnLoadComplete = function (e) {
        if (!this.isLoadComplete && e.data == BaseFuncBtn) {
            this.isLoadComplete = true;
            if (this._scrollH != 0) {
                this.basePanel.scrollerList.scroller.viewport.scrollH = this._scrollH;
                this._scrollH = 0;
            }
            this.funcBtnLoadCompleteCallback();
        }
    };
    Panel.prototype.funcBtnLoadCompleteCallback = function () {
    };
    Panel.prototype.onNameLevelUpdateHandler = function (e) {
        // this.basePanel.topInfoView.nameValue.text = Manager.model.self.getName() + " Lv:" + Manager.model.self.attrInfo.level;
        var nick = Manager.model.self.getName();
        var arr = nick.split(".");
        var nickName = "";
        if (arr.length == 2)
            nickName = arr[1];
        else
            nickName = nick;
        if (Manager.model.self.attrInfo.zhuanshu != 0) {
            // this._nickName.text = nickName + "   " + Manager.model.self.attrInfo.zhuanshu + "转" + Manager.model.self.attrInfo.level + "级";
            this.basePanel.txtName.text = LangCVO.getContent("common57", nickName, Manager.model.self.attrInfo.zhuanshu, Manager.model.self.attrInfo.level);
        }
        else {
            // this._nickName.text = nickName + "   " + Manager.model.self.attrInfo.level + "级";
            this.basePanel.txtName.text = LangCVO.getContent("common58", nickName, Manager.model.self.attrInfo.level);
        }
    };
    Panel.prototype.onCoinUpdateHandler = function (e) {
        switch (this.resType) {
            case GainLossVO.COIN:
                this.basePanel.iconCoin.source = "playRes_coin_54_png";
                this.basePanel.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.coin);
                break;
            case GainLossVO.GUILD_DONATE:
                this.basePanel.iconCoin.source = "playRes_donate_54_png";
                this.basePanel.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.guildContri);
                break;
            case GainLossVO.HONOR:
                this.basePanel.iconCoin.source = "playRes_honor_54_png";
                this.basePanel.txtCoin.text = StringUtils.getBigNum(Manager.model.self.attrInfo.honor);
                break;
            case GainLossVO.YUPEIXIAO_ITEM:
                this.basePanel.iconCoin.source = "playRes_yupeixiao_54_png";
                this.basePanel.txtCoin.text = "" + Manager.model.getItems().getCountItemById(ItemsType.ITEM_40000306);
                break;
        }
    };
    Panel.prototype.onGoldUpdateHandler = function (e) {
        this.basePanel.txtGold.text = StringUtils.getBigNum(Manager.model.self.attrInfo.gold);
    };
    /** 设置人物金钱 */
    Panel.prototype.setTopGameMoney = function (type) {
        this.resType = type;
        this.onCoinUpdateHandler();
    };
    Panel.prototype.onClickHandler = function (e) {
    };
    Panel.prototype.onFuncBtnChangeHandler = function (e) {
        if (!this.basePanel.scrollerList.itemList.dataProvider)
            return;
        var len = this.basePanel.scrollerList.itemList.dataProvider.length;
        var isSelected;
        var item;
        for (var i = 0; i < len; i++) {
            isSelected = this.basePanel.scrollerList.itemList.selectedIndex == i;
            item = this.basePanel.scrollerList.itemList.getElementAt(i);
            if (item)
                item.isSelected = isSelected;
            else
                this.basePanel.scrollerList.itemList.dataProvider.source[i].isSelected = isSelected;
        }
    };
    Panel.prototype.show = function (tabIndex) {
        if (tabIndex === void 0) { tabIndex = 0; }
        if (!this.parent)
            Manager.layer.uiLayer.addChild(this);
        var roleInfo = Manager.model.self;
        // if(roleInfo) this.basePanel.topInfoView.nameValue.text = roleInfo.getName() + " Lv:" + roleInfo.attrInfo.level;
        this.onNameLevelUpdateHandler();
        if (this.basePanel.scrollerList.itemList.selectedIndex != tabIndex) {
            if (tabIndex > 3)
                this._scrollH = Panel.BUTTON_OFFSET * (tabIndex - 3);
            this.basePanel.scrollerList.itemList.selectedIndex = tabIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
        }
    };
    Panel.prototype.hide = function () {
        this.dispose();
    };
    Panel.prototype.dispose = function () {
        this.removeEvent();
        if (this.basePanel) {
            this.basePanel.dispose();
            this.basePanel = null;
        }
        if (this.parent != null)
            this.parent.removeChild(this);
    };
    //功能按钮间距离
    Panel.BUTTON_OFFSET = 120;
    return Panel;
}(eui.Component));
//# sourceMappingURL=Panel.js.map