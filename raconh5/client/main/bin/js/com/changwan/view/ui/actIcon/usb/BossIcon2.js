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
 * boss活动图标
 * luzh
 * create 2017-2-28
* @update devil 2018-04-15
*/
/**
 * 日常活动图标
 * liangyan
 * create 2017-12-28

*/
var BossIcon2 = /** @class */ (function (_super) {
    __extends(BossIcon2, _super);
    function BossIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    BossIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
        Manager.model.getCopy().addEventListener(CopyEvent.UPDATE_SINGLE, this.__drawRed, this);
        Manager.model.getBoss().addEventListener(BossEvent.CHALLENGE_TIMES, this.__drawRed, this);
    };
    BossIcon2.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
        Manager.model.getCopy().removeEventListener(CopyEvent.UPDATE_SINGLE, this.__drawRed, this);
        Manager.model.getBoss().removeEventListener(BossEvent.CHALLENGE_TIMES, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    BossIcon2.prototype.hasRedIcon = function () {
        return (Manager.model.getBoss().privateChallenge || OpenCVO.isOpen(OpenConst.ID_PUBLIC_BOSS) && Manager.model.getBoss().publicChallenge);
    };
    return BossIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=BossIcon2.js.map