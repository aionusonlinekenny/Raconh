var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InvalidationType = (function () {
    function InvalidationType() {
    }
    InvalidationType.ALL = "all";
    InvalidationType.SIZE = "size";
    InvalidationType.DATA = "data";
    InvalidationType.STATE = "state";
    InvalidationType.STYLE = "style";
    InvalidationType.SELECTED = "selected";
    InvalidationType.LAYOUT = "layOut";
    InvalidationType.TEXT_STYLE = "textStyle";
    //gameobject
    InvalidationType.GO_NAME = "GO_NAME";
    InvalidationType.GO_ANIMATION = "GO_ANIMATION";
    InvalidationType.GO_ACTION = "GO_ACTION";
    InvalidationType.GO_DIRECTION = "GO_DIRECTION";
    InvalidationType.GO_DEAD = "GO_DEAD";
    InvalidationType.GO_STYLE = "GO_STYLE";
    InvalidationType.GO_GUILD_NAME = "GO_GUILD_NAME";
    InvalidationType.GO_BUFF = "GO_BUFF";
    InvalidationType.GO_BLOOD = "GO_BLOOD";
    InvalidationType.GO_VIP = "GO_VIP";
    InvalidationType.GO_TITLE = "GO_TITLE";
    return InvalidationType;
}());
__reflect(InvalidationType.prototype, "InvalidationType");
//# sourceMappingURL=InvalidationType.js.map