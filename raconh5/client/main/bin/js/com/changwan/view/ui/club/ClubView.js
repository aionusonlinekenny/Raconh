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
 * 宗门正殿
 * Simon
 * 2017.12.14
 */
var ClubView = /** @class */ (function (_super) {
    __extends(ClubView, _super);
    function ClubView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("club", "ClubViewSkin");
        _this.visible = false;
        _this.touchChildren = true;
        return _this;
    }
    ClubView.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._basePopView.titleImg.source = "club_zhengdian_png";
        this._basePopView.diImgVisible = false;
        this._basePopView.y = -180;
        this._basePopView.bgHeight = 900;
        this._btnImg1.touchEnabled = false;
        this._btnImg2.touchEnabled = false;
        this.onResizeHandler(null);
        this.visible = true;
        Manager.control.getClub().memberListQuery();
    };
    ClubView.prototype.initData = function () {
        this._clubInfo = Manager.model.getClub().clubInfo;
        if (this._clubInfo) {
            this._clubName.text = this._clubInfo.clubName;
            this._masterName.text = this._clubInfo.masterName == undefined ? LangCVO.getContent("club4") : this._clubInfo.masterName;
            this._masterIcon.visible = this._clubInfo.masterName == undefined;
            if (!(this._clubInfo.masterName == undefined)) {
                if (!this._imageHead)
                    this._imageHead = Manager.pool.create(BitmapRemote);
                this._imageHead.load(Manager.path.getRoleHeadPath(1, this._clubInfo.masterSex == 0 ? 2 : 1));
                this._imageHead.x = this._masterIcon.x;
                this._imageHead.y = this._masterIcon.y;
                this._masterIcon.parent.addChild(this._imageHead);
            }
            this._gongxian.text = Manager.model.self.attrInfo.guildContri + "/" + this._clubInfo.hisDonate;
        }
        this._numValue1 = 5;
        this._numValue2 = 5;
        var len = this._clubInfo.donateList.length;
        for (var i = 0; i < len; i++) {
            switch (this._clubInfo.donateList[i].donateType) {
                case 1:
                    this._numValue1 = ClubDataCVO.getClubDonateById(1).count - this._clubInfo.donateList[i].count;
                    this._red1.visible = this._numValue1 > 0;
                    break;
                case 2:
                    this._numValue2 = ClubDataCVO.getClubDonateById(2).count - this._clubInfo.donateList[i].count;
                    break;
            }
        }
        var donateInfo1 = ClubDataCVO.getClubDonateById(1);
        if (donateInfo1) {
            this._gongxianValue1.text = donateInfo1.gainValue + "";
            HtmlUtil.setTextFlow(this._timeValue1, LangCVO.getContent("club5", this._numValue1));
            this._coinValue.text = donateInfo1.lostValue + "";
        }
        var donateInfo2 = ClubDataCVO.getClubDonateById(2);
        if (donateInfo2) {
            this._gongxianValue2.text = donateInfo2.gainValue + "";
            HtmlUtil.setTextFlow(this._timeValue2, LangCVO.getContent("club5", this._numValue2));
            this._goldValue.text = donateInfo2.lostValue + "";
        }
        //引导
        if (Manager.model.getGuide().curID == GuideID.CLUB_DONATE) {
            var pos = this._btn1.parent.localToGlobal(this._btn1.x, this._btn1.y);
            Manager.control.getTask().showGuide(pos, this._btn1.width >> 1, this._btn1.height >> 1, this.guideCB, this, false);
        }
    };
    ClubView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        GameDispatcher.getInstance().addEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST, this.onUpdataMemberInfoList, this);
        Manager.model.getClub().addEventListener(ClubEvent.UPDATE_CLUB_DONATE, this.onUpdataDonate, this);
    };
    ClubView.prototype.removeEvent = function () {
        GameDispatcher.getInstance().removeEventListener(GlobalEvent.RESIZE, this.onResizeHandler, this);
        this._basePopView.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this._btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_MEMBERINFO_LIST, this.onUpdataMemberInfoList, this);
        Manager.model.getClub().removeEventListener(ClubEvent.UPDATE_CLUB_DONATE, this.onUpdataDonate, this);
        _super.prototype.removeEvent.call(this);
    };
    ClubView.prototype.onResizeHandler = function (e) {
        this.x = Math.round(Manager.global.gameMain.stage.stageWidth - this.width) / 2;
        this.y = Math.round(Manager.global.gameMain.stage.stageHeight - this.height) / 2;
    };
    ClubView.prototype.onClickHandler = function (e) {
        switch (e.currentTarget) {
            case this._basePopView.closeBtn:
                Manager.view.hide(40 /* ClubView */);
                break;
            case this._btn1:
                this.donateCoin(e);
                break;
            case this._btn2:
                if (this._numValue2 > 0) {
                    if (Manager.model.self.attrInfo.gold < Number(this._goldValue.text))
                        FloatTips.addTips(LangCVO.getContent("common33"), Color.RED);
                    else
                        Manager.control.getClub().clubDonate(2);
                }
                else
                    FloatTips.addTips(LangCVO.getContent("club14"), Color.RED);
                break;
        }
    };
    ClubView.prototype.donateCoin = function (e) {
        if (e != null && Manager.model.getGuide().curID == GuideID.CLUB_DONATE)
            return;
        if (this._numValue1 > 0) {
            if (Manager.model.self.attrInfo.coin < Number(this._coinValue.text))
                FloatTips.addTips(LangCVO.getContent("common34"), Color.RED);
            else
                Manager.control.getClub().clubDonate(1);
        }
        else
            FloatTips.addTips(LangCVO.getContent("club14"), Color.RED);
    };
    ClubView.prototype.onUpdataMemberInfoList = function (e) {
        var content = [];
        var infoList = Manager.model.getClub().clubMemberList;
        var memberInfoList = [];
        for (var i = 0; i < infoList.length - 1; i++) {
            memberInfoList.push(infoList[i]);
        }
        memberInfoList.sort(this.sortByFighting);
        memberInfoList.sort(this.sortByCareer);
        for (var i = 0; i < (memberInfoList.length > 15 ? 15 : memberInfoList.length); i++) {
            var careerName = "";
            var info = ClubDataCVO.getClubCareerById(memberInfoList[i].clubCareer);
            if (info)
                careerName = info.careerName;
            content.push({ careerId: memberInfoList[i].clubCareer, career: careerName, nickName: memberInfoList[i].nickName, fighting: memberInfoList[i].fighting });
        }
        this._memberList.initBtnListData(ClubMemberItemView, content, true);
        this._memberList.itemList.layout.gap = 0;
        var myInfo = infoList[infoList.length - 1];
        if (myInfo) {
            var careerName = "";
            var info = ClubDataCVO.getClubCareerById(myInfo.clubCareer);
            if (info)
                careerName = info.careerName;
            this._clubCareer.text = careerName;
            this._nickName.text = myInfo.nickName;
            this._fighting.text = myInfo.fighting + "";
        }
        this._allFight.text = StringUtils.getBigNum(Manager.model.getClub().allFight);
    };
    ClubView.prototype.sortByCareer = function (value1, value2) {
        if (value1.clubCareer < value2.clubCareer)
            return 1;
        else if (value1.clubCareer > value2.clubCareer)
            return -1;
        else
            return 0;
    };
    ClubView.prototype.sortByFighting = function (value1, value2) {
        if (value1.fighting < value2.fighting)
            return 1;
        else if (value1.fighting > value2.fighting)
            return -1;
        else
            return 0;
    };
    ClubView.prototype.onUpdataDonate = function (e) {
        this.initData();
    };
    ClubView.prototype.guideCB = function () {
        this.donateCoin(null);
        Manager.control.getTask().hideGuide();
    };
    ClubView.prototype.show = function () {
        Manager.layer.tipsLayer.addChild(this);
    };
    ClubView.prototype.hide = function () {
        if (Manager.model.getGuide().curID == GuideID.CLUB_DONATE)
            Manager.control.getTask().hideGuide();
        Manager.layer.tipsLayer.removeChild(this);
    };
    ClubView.prototype.dispose = function () {
        if (Manager.model.getGuide().curID == GuideID.CLUB_DONATE)
            Manager.control.getTask().hideGuide();
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._btnImg1, this._btnImg2, this._masterIcon, this._allFight);
        if (this._basePopView)
            this._basePopView.dispose();
        this._basePopView = null;
        if (this._clubName)
            this._clubName.dispose();
        this._clubName = null;
        if (this._masterName)
            this._masterName.dispose();
        this._masterName = null;
        if (this._memberList)
            this._memberList.dispose();
        this._memberList = null;
        if (this._gongxian)
            this._gongxian.dispose();
        this._gongxian = null;
        if (this._gongxianValue1)
            this._gongxianValue1.dispose();
        this._gongxianValue1 = null;
        if (this._gongxianValue2)
            this._gongxianValue2.dispose();
        this._gongxianValue2 = null;
        if (this._timeValue1)
            this._timeValue1.dispose();
        this._timeValue1 = null;
        if (this._timeValue2)
            this._timeValue2.dispose();
        this._timeValue2 = null;
        this._btnImg1 = null;
        this._btnImg2 = null;
        if (this._btn1)
            this._btn1.dispose();
        this._btn1 = null;
        if (this._btn2)
            this._btn2.dispose();
        this._btn2 = null;
        if (this._clubCareer)
            this._clubCareer.dispose();
        this._clubCareer = null;
        if (this._nickName)
            this._nickName.dispose();
        this._nickName = null;
        if (this._fighting)
            this._fighting.dispose();
        this._fighting = null;
        if (this._coinValue)
            this._coinValue.dispose();
        this._coinValue = null;
        if (this._goldValue)
            this._goldValue.dispose();
        this._goldValue = null;
        if (this._allFight)
            this._allFight.dispose();
        this._allFight = null;
        this._clubInfo = null;
        if (this._imageHead)
            Manager.pool.push(this._imageHead);
        this._imageHead = null;
    };
    return ClubView;
}(UIComponent));
//# sourceMappingURL=ClubView.js.map