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
var LandlordMsgItem = (function (_super) {
    __extends(LandlordMsgItem, _super);
    function LandlordMsgItem() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordMsgItemSkin");
        return _this;
    }
    LandlordMsgItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._btnImg.touchEnabled = false;
        this._model = Manager.model.getLaird();
        this.addEvent();
    };
    LandlordMsgItem.prototype.addEvent = function () {
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LandlordMsgItem.prototype.removeEvent = function () {
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
    };
    LandlordMsgItem.prototype.onClickHandler = function (e) {
        if (this._model.lairdView.curPage == 2) {
            if (Manager.model.getLaird().curStatus == LairdStatusType.STATUS_COOLY) {
                //你现在的身份是苦工，需要反抗成为自由身才能抓捕苦工
                FloatTips.addTips(LangCVO.getContent("laird21"), Color.RED);
                return;
            }
            if (Manager.model.getLaird().catchCount - Manager.model.getLaird().lairdRoleInfo.catchCount <= 0) {
                //今日剩余抓捕次数不足
                FloatTips.addTips(LangCVO.getContent("laird24"), Color.RED);
                return;
            }
            if (Manager.model.getLaird().coolyInfoList.length >= 2) {
                //苦工数量已满
                FloatTips.addTips(LangCVO.getContent("laird25"), Color.RED);
                return;
            }
        }
        if (!Manager.model.self.canJoinActive(true))
            return;
        if (this._catchInfo)
            Manager.control.getLaird().lairdFight(0, this._catchInfo.id);
        else if (this._clubMemberInfo) {
            if (this._model.curStatus == LairdStatusType.STATUS_FREE || this._model.curStatus == LairdStatusType.STATUS_LORD)
                Manager.control.getLaird().lairdFight(1, this._clubMemberInfo.playerId);
            else
                Manager.control.getLaird().lairdSeekHelp(this._clubMemberInfo.playerId);
        }
    };
    LandlordMsgItem.prototype.dataChanged = function () {
        if (this.data instanceof LairdCatchInfo) {
            this._catchInfo = this.data;
            if (this._catchInfo) {
                this._nickName.text = "Lv." + this._catchInfo.level + " " + this._catchInfo.name;
                this._status1.text = LangCVO.getContent("laird" + (this._catchInfo.status + 4));
                var label3Str = "";
                var status2Str = "";
                if (this._catchInfo.status == LairdStatusType.STATUS_COOLY) {
                    label3Str = "<font color='" + Color.DEF_STR + "'>" + LangCVO.getContent("laird22") + "</font>";
                    status2Str = "<font color='" + Color.RED_STR + "'>" + this._catchInfo.lordName + "</font>";
                }
                else {
                    label3Str = "<font color='" + Color.DEF_STR + "'>" + LangCVO.getContent("laird12") + "</font>";
                    status2Str = "<font color='" + Color.RED_STR + "'>" + LangCVO.getContent("laird" + (this._catchInfo.catchType + 6)) + "</font>";
                }
                HtmlUtil.setTextFlow(this._label3, label3Str);
                HtmlUtil.setTextFlow(this._status2, status2Str);
                this._btnImg.source = "landlord_zhuabu_png";
            }
        }
        if (this.data instanceof LairdClubMemberInfo) {
            this._clubMemberInfo = this.data;
            if (this._clubMemberInfo) {
                this._nickName.text = "Lv." + this._clubMemberInfo.level + " " + this._clubMemberInfo.nickName;
                if ((this._model.curStatus == 0 || this._model.curStatus == 1) && this._clubMemberInfo.status == 2) {
                    this._idType.text = LangCVO.getContent("laird22");
                    this._status1.text = this._clubMemberInfo.lordName;
                }
                else {
                    this._idType.text = LangCVO.getContent("laird23");
                    this._status1.text = LangCVO.getContent("laird" + (this._clubMemberInfo.status + 4));
                }
                HtmlUtil.setTextFlow(this._label3, "<font color='" + Color.DEF_STR + "'>" + LangCVO.getContent("laird9") + "</font>");
                HtmlUtil.setTextFlow(this._status2, "<font color='" + Color.DEF_STR + "'>" + this._clubMemberInfo.fight + "</font>");
                if (this._model.curStatus == LairdStatusType.STATUS_FREE || this._model.curStatus == LairdStatusType.STATUS_LORD) {
                    this._helpTips.visible = (this._clubMemberInfo.isSeekHelp == 1);
                    this._btnImg.source = "landlord_jiejiu_png";
                }
                else {
                    this._helpTips.visible = false;
                    this._btnImg.source = "landlord_help_png";
                }
            }
        }
    };
    LandlordMsgItem.prototype.dispose = function () {
        this.removeEvent();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._nickName, this._label3, this._status1, this._status2, this._btn, this._btnImg, this._helpTips);
        if (this._nickName)
            this._nickName.dispose();
        this._nickName = null;
        if (this._idType)
            this._idType.dispose();
        this._idType = null;
        if (this._label3)
            this._label3.dispose();
        this._label3 = null;
        if (this._status1)
            this._status1.dispose();
        this._status1 = null;
        if (this._status2)
            this._status2.dispose();
        this._status2 = null;
        if (this._btn)
            this._btn.dispose();
        this._btn = null;
        this._btnImg = null;
        this._helpTips = null;
        this._model = null;
        this._catchInfo = null;
        this._clubMemberInfo = null;
    };
    return LandlordMsgItem;
}(ItemRenderer));
__reflect(LandlordMsgItem.prototype, "LandlordMsgItem");
//# sourceMappingURL=LandlordMsgItem.js.map