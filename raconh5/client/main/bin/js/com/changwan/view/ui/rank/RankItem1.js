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
 * 排行榜第2、3名单个信息视图
 * luzhihong
 * create 2017-11-02
 */
var RankItem1 = /** @class */ (function (_super) {
    __extends(RankItem1, _super);
    function RankItem1() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("rank", "RankItemSkin1");
        return _this;
    }
    RankItem1.prototype.dataChanged = function () {
        var info = this.data;
        if (this._info == info)
            return;
        this._info = info;
        if (this._info != null) {
            this.visible = true;
            this._iconRank.source = "rank_" + this._info.rank + "_png";
            this._txtName.text = this._info.name;
            this._txtValue.text = this.getValueLabel(this._info);
        }
        else {
            this.visible = false;
        }
        if (!this._imageHead)
            this._imageHead = Manager.pool.create(BitmapRemote);
        this._imageHead.load(Manager.path.getRoleHeadPath(2, this._info.career), 74, 74);
        this._imageHead.x = this._headBackImg.x + 13;
        this._imageHead.y = this._headBackImg.y + 13;
        this.addChildAt(this._imageHead, this.getChildIndex(this._headBackImg) + 1);
    };
    RankItem1.prototype.getValueLabel = function (info) {
        switch (info.type) {
            case RankConst.TYPE_POWER:
            case RankConst.TYPE_PET:
            case RankConst.TYPE_MING_GE:
                return LangCVO.getContent("rank1") + info.value; //1	战力：
            case RankConst.TYPE_LEVEL:
                // let str:string = info.value + LangCVO.getContent("common15");//15	级
                // if(info.zhuanshu > 0) str = info.zhuanshu + LangCVO.getContent("common14") + str;//14	转
                // return str;
                return LangCVO.getContent("rank11") + info.value; //11	等级：
            case RankConst.TYPE_JIE_XUE:
                return LangCVO.getContent("rank10") + info.value; //10	境界：
            case RankConst.TYPE_GEM:
            case RankConst.TYPE_SOUL:
                return LangCVO.getContent("rank2") + info.value; //2	总等级：
        }
        return "";
    };
    RankItem1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._info = null;
        this._back.parent.removeChild(this._back);
        this._back = null;
        this._headBackImg.parent.removeChild(this._headBackImg);
        this._headBackImg = null;
        this._iconRank.parent.removeChild(this._iconRank);
        this._iconRank = null;
        this._txtName.dispose();
        this._txtName = null;
        this._txtValue.dispose();
        this._txtValue = null;
        if (this._imageHead)
            Manager.pool.push(this._imageHead);
        this._imageHead = null;
    };
    return RankItem1;
}(ItemRenderer));
//# sourceMappingURL=RankItem1.js.map