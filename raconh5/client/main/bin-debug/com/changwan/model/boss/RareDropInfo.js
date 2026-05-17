var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 珍希掉落信息
 * pzx
 * create 2018.2.1
 */
var RareDropInfo = (function () {
    function RareDropInfo() {
        this.item = new ItemsModelInfo();
    }
    return RareDropInfo;
}());
__reflect(RareDropInfo.prototype, "RareDropInfo");
//# sourceMappingURL=RareDropInfo.js.map