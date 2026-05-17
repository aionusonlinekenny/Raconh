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
 * pzx
 * 17.11.18
 * 经脉model
 */
var JingMaiModel = (function (_super) {
    __extends(JingMaiModel, _super);
    function JingMaiModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JingMaiModel.prototype.queryJianmai = function (dic) {
        this._jianMaiDic = dic;
        this.dispatchEvent(new JingMaiEvent(JingMaiEvent.JINGMAI_UPDATE_EVENT));
        this.checkCoin();
    };
    // 角色id,经脉等级
    JingMaiModel.prototype.lvUpJianmai = function (payId, level) {
        if (this._jianMaiDic.containsKey(payId)) {
            this._jianMaiDic.remove(payId);
        }
        this._jianMaiDic.add(payId, level + 1);
        this.dispatchEvent(new JingMaiEvent(JingMaiEvent.JINGMAI_UPGRAPE_EVENT, level));
        this.checkCoin();
    };
    JingMaiModel.prototype.getId = function (playId) {
        return this._jianMaiDic.get(playId);
    };
    /** 检测是否有足够的可升级经脉 */
    JingMaiModel.prototype.checkCoin = function () {
        if (!OpenCVO.isOpen(OpenConst.ID_JINGMAI))
            return false;
        if (!this._jianMaiDic) {
            return false;
        }
        var arr = this._jianMaiDic.values();
        var leve = arr[0];
        if (leve >= JingMaiCVO.maxLevel) {
            return false;
        }
        var cvo = JingMaiCVO.getInfo(leve);
        var gai = cvo.gai;
        this.dispatchEvent(new JingMaiEvent(JingMaiEvent.JINGMAI_CHECK_ICON_EVENT, gai.isEnough()));
        return gai.isEnough();
    };
    return JingMaiModel;
}(egret.EventDispatcher));
__reflect(JingMaiModel.prototype, "JingMaiModel");
//# sourceMappingURL=JingMaiModel.js.map