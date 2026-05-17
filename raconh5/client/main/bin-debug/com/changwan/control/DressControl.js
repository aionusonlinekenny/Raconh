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
 * 装扮控制器
 * liangyan
 * create 2017-11-28
*/
var DressControl = (function (_super) {
    __extends(DressControl, _super);
    function DressControl() {
        return _super.call(this) || this;
    }
    DressControl.prototype.addCMD = function () {
        Manager.socket.addCMD(Protocol.TITLE_REQUEST, TitleListCMD);
        Manager.socket.addCMD(Protocol.TITLE_WEAR, TitleWearCMD);
        Manager.socket.addCMD(Protocol.TITLE_TAKE_OFF, TitleTakeOffCMD);
        Manager.socket.addCMD(Protocol.TITLE_ACTIVE, TitleActiveCMD);
        Manager.socket.addCMD(Protocol.TITLE_GAIN, TitleGainCMD);
        Manager.socket.addCMD(Protocol.TITLE_DELETE, TitleDeleteCMD);
        Manager.socket.addCMD(Protocol.FASHION_INIT, FashionInitCMD);
        Manager.socket.addCMD(Protocol.FASHION_ACTIVE, FashionActiveCMD);
        Manager.socket.addCMD(Protocol.FASHION_WEAR, FashionWearCMD);
        Manager.socket.addCMD(Protocol.FASHION_UP, FashionUpCMD);
        Manager.socket.addCMD(Protocol.FASHION_TIMEOUT, FashionTimeoutCMD);
    };
    /**请求称号信息 */
    DressControl.prototype.titleRequest = function () {
        var cmd = Manager.socket.getCMD(Protocol.TITLE_REQUEST);
        cmd.send();
    };
    /**佩戴称号 */
    DressControl.prototype.wearTitle = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.TITLE_WEAR);
        cmd.id = id;
        cmd.send();
    };
    /**卸下称号 */
    DressControl.prototype.takeoffTitle = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.TITLE_TAKE_OFF);
        cmd.id = id;
        cmd.send();
    };
    /**激活称号
     * @param 物品类型
     * @param 物品id
     * */
    DressControl.prototype.actTitle = function (type, id) {
        var cmd = Manager.socket.getCMD(Protocol.TITLE_ACTIVE);
        cmd.type = type;
        cmd.id = id;
        cmd.send();
    };
    //服饰start------------------------------------------------------------------------------
    /**请求服饰初始化信息 */
    DressControl.prototype.fashionInit = function () {
        var cmd = Manager.socket.getCMD(Protocol.FASHION_INIT);
        cmd.send();
    };
    /**
     * 服饰激活
     * @param id 服饰id
     **/
    DressControl.prototype.fashionActive = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.FASHION_ACTIVE);
        cmd.id = id;
        cmd.send();
    };
    /**
     * 服饰穿戴与卸下
     * @param id 服饰id
     **/
    DressControl.prototype.fashionWear = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.FASHION_WEAR);
        cmd.id = id;
        cmd.send();
    };
    /**
     * 服饰升星或增加时效
     * @param id 服饰id
     **/
    DressControl.prototype.fashionUp = function (id) {
        var cmd = Manager.socket.getCMD(Protocol.FASHION_UP);
        cmd.id = id;
        cmd.send();
    };
    return DressControl;
}(BaseControl));
__reflect(DressControl.prototype, "DressControl");
//# sourceMappingURL=DressControl.js.map