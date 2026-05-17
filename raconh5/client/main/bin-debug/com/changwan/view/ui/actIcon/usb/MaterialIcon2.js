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
 * 缥渺录图标
 * Simon
 * create 2018-3-29
*/
var MaterialIcon2 = (function (_super) {
    __extends(MaterialIcon2, _super);
    function MaterialIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    MaterialIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.addEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
        Manager.model.getMaterialCopy().addEventListener(MaterialEvent.MATERIAL_PASS_LIST_UPDATE, this.__drawRed, this);
    };
    MaterialIcon2.prototype.removeEvent = function () {
        Manager.model.self.removeEventListener(GameObjectAttrEvent.LEVEL, this.__drawRed, this);
        Manager.model.self.removeEventListener(GameObjectAttrEvent.TURN_LIVE, this.__drawRed, this);
        Manager.model.getMaterialCopy().removeEventListener(MaterialEvent.MATERIAL_PASS_LIST_UPDATE, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    MaterialIcon2.prototype.hasRedIcon = function () {
        var isShow = false;
        for (var i = 0; i < MaterialCopyModel.BIG_CELL_MAX_COUNT; i++) {
            var baseId = i * MaterialCopyModel.CELL_MAX_COUNT;
            var itemId = 0;
            var list = Manager.model.getMaterialCopy().passList[i + 1];
            if (list && list.length > 0) {
                var tmpId = list[list.length - 1] + 1;
                if (tmpId <= baseId + MaterialCopyModel.CELL_MAX_COUNT)
                    itemId = tmpId;
            }
            else {
                itemId = baseId + 1;
            }
            for (var j = itemId; j <= baseId + MaterialCopyModel.CELL_MAX_COUNT; j++) {
                var info = MaterialCopyCVO.getCellInfo(j);
                if (info) {
                    if (Manager.model.self.attrInfo.fight >= info.fight && Manager.model.self.attrInfo.level >= info.conds.value) {
                        isShow = true;
                        break;
                    }
                }
            }
            if (isShow)
                break;
        }
        return isShow;
    };
    return MaterialIcon2;
}(ActBaseIcon2));
__reflect(MaterialIcon2.prototype, "MaterialIcon2");
//# sourceMappingURL=MaterialIcon2.js.map