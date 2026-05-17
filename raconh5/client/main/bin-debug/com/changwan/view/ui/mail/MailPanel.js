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
// 邮件主界面
var MailPanel = (function (_super) {
    __extends(MailPanel, _super);
    function MailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("mail", "MailViewSkin");
        return _this;
    }
    MailPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getMail();
        this._model.mailInfos = [];
        this.basePanel.setBottomBackTop(979);
        this.basePanel.title = "mail_title_png";
        // this.basePanel.backBtn.selected = false;
        if (!this._menuBtnContent) {
            this._menuBtnContent = [
                { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "mail_btn_normal_png", imgClick: "mail_btn_normal_png" },
            ];
        }
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, this._menuBtnContent);
        this.basePanel.scrollerList.itemList.layout.gap = 0;
    };
    MailPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._allBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.addEventListener(MailEvent.UPDATE_LIST, this.onUpdateListHandler, this);
        this._model.addEventListener(MailEvent.MAIL_RECEIVE, this.onUpdateListHandler, this);
        this._model.addEventListener(MailEvent.MAIL_DELETE, this.onUpdateListHandler, this);
        this._model.addEventListener(MailEvent.HAS_READ_MAIL, this.onUpdateListHandler, this);
        this._mailList.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickItemHandler, this);
    };
    MailPanel.prototype.removeEvent = function () {
        this._allBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._model.removeEventListener(MailEvent.UPDATE_LIST, this.onUpdateListHandler, this);
        this._model.removeEventListener(MailEvent.MAIL_RECEIVE, this.onUpdateListHandler, this);
        this._model.removeEventListener(MailEvent.MAIL_DELETE, this.onUpdateListHandler, this);
        this._model.removeEventListener(MailEvent.HAS_READ_MAIL, this.onUpdateListHandler, this);
        this._mailList.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickItemHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    MailPanel.prototype.initData = function () {
        _super.prototype.initData.call(this);
        Manager.control.getMail().mailListRequest();
    };
    MailPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                // Manager.panel.hide(this);
                Manager.view.hide(14 /* MailPanel */);
                break;
            case this._allBtn:
                // MailAllFetchView.instance.show();
                var mailInfos = Manager.model.getMail().mailInfos;
                var len = mailInfos ? mailInfos.length : 0;
                for (var i = 0; i < len; i++) {
                    if (mailInfos[i].attachStatus == MailConst.UN_FETCH) {
                        Manager.view.show(2 /* MailAllFetchView */);
                        return;
                    }
                }
                FloatTips.addTips(LangCVO.getContent("mail1"), Color.RED);
                break;
        }
    };
    MailPanel.prototype.onUpdateListHandler = function (e) {
        /// 填充数据
        var mailInfos = this._model.mailInfos;
        this._mailList.initBtnListData(MailItemView, mailInfos, true);
        this._mailList.itemList.layout.gap = -6;
    };
    MailPanel.prototype.onClickItemHandler = function (e) {
        var list = e.currentTarget;
        var length = list.numChildren;
        for (var i = 0; i < length; i++) {
            list.getChildAt(i).setBgStyle(list.selectedItem);
        }
    };
    MailPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this.basePanel, this._mailList, this._allBtn);
        this.basePanel = null;
        this._mailList = null;
        this._allBtn = null;
        this._menuBtnContent.length = 0;
        this._model = null;
    };
    return MailPanel;
}(Panel));
__reflect(MailPanel.prototype, "MailPanel");
//# sourceMappingURL=MailPanel.js.map