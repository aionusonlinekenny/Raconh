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
 *author Anydo
 *create 2017-11-17
 *description
*/
var SkillConfigSprite = /** @class */ (function (_super) {
    __extends(SkillConfigSprite, _super);
    function SkillConfigSprite() {
        return _super.call(this) || this;
    }
    SkillConfigSprite.prototype.reuse = function (rotation, moveConfig) {
        this.moveInfo = (moveConfig == "" || moveConfig == "0&0&0&0&0") ? null : Manager.pool.create(SkillConfigMoveInfo, moveConfig, rotation);
        _super.prototype.reuse.call(this);
    };
    SkillConfigSprite.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        if (this.moveInfo != null) {
            Manager.pool.push(this.moveInfo);
            this.moveInfo = null;
        }
    };
    SkillConfigSprite.prototype.disposeSelf = function () {
        _super.prototype.disposeSelf.call(this);
        if (this.moveInfo != null) {
            Manager.pool.push(this.moveInfo);
            this.moveInfo = null;
        }
    };
    return SkillConfigSprite;
}(Sprite));
//# sourceMappingURL=SkillConfigSprite.js.map