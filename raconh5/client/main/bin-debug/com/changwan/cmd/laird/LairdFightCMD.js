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
var LairdFightCMD = (function (_super) {
    __extends(LairdFightCMD, _super);
    function LairdFightCMD() {
        var _this = _super.call(this) || this;
        _this._protocol = Protocol.CMD_LAIRD_FIGHT;
        return _this;
    }
    LairdFightCMD.prototype.processOut = function (pkg) {
        pkg.writeByte(this.type);
        pkg.writeInt64(this.targetId);
    };
    LairdFightCMD.prototype.receive = function (pi) {
        var arr = [];
        var child;
        var noticeId = pi.readShort();
        var len = pi.readShort();
        for (var i = 0; i < len; i++) {
            child = {};
            child.type = pi.readByte();
            child.content = pi.readUTF();
            arr.push(child);
        }
        var textCvo = TextDataCVO.getCVO(noticeId);
        if (textCvo) {
            var content = textCvo.content;
            Manager.model.getLaird().resultContent = Manager.model.getChat().parseLink(content, arr);
        }
        // Manager.layer.panelDarkLayer.visible = false;
        // Manager.layer.uiLayer.visible = false;
        // Manager.layer.effectLayer.visible = false;
        Manager.view.hide(38 /* ClubPanel */);
        ObjectUtil.remove(Manager.layer.panelDarkLayer);
        ObjectUtil.remove(Manager.layer.uiLayer);
        ObjectUtil.remove(Manager.layer.effectLayer);
    };
    return LairdFightCMD;
}(BaseCMD));
__reflect(LairdFightCMD.prototype, "LairdFightCMD");
//# sourceMappingURL=LairdFightCMD.js.map