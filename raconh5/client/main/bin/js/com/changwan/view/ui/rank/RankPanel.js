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
 * 排行榜面板
 * luzhihong
 * create 2017-11-02
 */
var RankPanel = /** @class */ (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super.call(this) || this;
        _this._model = Manager.model.getRank();
        _this.skinName = Manager.path.getSkinName("rank", "RankSkin");
        return _this;
    }
    RankPanel.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this.basePanel.setBottomBackTop(1056);
        this.basePanel.addChildAt(this._content, 3);
        var btnDatas = [
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_0_png", imgClick: "rank_btn_0_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_7_png", imgClick: "rank_btn_7_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_1_png", imgClick: "rank_btn_1_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_2_png", imgClick: "rank_btn_2_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_3_png", imgClick: "rank_btn_3_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_4_png", imgClick: "rank_btn_4_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_5_png", imgClick: "rank_btn_5_png" },
            { bgImgNormal: "panel_funcBtnBg_png", bgImgClick: "panel_funcBtnBg_png", imgNormal: "rank_btn_6_png", imgClick: "rank_btn_6_png" }
        ];
        this.basePanel.scrollerList.initBtnListData(BaseFuncBtn, btnDatas, true);
        this.basePanel.scrollerList.itemList.layout.gap = -10;
        this._list.itemList.layout.gap = -5;
    };
    RankPanel.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(RankEvent.UPDATE_RANK_LIST, this.updateList, this);
        this.onFuncBtnChangeHandler(null);
    };
    RankPanel.prototype.removeEvent = function () {
        this._model.removeEventListener(RankEvent.UPDATE_RANK_LIST, this.updateList, this);
        _super.prototype.removeEvent.call(this);
    };
    RankPanel.prototype.onClickHandler = function (e) {
        _super.prototype.onClickHandler.call(this, e);
        switch (e.currentTarget) {
            case this.basePanel.closeBtn:
            case this.basePanel.backBtn:
                Manager.view.hide(16 /* RankPanel */);
                break;
        }
    };
    RankPanel.prototype.onFuncBtnChangeHandler = function (e) {
        _super.prototype.onFuncBtnChangeHandler.call(this, e);
        var index = this.basePanel.scrollerList.itemList.selectedIndex;
        if (index == -1)
            return;
        this._index = index;
        // this._list.itemList.removeChildren();
        if (this._index == 1) {
            this._content.visible = false;
            this.basePanel.title = "rank_title_7_png";
            if (!this._clubLeaderWarRank)
                this._clubLeaderWarRank = new ClubLeaderWarLeaderRankView();
            this.basePanel.addChildAt(this._clubLeaderWarRank, 3);
        }
        else {
            this._content.visible = true;
            if (this._clubLeaderWarRank && this._clubLeaderWarRank.parent)
                this._clubLeaderWarRank.parent.removeChild(this._clubLeaderWarRank);
            var tmpIndex = void 0;
            if (this._index < 1)
                tmpIndex = this._index;
            else
                tmpIndex = this._index - 1;
            this._item0.type = tmpIndex;
            this.basePanel.title = "rank_title_" + tmpIndex + "_png";
            this._list.initBtnListData(RankItem2, null);
            this.reqRankData();
        }
    };
    RankPanel.prototype.reqRankData = function () {
        if (this._index != 1) {
            if (this._index < 1)
                Manager.control.getRank().reqRankData(this._index);
            else
                Manager.control.getRank().reqRankData(this._index - 1);
        }
        else
            Manager.control.getClubLeaderWar().leaderRankQuery();
    };
    RankPanel.prototype.updateList = function (e) {
        var data = e.params;
        var tmpIndex;
        if (this._index != 1) {
            if (this._index < 1)
                tmpIndex = this._index;
            else
                tmpIndex = this._index - 1;
        }
        if (data.type != tmpIndex)
            return;
        // 		3	我的排行：
        // 4	未入榜
        this._txtMyRank.text = LangCVO.getContent("rank3") + (data.myRank > 0 ? data.myRank : LangCVO.getContent("rank4"));
        this._txtMyValue.text = this.getValueName(data.myValue);
        var list = data.list;
        var len = list.length;
        this._item0.info = len > 0 ? list[0] : null;
        // this._item1.info = len > 1 ? list[1] : null;
        // this._item2.info = len > 2 ? list[2] : null;
        // this._list.itemList.removeChildren();
        // this._list.initBtnListData(RankItem1, list.length > 1 ? list.slice(1) : null, true);
        this._list.itemList.itemRendererFunction = this.itemRendererFunction;
        this._list.itemList.dataProvider = new eui.ArrayCollection(list.slice(1));
        this._list.itemList.allowMultipleSelection = false;
        this._list.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        this._list.scroller.scrollPolicyV = eui.ScrollPolicy.ON;
    };
    RankPanel.prototype.itemRendererFunction = function (info) {
        if (info.rank > 3)
            return RankItem2;
        return RankItem1;
    };
    RankPanel.prototype.getValueName = function (value) {
        var tmpIndex;
        if (this._index != 1) {
            if (this._index < 1)
                tmpIndex = this._index;
            else
                tmpIndex = this._index - 1;
        }
        switch (tmpIndex) {
            case RankConst.TYPE_POWER:
            case RankConst.TYPE_PET:
            case RankConst.TYPE_MING_GE:
                return LangCVO.getContent("rank5") + value; //5	我的战力：
            case RankConst.TYPE_LEVEL:
                // let str:string = value + LangCVO.getContent("common15");//15	级
                // if(Manager.model.getGame().self.attrInfo.zhuanshu > 0) str = Manager.model.getGame().self.attrInfo.zhuanshu + LangCVO.getContent("common14") + str;//14	转
                // return LangCVO.getContent("rank7") + str;//7	我的等级：
                return LangCVO.getContent("rank7") + value; //7	我的等级：
            case RankConst.TYPE_JIE_XUE:
                return LangCVO.getContent("rank9") + value; //9	我的境界
            case RankConst.TYPE_GEM:
            case RankConst.TYPE_SOUL:
                return LangCVO.getContent("rank8") + value; //8	我的总等级：
        }
        return "";
    };
    RankPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this._clubLeaderWarRank && this._clubLeaderWarRank.parent) {
            this._clubLeaderWarRank.parent.removeChild(this._clubLeaderWarRank);
            this._clubLeaderWarRank.dispose();
        }
        this._clubLeaderWarRank = null;
        this._model = null;
        ObjectUtil.remove(this._content);
        ObjectUtil.disposes(this._item0, this._list, this._txtMyRank, this._txtMyValue);
        this._content = null;
        this._item0 = null;
        this._list = null;
        this._txtMyRank = null;
        this._txtMyValue = null;
    };
    return RankPanel;
}(Panel));
//# sourceMappingURL=RankPanel.js.map