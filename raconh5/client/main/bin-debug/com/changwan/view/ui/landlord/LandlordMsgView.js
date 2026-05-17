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
 * 斗地主信息界面
 */
var LandlordMsgView = (function (_super) {
    __extends(LandlordMsgView, _super);
    function LandlordMsgView(thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordMsgViewSkin");
        return _this;
    }
    LandlordMsgView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLaird();
    };
    LandlordMsgView.prototype.initData = function () {
        this._status.text = LangCVO.getContent("laird" + (this._model.curStatus + 4));
        if (this._model.curStatus == 2) {
            this._label1.text = LangCVO.getContent("laird20");
            this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.seekHelpInfo.value - this._model.lairdRoleInfo.seekHelpCount : this._thisParent.seekHelpInfo.value) + "/" + this._thisParent.seekHelpInfo.value;
        }
        else {
            this._label1.text = LangCVO.getContent("laird19");
            this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.rescueInfo.value - this._model.lairdRoleInfo.rescueCount : this._thisParent.rescueInfo.value) + "/" + this._thisParent.rescueInfo.value;
        }
        Manager.control.getLaird().lairdGuildInfo();
    };
    LandlordMsgView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
        this._model.addEventListener(LairdEvent.LAIRD_SEEK_HELP_UPDATE, this.onUpdateSeekHelpHandler, this);
    };
    LandlordMsgView.prototype.removeEvent = function () {
        this._model.removeEventListener(LairdEvent.LAIRD_CLUB_MEMBER_INFO_UPDATE, this.onClubMemberUpdateHandler, this);
        this._model.removeEventListener(LairdEvent.LAIRD_SEEK_HELP_UPDATE, this.onUpdateSeekHelpHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordMsgView.prototype.onClubMemberUpdateHandler = function (e) {
        var coolyInfoList = this._model.coolyInfoList;
        var list = e.params;
        if (!list || list.length == 0)
            return;
        var tmpList = [];
        for (var i = 0; i < list.length; i++) {
            // if(list[i].status == 2)
            // {
            var has = false;
            for (var j = 0; j < coolyInfoList.length; j++) {
                if (coolyInfoList[j].name == list[i].nickName) {
                    has = true;
                    break;
                }
            }
            if (!has)
                tmpList.push(list[i]);
            // }
        }
        tmpList.sort(this.sortByTime);
        this._playerList.initBtnListData(LandlordMsgItem, tmpList, true);
    };
    LandlordMsgView.prototype.sortByTime = function (value1, value2) {
        if (value1.catchTime < value2.catchTime)
            return 1;
        else if (value1.catchTime > value2.catchTime)
            return -1;
        else
            return 0;
    };
    LandlordMsgView.prototype.onUpdateSeekHelpHandler = function (e) {
        if (this._model.curStatus == 2)
            this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.seekHelpInfo.value - this._model.lairdRoleInfo.seekHelpCount : this._thisParent.seekHelpInfo.value) + "/" + this._thisParent.seekHelpInfo.value;
        else
            this._saveTime.text = (this._model.lairdRoleInfo ? this._thisParent.rescueInfo.value - this._model.lairdRoleInfo.rescueCount : this._thisParent.rescueInfo.value) + "/" + this._thisParent.rescueInfo.value;
    };
    LandlordMsgView.prototype.reuse = function (thisParent) {
        _super.prototype.reuse.call(this);
        this._thisParent = thisParent;
    };
    LandlordMsgView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._status, this._label1, this._saveTime, this._playerList);
        if (this._status)
            this._status.dispose();
        this._status = null;
        if (this._label1)
            this._label1.dispose();
        this._label1 = null;
        if (this._saveTime)
            this._saveTime.dispose();
        this._saveTime = null;
        if (this._playerList)
            this._playerList.dispose();
        this._playerList = null;
        this._itemContent = null;
        this._model = null;
        this._thisParent = null;
    };
    return LandlordMsgView;
}(UIComponent));
__reflect(LandlordMsgView.prototype, "LandlordMsgView");
//# sourceMappingURL=LandlordMsgView.js.map