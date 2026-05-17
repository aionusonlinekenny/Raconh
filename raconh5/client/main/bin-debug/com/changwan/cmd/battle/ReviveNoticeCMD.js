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
 * 玩家复活场景通知
 * liangyan
 * create 2017-12-07
*/
var ReviveNoticeCMD = (function (_super) {
    __extends(ReviveNoticeCMD, _super);
    function ReviveNoticeCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.REVIVE_NOTICE;
        return _this;
    }
    ReviveNoticeCMD.prototype.receive = function (pi) {
        var id = pi.readInt64();
        var x = pi.readInt();
        var y = pi.readInt();
        var hp = pi.readInt();
        var obj = Manager.model.getGameobject().getGameObject(id);
        if (obj) {
            obj.updatePostion(x, y);
            obj.attrInfo.setValue(AttrDescType.HP, hp);
        }
    };
    return ReviveNoticeCMD;
}(BaseCMD));
__reflect(ReviveNoticeCMD.prototype, "ReviveNoticeCMD");
//# sourceMappingURL=ReviveNoticeCMD.js.map