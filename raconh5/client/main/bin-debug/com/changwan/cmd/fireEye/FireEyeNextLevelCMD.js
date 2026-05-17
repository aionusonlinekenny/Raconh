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
 * 火眼金睛下一关数据
 * liangyan
 * create 2018-03-26
*/
var FireEyeNextLevelCMD = (function (_super) {
    __extends(FireEyeNextLevelCMD, _super);
    function FireEyeNextLevelCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.FIRE_EYE_NEXT;
        return _this;
    }
    FireEyeNextLevelCMD.prototype.receive = function (pi) {
        var info = new FireEyeNextLevelInfo();
        info.level = pi.readByte();
        var count = pi.readShort();
        info.datas = [];
        while (count > 0) {
            info.datas.push({ type: pi.readByte(), num: pi.readByte() });
            count--;
        }
        //闯关开始时间戳（当前时间小于此值，则需倒计时结束才能开始闯关）
        info.startTime = pi.readInt();
        info.levelTime = pi.readInt();
        Manager.model.getFireEye().nextInfo = info;
        Manager.model.getFireEye().dispatchEvent(new FireEyeEvent(FireEyeEvent.FIRE_EYE_NEXT_DATA));
    };
    return FireEyeNextLevelCMD;
}(BaseCMD));
__reflect(FireEyeNextLevelCMD.prototype, "FireEyeNextLevelCMD");
//# sourceMappingURL=FireEyeNextLevelCMD.js.map