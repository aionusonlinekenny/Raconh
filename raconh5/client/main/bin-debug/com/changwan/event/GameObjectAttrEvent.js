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
var GameObjectAttrEvent = (function (_super) {
    __extends(GameObjectAttrEvent, _super);
    function GameObjectAttrEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 生命
     */
    GameObjectAttrEvent.HP = "UPDATE_ATTR_HP";
    /**
     * 战力
     */
    GameObjectAttrEvent.FIGHT = "UPDATE_ATTR_FIGHT";
    /**
     * 昵称
     */
    GameObjectAttrEvent.NICKNAME = "UPDATE_ATTR_NICKNAME";
    /**
     * 等级
     */
    GameObjectAttrEvent.LEVEL = "UPDATE_ATTR_LEVEL";
    /**
     * 转生
     */
    GameObjectAttrEvent.TURN_LIVE = "UPDATE_ATTR_TURN_LIVE";
    /**
     * 元宝
     */
    GameObjectAttrEvent.GOLD = "UPDATE_ATTR_GOLD";
    /**
     * 铜钱
     */
    GameObjectAttrEvent.COIN = "UPDATE_ATTR_COIN";
    /**
     * 经验
     */
    GameObjectAttrEvent.EXP = "UPDATE_ATTR_EXP";
    /** 宗门贡献 */
    GameObjectAttrEvent.GUILDCONTRI = "GUILDCONTRI";
    /**vip等级 */
    GameObjectAttrEvent.VIP_LEVEL = "UPDATE_ATTR_VIP_LEVEL";
    /** 命魂 */
    GameObjectAttrEvent.SOUL = "UPDATE_ATTR_SOUL";
    /** 命格碎片*/
    GameObjectAttrEvent.DESTINY_FRAG = "UPDATE_ATTR_SOUL";
    /** 绝学境界值 */
    GameObjectAttrEvent.JUEXUE_AMBIT = "JUEXUE_AMBIT";
    /** 荣誉 */
    GameObjectAttrEvent.HONOR = "HONOR";
    return GameObjectAttrEvent;
}(BaseEvent));
__reflect(GameObjectAttrEvent.prototype, "GameObjectAttrEvent");
//# sourceMappingURL=GameObjectAttrEvent.js.map