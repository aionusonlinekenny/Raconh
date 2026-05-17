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
 *author Anydo
 *create 2018-2-1
 *description
*/
var PetItemStyleListCMD = (function (_super) {
    __extends(PetItemStyleListCMD, _super);
    function PetItemStyleListCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.PET_ITEM_STYLE_LIST;
        return _this;
    }
    PetItemStyleListCMD.prototype.receive = function (pi) {
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            var resId = pi.readShort();
            Manager.model.getPet().addItemStyle(resId);
        }
    };
    return PetItemStyleListCMD;
}(BaseCMD));
__reflect(PetItemStyleListCMD.prototype, "PetItemStyleListCMD");
//# sourceMappingURL=PetItemStyleListCMD.js.map