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
 * 寻宝
 * pzx
 * create 18.3.7
* @update devil 2018-04-16
 */
var ArtifactIcon2 = /** @class */ (function (_super) {
    __extends(ArtifactIcon2, _super);
    function ArtifactIcon2(imageContainer01, imageContainer, container1) {
        return _super.call(this, imageContainer01, imageContainer, container1) || this;
    }
    ArtifactIcon2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Manager.model.getItems().addEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.__drawRed, this);
    };
    ArtifactIcon2.prototype.removeEvent = function () {
        Manager.model.getItems().removeEventListener(ItemsEvent.ITEM_UPDATE_EVENT, this.__drawRed, this);
        _super.prototype.removeEvent.call(this);
    };
    ArtifactIcon2.prototype.hasRedIcon = function () {
        var cvo = ArtifactLossCVO.getCvo(ArtifactType.SENDS_ITEM_TYPE);
        var loss = new GainLossVO(cvo.loss);
        return loss.isEnough();
    };
    return ArtifactIcon2;
}(ActBaseIcon2));
//# sourceMappingURL=ArtifactIcon2.js.map