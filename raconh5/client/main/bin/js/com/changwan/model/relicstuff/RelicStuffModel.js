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
 * 神器model
 * pzx
 * create 2018-3-9
*/
var RelicStuffModel = /** @class */ (function (_super) {
    __extends(RelicStuffModel, _super);
    function RelicStuffModel() {
        var _this = _super.call(this) || this;
        _this.addEvent();
        return _this;
    }
    RelicStuffModel.prototype.addEvent = function () {
    };
    RelicStuffModel.prototype.query = function () {
        this.dispatchEvent(new RelicStuffEvent(RelicStuffEvent.RELICSTUFF_QUERY_EVENT));
    };
    /**
     * type 激活类型 1-碎片 2-神器'),
     */
    RelicStuffModel.prototype.setActivity = function (type, id) {
        if (type == RelicStuffType.DEBRIS_TYPE)
            RelicStuffDebrisCVO.setActivity(id);
        else if (type == RelicStuffType.RELICSTUFF_TYPE)
            RelicStuffCVO.setActivity(id);
        var any = { type: type, id: id };
        this.dispatchEvent(new RelicStuffEvent(RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT, any));
    };
    /** 检测是否有可激活的 */
    RelicStuffModel.prototype.checkActivity = function () {
        var arr = RelicStuffCVO.cvos();
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var cvo = arr_1[_i];
            if (cvo.checkIsActivity()) {
                return true;
            }
        }
        var any = RelicStuffDebrisCVO.allcvos();
        for (var key in any) {
            var cvo1 = any[key];
            if (cvo1.checkisActivity()) {
                return true;
            }
        }
        return false;
    };
    RelicStuffModel.prototype.getRelicStuff = function () {
        var recvo;
        var arr = RelicStuffCVO.cvos();
        var ln = arr.length;
        for (var i = 0; i < ln; i++) {
            recvo = arr[i];
            if (recvo.isActivity())
                recvo = null;
            else
                break;
        }
        return recvo;
    };
    return RelicStuffModel;
}(egret.EventDispatcher));
//# sourceMappingURL=RelicStuffModel.js.map