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
 * pzx
 * 充值活动
 * 2018.1.19
 */
var RechargeActivityPanel = /** @class */ (function (_super) {
    __extends(RechargeActivityPanel, _super);
    function RechargeActivityPanel() {
        return _super.call(this, false) || this;
    }
    RechargeActivityPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1280);
        if (this._bitimg == null) {
            this._bitimg = Manager.pool.create(BitmapRemote);
            this._bitimg.x = 5;
            this._bitimg.y = 116;
            this.basePanel.addChildAt(this._bitimg, 3);
        }
        this._model = Manager.model.getrechargeActivity();
        this._btnDatas = this._model.getTitleTabList();
        if (!Manager.model.getcashCow().levItemModel.checkTotalRaward()) {
            var levBoo = Manager.model.getcashCow().levItemModel.checkReward();
            this._btnDatas.push({ type: RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ashCow_chongjili_png", imgClick: "ashCow_chongjili_png", showRedIcon: levBoo });
        }
        //兑换活动
        var boo = Manager.model.getExchange().checkCoin();
        var day = Manager.model.getLogin().serverTimeInfo.serverOpenDays;
        var exchangeDay = ExchangeCVO.getServerDay();
        if (day > exchangeDay)
            this._btnDatas.push({ showRedIcon: boo, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "exchange_icon_png", imgClick: "exchange_icon_png", type: RechargeActivityType.RECHARGEACTIVITY_EXCHANGE_TYPE });
        this._btnDatas.push({ showRedIcon: boo, bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "starUp_icon_png", imgClick: "starUp_icon_png", type: RechargeActivityType.RECHARGEACTIVITY_XIANSHI_TYPE });
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._btnDatas);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    RechargeActivityPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.GOLD, this.onIconShowHandler, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onIconShowHandler, this);
        Manager.model.getcashCow().levItemModel.addEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.onIconShowHandler2, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.onIconShowHandler2, this);
    };
    RechargeActivityPanel.prototype.removeEvent = function () {
        this._model.removeEventListener(RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onIconShowHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.GOLD, this.onIconShowHandler, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.VIP_LEVEL, this.onIconShowHandler, this);
        Manager.model.getcashCow().levItemModel.removeEventListener(CashCowEvent.LEVITEM_UPDATE_EVENT, this.onIconShowHandler2, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.onIconShowHandler2, this);
        _super.prototype.removeEvent.call(this);
    };
    RechargeActivityPanel.prototype.onIconShowHandler = function (e) {
        var selectedIndex = this.basePanel.scrollerList.itemList.selectedIndex;
        var type = this._btnDatas[selectedIndex].type;
        var boo;
        switch (type) {
            case 1:
            case 2:
            case 3:
                if (e.type != RechargeActivityEvent.RECHARGEACTIVITY_UPDATE_EVENT)
                    return;
                var id = e.params;
                var cvo = RechargeActivityCVO.getcvo(id);
                var index = void 0;
                for (var i = this._btnDatas.length - 1; i > -1; i--) {
                    var any = this._btnDatas[i];
                    if (any && any.type == cvo.type) {
                        index = i;
                    }
                }
                boo = this._model.checkReward(cvo.type);
                break;
            case 4:
                boo = Manager.model.getExchange().checkCoin();
                break;
            case 6:
                break;
        }
        var btn;
        btn = this.setPromptSign(selectedIndex);
        if (btn)
            btn.setIconShow(boo);
    };
    RechargeActivityPanel.prototype.onIconShowHandler2 = function (e) {
        if (Manager.model.getcashCow().levItemModel.checkTotalRaward()) {
            this.removetTab(RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE);
            return;
        }
        var index;
        for (var i = this._btnDatas.length - 1; i > -1; i--) {
            var any = this._btnDatas[i];
            if (any && any.type == RechargeActivityType.RECHARGEACTIVITY_LEVE_TYPE) {
                index = i;
                break;
            }
        }
        var btn;
        btn = this.setPromptSign(index);
        var boo = Manager.model.getcashCow().levItemModel.checkReward();
        if (btn)
            btn.setIconShow(boo);
    };
    RechargeActivityPanel.prototype.removetTab = function (type) {
        for (var i = this._btnDatas.length - 1; i > -1; i--) {
            var info = this._btnDatas[i];
            if (info.type == type) {
                this._btnDatas.splice(i, 1);
            }
        }
        this.basePanel.scrollerList.dataProvider(this._btnDatas);
    };
    RechargeActivityPanel.prototype.setPromptSign = function (index) {
        if (this.basePanel) {
            var dis = this.basePanel.scrollerList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    RechargeActivityPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (!this._btnDatas[index])
            return;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        if (this._view) {
            this._view = null;
        }
        var type = this._btnDatas[index].type;
        switch (type) {
            case 1:
            case 2:
            case 3:
                this._view = new RechargeActivityView();
                this.basePanel.title = "rechargeActivity_title_" + type + "_png";
                this._view.setData(type);
                this._curView = this._view;
                this._bitimg.visible = true;
                this._bitimg.load(Manager.path.getPanelrechargeActivityPath("rechargeActivity_bg" + type));
                break;
            case 4:
                this.basePanel.title = "exchange_title_png";
                this._curView = Manager.pool.create(ExchangeView, this);
                this._bitimg.visible = true;
                this._bitimg.load(Manager.path.getPanelrechargeActivityPath("rechargeActivity_bg" + type));
                break;
            case 5:
                this.basePanel.title = "ashCow_chongjihaoli_png";
                this._curView = new LevItemView();
                this.basePanel.setBottomBackTop(1280);
                this._bitimg.visible = false;
                break;
            case 6:
                this.basePanel.title = "xianshi_title_png";
                this._curView = Manager.pool.create(XianshiView, this);
                this._bitimg.visible = true;
                this._bitimg.load(Manager.path.getPanelrechargeActivityPath("rechargeActivity_bg" + type));
                break;
        }
        if (this._curView && !this._curView.parent)
            this.addChild(this._curView);
    };
    RechargeActivityPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(88 /* RechargeActivityPanel */);
                break;
        }
    };
    RechargeActivityPanel.prototype.dispose = function () {
        if (this._bitimg) {
            this.basePanel.removeChild(this._bitimg);
            Manager.pool.push(this._bitimg);
            this._bitimg = null;
        }
        _super.prototype.dispose.call(this);
        ObjectUtil.remove(this._view);
        if (this._view)
            this._view.dispose();
        this._view = null;
        this._btnDatas = null;
        this._model = null;
    };
    return RechargeActivityPanel;
}(Panel));
//# sourceMappingURL=RechargeActivityPanel.js.map