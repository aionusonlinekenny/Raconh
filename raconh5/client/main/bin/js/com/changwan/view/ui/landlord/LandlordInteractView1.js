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
 * 互动界面1
 */
var LandlordInteractView1 = /** @class */ (function (_super) {
    __extends(LandlordInteractView1, _super);
    function LandlordInteractView1(thisParent) {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this._thisParent = thisParent;
        _this.skinName = Manager.path.getSkinName("landlord", "LandlordInteractViewSkin1");
        return _this;
    }
    LandlordInteractView1.prototype.configUI = function () {
        _super.prototype.configUI.call(this);
        this._model = Manager.model.getLaird();
        this._itemList = [this._item1, this._item2];
    };
    LandlordInteractView1.prototype.initData = function () {
        var _this = this;
        this._value1.text = (this._thisParent.interactInfo.value - this._model.lairdRoleInfo.interactCount) + "/" + this._thisParent.interactInfo.value;
        var totalExp = 0;
        var curExp = 0;
        var list = this._model.coolyInfoList;
        for (var i = 0; i < this._itemList.length; i++) {
            this._itemList[i].type1.visible = (i + 1 <= list.length);
            this._itemList[i].type2.visible = !this._itemList[i].type1.visible;
            this._itemList[i].clickBack(function (index) { _this.changeItem(index); });
        }
        for (var i = 0; i < list.length; i++) {
            var coolyInfo = list[i];
            var expInfo = LairdCVO.getExpInfoByLevel(coolyInfo.level);
            if (expInfo) {
                totalExp += Math.floor((coolyInfo.freeTimes - coolyInfo.catchTimes) / 60) * expInfo.exp;
                // let totalWorkTime:number = Math.floor((new Date).getTime() / 1000) - coolyInfo.catchTimes;
                // let workLeftTime:number = totalWorkTime - coolyInfo.pickSec;
                // if(workLeftTime < 0) workLeftTime = 0;
                // curExp += Math.floor(workLeftTime / 60) * expInfo.exp;
                curExp += Math.floor(coolyInfo.pickSec / 60) * expInfo.exp;
            }
            this._itemList[i].updateInfo(coolyInfo);
        }
        this._value2.text = StringUtils.getBigNum(curExp) + "/" + StringUtils.getBigNum(totalExp);
        if (this._model.coolyInfoList.length == 0) {
            this.changeItem(0);
        }
    };
    LandlordInteractView1.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._model.addEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.addEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
    };
    LandlordInteractView1.prototype.removeEvent = function () {
        this._model.removeEventListener(LairdEvent.LAIRD_INFO_UPDATE, this.onInfoUpdateHandler, this);
        this._model.removeEventListener(LairdEvent.COOLY_INFO_UPDATE, this.onInfoUpdateHandler, this);
        _super.prototype.removeEvent.call(this);
    };
    LandlordInteractView1.prototype.onInfoUpdateHandler = function (e) {
        this.initData();
    };
    LandlordInteractView1.prototype.changeItem = function (index) {
        if (this._thisParent)
            this._thisParent.changeItem(index);
    };
    LandlordInteractView1.prototype.reuse = function (thisParent) {
        this._thisParent = thisParent;
    };
    LandlordInteractView1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        ObjectUtil.removes(this._value1, this._value2, this._item1, this._item2);
        if (this._value1)
            this._value1.dispose();
        this._value1 = null;
        if (this._value2)
            this._value2.dispose();
        this._value2 = null;
        if (this._item1)
            this._item1.dispose();
        this._item1 = null;
        if (this._item2)
            this._item2.dispose();
        this._item2 = null;
        this._thisParent = null;
        this._model = null;
        this._itemList = null;
    };
    return LandlordInteractView1;
}(UIComponent));
//# sourceMappingURL=LandlordInteractView1.js.map