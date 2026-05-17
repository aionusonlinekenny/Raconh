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
 * 斗地主
 * Simon
 * 2018.1.19
 */
var LandlordView = (function (_super) {
    __extends(LandlordView, _super);
    function LandlordView() {
        var _this = _super.call(this) || this;
        _this.isLoadComplete = false;
        _this._showMsgRedIcon = false;
        _this.touchChildren = true;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordViewSkin");
        return _this;
    }
    LandlordView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLaird();
        this._model.lairdView = this;
        if (!this._bgImg) {
            this._bgImg = Manager.pool.create(BitmapRemote);
            this._bgImg.x = 5;
            this._bgImg.y = 118;
            this._bgImg.load(PathInfo.getPath("res/common/common_back4.png", LoaderType.IMAGE), 710, 180);
            this.addChildAt(this._bgImg, 0);
        }
        if (!this._leftBgImg) {
            this._leftBgImg = Manager.pool.create(BitmapRemote);
            this._leftBgImg.x = 5;
            this._leftBgImg.y = 296;
            this.addChildAt(this._leftBgImg, 2);
            this._leftBgImg.load(PathInfo.getPath("res/common/common_pnl_back2.png", LoaderType.IMAGE), 248, 845);
        }
        if (!this._menuBtnContent) {
            this._menuBtnContent = [];
            for (var i = 0; i < 4; i++) {
                this._menuBtnContent.push({ typeImg: "landlord_funcIcon" + (i + 1) + "_png" });
            }
            this._funList.initBtnListData(DressTypeBtn, this._menuBtnContent);
            this._funList.itemList.layout.gap = 13;
        }
    };
    LandlordView.prototype.getBtn = function (index) {
        if (this._funList) {
            var dis = this._funList.itemList.getElementAt(index);
            return dis;
        }
        return null;
    };
    LandlordView.prototype.initData = function () {
        this._catchInfo = LairdCVO.getInfo(1);
        this._rescueInfo = LairdCVO.getInfo(2);
        this._interactInfo = LairdCVO.getInfo(3);
        this._seekHelpInfo = LairdCVO.getInfo(4);
        this._funList.itemList.selectedIndex = LandlordType.IDENTITY;
        this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
        Manager.control.getLaird().lairdUpdate();
        Manager.control.getLaird().lairdInteractRec();
        Manager.control.getLaird().lairdGuildInfo();
    };
    LandlordView.prototype.delayCheck = function () {
        Manager.render.add(this.checkShowRedIcon, this, 500);
    };
    LandlordView.prototype.checkShowRedIcon = function () {
        Manager.render.remove(this.checkShowRedIcon, this);
        if (this._model) {
            if (this._model.coolyInfoList.length > 0)
                if (this.getBtn(1))
                    this.getBtn(1).showRedIcon(this._model.checkInteractIcon() || this._model.checkCanGetExp());
            if (this.getBtn(2))
                this.getBtn(2).showRedIcon(this._model.checkCatchIcon());
        }
    };
    Object.defineProperty(LandlordView.prototype, "catchInfo", {
        get: function () {
            return this._catchInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LandlordView.prototype, "rescueInfo", {
        get: function () {
            return this._rescueInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LandlordView.prototype, "interactInfo", {
        get: function () {
            return this._interactInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LandlordView.prototype, "seekHelpInfo", {
        get: function () {
            return this._seekHelpInfo;
        },
        enumerable: true,
        configurable: true
    });
    LandlordView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        this._funList.itemList.addEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, this.onInteractListUpdateHandler, this);
        // this._model.addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().addEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
    };
    LandlordView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        this._funList.itemList.removeEventListener(eui.UIEvent.CHANGE, this.onFunSelectHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_INTERACTREC_LIST_UPDATE, this.onInteractListUpdateHandler, this);
        // this._model.removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_CATCH_INFO_UPDATE, this.checkShowRedIcon, this);
        Manager.model.getLaird().removeEventListener(LairdEvent.LAIRD_PICK_EXP_UPDATE, this.checkShowRedIcon, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordView.prototype.onFuncBtnLoadComplete = function (e) {
        if (!this.isLoadComplete && e.data == DressTypeBtn) {
            this.isLoadComplete = true;
            this.delayCheck();
        }
    };
    LandlordView.prototype.onFunSelectHandler = function (e) {
        var index = this._funList.itemList.selectedIndex;
        if (index == -1)
            return;
        // if(index == this._oldIndex) return;
        if (this._curView) {
            this._curView.dispose();
            this._curView = null;
        }
        switch (index) {
            case LandlordType.IDENTITY:
                this._curView = new LandlordInfoView(this);
                break;
            case LandlordType.INTERACTION:
                if (this._model.curStatus == 1)
                    this._curView = new LandlordInteractView1(this);
                else if (this._model.curStatus == 2)
                    this._curView = new LandlordInteractView2(this);
                else {
                    FloatTips.addTips(LangCVO.getContent("laird14"), Color.RED);
                    this.changeItem(this._oldIndex);
                    return;
                }
                break;
            case LandlordType.ARREST:
                if (this._model.curStatus == 2) {
                    var cbi = Manager.pool.create(CallBackInfo, this.changeItem, this, 0);
                    Manager.tips.showTips(LangCVO.getContent("laird21", Color.RED), cbi);
                }
                else
                    this._curView = new LandlordCatchView(this._thisParent, this);
                break;
            case LandlordType.MESSAGE:
                this._curView = new LandlordMsgView(this);
                break;
        }
        this._oldIndex = index;
        if (this._curView && !this._curView.parent)
            this.addChild(this._curView);
    };
    Object.defineProperty(LandlordView.prototype, "curPage", {
        get: function () {
            return this._oldIndex;
        },
        enumerable: true,
        configurable: true
    });
    LandlordView.prototype.onInteractListUpdateHandler = function (e) {
        var list = e.params;
        if (!list || list.length == 0)
            return;
        if (!this._dataList) {
            this._dataList = list.reverse();
            this._historyList.initBtnListData(LandlordHistoryItem, this._dataList, true);
            this._historyList.itemList.layout.gap = 5;
        }
        else {
            this._dataList.splice(0, 0, list[0]);
            this._historyList.dataProvider(this._dataList);
        }
    };
    LandlordView.prototype.onInfoUpdateHandler = function (e) {
        // if(this._oldIndex == 1 && this._model.lordInfoList.length == 0 && this._model.coolyInfoList.length == 0)
        // {
        // 	this.changeItem(0);
        // }
        // this.checkShowRedIcon();
    };
    LandlordView.prototype.onClubMemberUpdateHandler = function (e) {
        this._showMsgRedIcon = false;
        var list = e.params;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].isSeekHelp == 1) {
                    this._showMsgRedIcon = true;
                    break;
                }
            }
        }
        Manager.render.add(this.updateIcon, this, 500);
    };
    LandlordView.prototype.updateIcon = function () {
        Manager.render.remove(this.updateIcon, this);
        this.getBtn(3).showRedIcon(this._showMsgRedIcon);
    };
    LandlordView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    LandlordView.prototype.changeMenuItem = function (index) {
        if (this._thisParent)
            this._thisParent.changeMenuItem(index);
    };
    LandlordView.prototype.changeItem = function (index) {
        this._funList.itemList.selectedIndex = index;
        this._funList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
    };
    LandlordView.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        this._funList.dispose();
        this._funList = null;
        this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        this._curView.dispose();
        this._curView = null;
    };
    LandlordView.prototype.dispose = function () {
        Manager.render.remove(this.checkShowRedIcon, this);
        Manager.render.remove(this.updateIcon, this);
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._funList, this._historyList, this._bgImg, this._leftBgImg);
        if (this._bgImg)
            Manager.pool.push(this._bgImg);
        this._bgImg = null;
        if (this._leftBgImg)
            Manager.pool.push(this._leftBgImg);
        this._leftBgImg = null;
        if (this._funList)
            this._funList.dispose();
        this._funList = null;
        if (this._historyList)
            this._historyList.dispose();
        this._historyList = null;
        this._catchInfo = null;
        this._rescueInfo = null;
        this._interactInfo = null;
        this._seekHelpInfo = null;
        this._model.lairdView = null;
        this._model = null;
        if (this._menuBtnContent)
            this._menuBtnContent.length = 0;
        this._menuBtnContent = null;
        if (this._curView)
            this._curView.dispose();
        this._curView = null;
        this._dataList = null;
        this._thisParent = null;
    };
    return LandlordView;
}(UIComponent));
__reflect(LandlordView.prototype, "LandlordView");
//# sourceMappingURL=LandlordView.js.map