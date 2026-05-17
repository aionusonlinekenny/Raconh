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
 *人物雕像视图信息类
 * Anydo
 * create
 * update devil 2017-11-08
*/
var StatusGameObjectInfo = /** @class */ (function (_super) {
    __extends(StatusGameObjectInfo, _super);
    function StatusGameObjectInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusGameObjectInfo.prototype.getType = function () {
        return GameObjectType.STATUE;
    };
    Object.defineProperty(StatusGameObjectInfo.prototype, "id", {
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    StatusGameObjectInfo.prototype.canHited = function (showMsg) { return false; };
    StatusGameObjectInfo.prototype.reuse = function (id, role) {
        _super.prototype.reuse.call(this, id, role);
        this.updatePostion(1393, 907);
    };
    StatusGameObjectInfo.prototype.parse = function (data) {
        var name = data.readUTF();
        this.attrInfo.setValue(AttrDescType.NICKNAME, name != "" ? name : LangCVO.getContent("common61")); //虚位以待
        this.attrInfo.setValue(AttrDescType.CAREER, data.readByte());
        this.updateStyle(data.readShort(), data.readShort(), data.readShort());
        this.attrInfo.setValue(AttrDescType.TITLE_ID, data.readShort());
        this.attrInfo.setValue(AttrDescType.GUILD_NAME, data.readUTF());
        // this.updatePostion(1393, 907);
    };
    return StatusGameObjectInfo;
}(PlayerGameObjectInfo));
//# sourceMappingURL=StatusGameObjectInfo.js.map