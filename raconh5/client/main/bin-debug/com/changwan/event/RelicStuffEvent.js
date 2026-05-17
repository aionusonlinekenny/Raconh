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
 * 18.3.9
 */
var RelicStuffEvent = (function (_super) {
    __extends(RelicStuffEvent, _super);
    function RelicStuffEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //查询
    RelicStuffEvent.RELICSTUFF_QUERY_EVENT = "RELICSTUFF_QUERY_EVENT";
    //激活
    RelicStuffEvent.RELICSTUFF_ACTIVITY_EVENT = "RELICSTUFF_ACTIVITY_EVENT";
    return RelicStuffEvent;
}(BaseEvent));
__reflect(RelicStuffEvent.prototype, "RelicStuffEvent");
//# sourceMappingURL=RelicStuffEvent.js.map