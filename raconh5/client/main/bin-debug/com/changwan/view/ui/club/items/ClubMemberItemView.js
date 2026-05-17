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
var ClubMemberItemView = (function (_super) {
    __extends(ClubMemberItemView, _super);
    function ClubMemberItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = Manager.path.getSkinName("club", "ClubMemberItemViewSkin");
        return _this;
    }
    ClubMemberItemView.prototype.dataChanged = function () {
        this._careerId = this.data.careerId;
        // let colorStr:string = "";
        // if(this._careerId <= 10)
        // 	colorStr = "#0000ff";
        // else if(this._careerId > 10 && this._careerId <= 30)
        // 	colorStr = Color.PURPLE_STR;
        // else if(this._careerId > 30 && this._careerId <= 40)
        // 	colorStr = Color.ORANGE_STR;
        // else if(this._careerId > 40)
        // 	colorStr = Color.RED_STR;
        // HtmlUtil.setTextFlow(this._career, "<font color='"+ colorStr +"'>"+ this.data.career +"</font>");
        this._career.text = this.data.career;
        this._nickName.text = this.data.nickName;
        this._fighting.text = this.data.fighting;
    };
    ClubMemberItemView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._career, this._nickName, this._fighting);
        if (this._career)
            this._career.dispose();
        this._career = null;
        if (this._nickName)
            this._nickName.dispose();
        this._nickName = null;
        if (this._fighting)
            this._fighting.dispose();
        this._fighting = null;
    };
    return ClubMemberItemView;
}(ItemRenderer));
__reflect(ClubMemberItemView.prototype, "ClubMemberItemView");
//# sourceMappingURL=ClubMemberItemView.js.map