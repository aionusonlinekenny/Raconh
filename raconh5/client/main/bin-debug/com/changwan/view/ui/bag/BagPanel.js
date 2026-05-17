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
var BagPanel = (function (_super) {
    __extends(BagPanel, _super);
    function BagPanel() {
        var _this = _super.call(this, false) || this;
        _this._isLoadComplete = false;
        // private _scrollH:number = 0;
        /**
         * 用于溶炼播放动画时不能操作
         */
        _this.cantClick = false;
        _this._isAutoRonglian = false;
        _this._curIndex = 0;
        return _this;
    }
    BagPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1000);
        var canRonglian = Manager.model.getEquip().checkCanRonglian();
        this._menuBtnContent = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "bag_beibao1_png", imgClick: "bag_beibao1_png", showRedIcon: false },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "bag_cangku1_png", imgClick: "bag_cangku1_png", showRedIcon: false },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "ronglian_btnImg_png", imgClick: "ronglian_btnImg_png", showRedIcon: canRonglian }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    BagPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        // GameDispatcher.getInstance().addEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
    };
    BagPanel.prototype.removeEvent = function () {
        // GameDispatcher.getInstance().removeEventListener(BaseUIEvent.ITEM_RENDERER_COMPLETE, this.onFuncBtnLoadComplete, this);
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.onItemUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    // private onFuncBtnLoadComplete(e:BaseUIEvent):void
    // {
    // 	if(!this._isLoadComplete && e.data == BaseFuncBtn && this._scrollH != 0)
    // 	{
    // 		this._isLoadComplete = true;
    // 		this.basePanel.scrollerList.scroller.viewport.scrollH = this._scrollH;
    // 		this._scrollH = 0;
    // 		for(let i:number=0; i<this._menuBtnContent.length; i++)
    // 		{
    // 			if(i == this.basePanel.scrollerList.itemList.selectedIndex)
    // 				this._menuBtnContent[i].isSelected = true;
    // 			else
    // 				this._menuBtnContent[i].isSelected = false;
    // 		}
    // 	}
    // }
    BagPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        Manager.view.hide(11 /* BagPanel */);
    };
    BagPanel.prototype.onItemUpdateHandler = function (e) {
        if (!Manager.render.contains(this.onItemUpdate, this))
            Manager.render.add(this.onItemUpdate, this, 100);
    };
    BagPanel.prototype.onItemUpdate = function () {
        var rongLianbtn = this.basePanel.scrollerList.itemList.getElementAt(2);
        if (rongLianbtn)
            rongLianbtn.setIconShow(Manager.model.getEquip().checkCanRonglian());
        if (Manager.render.contains(this.onItemUpdate, this))
            Manager.render.remove(this.onItemUpdate, this);
    };
    BagPanel.prototype.dispose = function () {
        if (Manager.render.contains(this.onItemUpdate, this))
            Manager.render.remove(this.onItemUpdate, this);
        this._curView = null;
        if (this._bagView) {
            this._bagView.dispose();
            this._bagView = null;
        }
        if (this._depotView) {
            this._depotView.dispose();
            this._depotView = null;
        }
        if (this._ronglianView) {
            Manager.pool.push(this._ronglianView);
            this._ronglianView = null;
        }
        _super.prototype.dispose.call(this);
    };
    BagPanel.prototype.onFuncBtnChangeHandler = function (e) {
        if (this.cantClick)
            return;
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        if (index == 2 && !OpenCVO.isOpen(OpenConst.ID_RONGLIAN, true)) {
            this.basePanel.scrollerList.itemList.selectedIndex = this._curIndex;
            this.basePanel.scrollerList.itemList.dispatchEventWith(eui.UIEvent.CHANGE);
            return;
        }
        if (this._curView && this._curView.parent) {
            if (this._curView == this._ronglianView && Manager.model.getGuide().curID == GuideID.RONG_LIAN)
                Manager.control.getTask().hideGuide();
            this._curView.parent.removeChild(this._curView);
        }
        switch (index) {
            case 0:
                if (!this._bagView)
                    // this._bagView = Manager.pool.create(BagView2, this);
                    this._bagView = new BagView2(this);
                this._curView = this._bagView;
                this.basePanel.title = "bag_beibao_png";
                break;
            case 1:
                if (!this._depotView)
                    this._depotView = new DepotView2();
                this._curView = this._depotView;
                this.basePanel.title = "bag_cangku_png";
                break;
            case 2:
                if (!this._ronglianView)
                    this._ronglianView = Manager.pool.create(RonglianView, this, this._isAutoRonglian);
                this._curView = this._ronglianView;
                this.basePanel.title = "bag_ronglian_png";
                break;
        }
        if (!this._curView.parent)
            this.addChild(this._curView);
        this._curIndex = index;
    };
    BagPanel.prototype.show = function (tabIndex, isAutoRonglian) {
        if (tabIndex === void 0) { tabIndex = 0; }
        if (isAutoRonglian === void 0) { isAutoRonglian = false; }
        this._isAutoRonglian = isAutoRonglian;
        _super.prototype.show.call(this, tabIndex);
        // this.changeFuncBtn(tabIndex);
    };
    return BagPanel;
}(Panel));
__reflect(BagPanel.prototype, "BagPanel");
//# sourceMappingURL=BagPanel.js.map