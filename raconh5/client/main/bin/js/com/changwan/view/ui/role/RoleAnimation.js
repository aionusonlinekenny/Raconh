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
 * 界面人物模型
 * Simon 2017.11.30
 */
var RoleAnimation = /** @class */ (function (_super) {
    __extends(RoleAnimation, _super);
    function RoleAnimation() {
        return _super.call(this) || this;
    }
    RoleAnimation.prototype.start = function () {
        if (this._wingID > 0) {
            // this._pifeng = Manager.animation.createPanelPifengAnimation(this._wingID+"");
            // if(!this._pifeng.parent) this.addChild(this._pifeng);
        }
        if (this._clothesID > 0) {
            this._body = Manager.animation.createPanelBodyAnimation(this._clothesID + "");
            if (!this._body.parent)
                this.addChild(this._body);
        }
        if (this._weaponID > 0) {
            this._weapon = Manager.animation.createPanelWeaponAnimation(this._weaponID + "");
            if (!this._weapon.parent)
                this.addChild(this._weapon);
        }
    };
    RoleAnimation.prototype.reuse = function (clothes, weapon, wing) {
        if (weapon === void 0) { weapon = 0; }
        if (wing === void 0) { wing = 0; }
        this._clothesID = clothes;
        this._weaponID = weapon;
        this._wingID = wing;
        _super.prototype.reuse.call(this);
    };
    RoleAnimation.prototype.unuse = function () {
        _super.prototype.unuse.call(this);
        // if(this._pifeng) Manager.pool.push(this._pifeng);
        // this._pifeng = null;
        if (this._body)
            Manager.pool.push(this._body);
        this._body = null;
        if (this._weapon)
            Manager.pool.push(this._weapon);
        this._weapon = null;
    };
    RoleAnimation.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // if(this._pifeng) Manager.pool.push(this._pifeng);
        // this._pifeng = null;
        if (this._body)
            Manager.pool.push(this._body);
        this._body = null;
        if (this._weapon)
            Manager.pool.push(this._weapon);
        this._weapon = null;
    };
    return RoleAnimation;
}(Sprite));
//# sourceMappingURL=RoleAnimation.js.map