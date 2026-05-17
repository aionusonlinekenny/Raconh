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
 * 排行榜图标
 * Simon
 * create 2018-3-13
* @update devil 2018-04-16
*/
var RankIcon2 = (function (_super) {
    __extends(RankIcon2, _super);
    function RankIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    RankIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getRank().addEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.__drawRed, this);
    };
    RankIcon2.prototype.removeEvent = function () {
        Manager.model.getRank().removeEventListener(RankEvent.UPDATE_WORSHIP_LIST, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    RankIcon2.prototype.hasRedIcon = function () {
        return (Manager.model.getRank().checkCanWorship());
    };
    return RankIcon2;
}(ActBaseIcon2));
__reflect(RankIcon2.prototype, "RankIcon2");
//# sourceMappingURL=RankIcon2.js.map