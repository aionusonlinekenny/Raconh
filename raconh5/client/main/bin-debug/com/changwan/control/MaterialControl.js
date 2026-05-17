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
var MaterialControl = (function (_super) {
    __extends(MaterialControl, _super);
    function MaterialControl() {
        return _super.call(this) || this;
    }
    MaterialControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_INFO, MaterialCopyInfoCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_AWARD, MaterialCopyAwardCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_MAKE_BOX, MaterialCopyMakeBoxCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_COLLECTION, MaterialCopyCollectionCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_ALL_INFO_UPDATE, MaterialCopyAllInfoUpdateCMD);
        Manager.socket.addCMD(Protocol.MATERIAL_COPY_INFO_UPDATE, MaterialCopyInfoUpdateCMD);
        Manager.socket.addCMD(Protocol.COPY_WARNING_TIP, MaterialCopyWarningCMD);
    };
    MaterialControl.prototype.getAwardCell = function () {
        var cmd = Manager.socket.getCMD(Protocol.MATERIAL_COPY_INFO);
        cmd.send();
    };
    MaterialControl.prototype.getAward = function (awardId) {
        var cmd = Manager.socket.getCMD(Protocol.MATERIAL_COPY_AWARD);
        cmd.awardId = awardId;
        cmd.send();
    };
    MaterialControl.prototype.queryCollection = function () {
        var cmd = Manager.socket.getCMD(Protocol.MATERIAL_COPY_COLLECTION);
        cmd.send();
    };
    MaterialControl.prototype.addMaterialEffect = function (attack) {
        var effectName = "";
        var localX;
        var localY;
        var skewY = 0;
        if (attack.getDirection().indexOf("right") != -1) {
            effectName = "long_eff_right";
            localX = attack.x - 420;
            localY = attack.y - 400;
            skewY = 0;
        }
        else if (attack.getDirection().indexOf("left") != -1) {
            effectName = "long_eff_right";
            localX = attack.x + 420;
            localY = attack.y - 400;
            skewY = 180;
        }
        var fireLongEffect = Manager.animation.createEffectAnimation(effectName, 0, true, true);
        fireLongEffect.x = localX;
        fireLongEffect.y = localY;
        fireLongEffect.skewY = skewY;
        Manager.layer.addChildToNodeByType(fireLongEffect, fireLongEffect.url, 1);
    };
    return MaterialControl;
}(BaseControl));
__reflect(MaterialControl.prototype, "MaterialControl");
//# sourceMappingURL=MaterialControl.js.map